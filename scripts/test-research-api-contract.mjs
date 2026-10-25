#!/usr/bin/env node
'use strict';

import assert from 'node:assert/strict';
import { handleResearchApi } from '../backend/research-api.js';

const VERIFIED_ARABIC = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

function mockDb({ missingAyah = false, failStatus = false } = {}) {
  return {
    prepare(sql) {
      const statement = {
        args: [],
        bind(...args) { this.args = args; return this; },
        async first() {
          if (sql.includes('FROM dataset_release')) {
            if (failStatus) throw new Error('mock D1 unavailable');
            return { dataset_version: 'fatiha-master-v1', schema_version: '1.0', status: 'PILOT', source_file: 'data/fatiha-master-v1.json' };
          }
          if (sql.includes('FROM api_schema_version')) {
            return { api_version: '1.1', schema_version: '1.0', status: 'ACTIVE' };
          }
          if (sql.includes('FROM surah s JOIN ayah a')) {
            if (missingAyah) return null;
            return {
              surah_number: 1,
              name_ar: 'الفاتحة',
              name_transliteration: 'Al-Fatihah',
              ayah_id: 'S001-A001',
              ayah_number: 1,
              arabic_text: VERIFIED_ARABIC,
              text_version: 1,
              status: 'ACTIVE'
            };
          }
          return null;
        },
        async all() {
          if (sql.includes('FROM token t')) {
            return { results: [{
              token_id: 'S001-A001-T001',
              position: 1,
              surface_form: 'بِسْمِ',
              normalized_form: 'بسم',
              bengali_pronunciation: 'বিসমি',
              part_of_speech: 'PARTICLE+NOUN',
              features_json: '{"certainty":"HIGH"}'
            }] };
          }
          return { results: [] };
        }
      };
      return statement;
    }
  };
}

async function request(path, { method = 'GET', db = mockDb() } = {}) {
  const response = await handleResearchApi(new Request('https://research.test' + path, { method }), { DB: db });
  assert.ok(response instanceof Response, 'Research API must return a Response for /api/v1 routes');
  return { response, body: await response.json() };
}

const tests = [
  ['status reports versioned D1 metadata', async () => {
    const { response, body } = await request('/api/v1/status');
    assert.equal(response.status, 200);
    assert.equal(body.api_version, '1.1');
    assert.equal(body.dataset_version, 'fatiha-master-v1');
    assert.equal(body.source, 'data/fatiha-master-v1.json');
    assert.equal(body.storage, 'D1');
  }],
  ['ayah 1:1 returns the exact supplied Arabic fixture and token provenance', async () => {
    const { response, body } = await request('/api/v1/ayah/1/1');
    assert.equal(response.status, 200);
    assert.equal(body.arabic_text, VERIFIED_ARABIC);
    assert.equal(body.ayah_id, 'S001-A001');
    assert.equal(body.source, 'D1');
    assert.equal(body.tokens.length, 1);
    assert.equal(body.tokens[0].token_id, 'S001-A001-T001');
  }],
  ['invalid ayah reference fails closed before querying a record', async () => {
    const { response, body } = await request('/api/v1/ayah/1/0');
    assert.equal(response.status, 400);
    assert.equal(body.error, 'INVALID_AYAH_REFERENCE');
  }],
  ['missing ayah remains a 404 instead of fabricated text', async () => {
    const { response, body } = await request('/api/v1/ayah/1/2', { db: mockDb({ missingAyah: true }) });
    assert.equal(response.status, 404);
    assert.equal(body.error, 'AYAH_NOT_FOUND');
    assert.equal(body.arabic_text, undefined);
  }],
  ['write methods are rejected by the read-only API', async () => {
    const { response, body } = await request('/api/v1/status', { method: 'POST' });
    assert.equal(response.status, 405);
    assert.equal(body.error, 'METHOD_NOT_ALLOWED');
  }],
  ['unknown v1 endpoint is explicit', async () => {
    const { response, body } = await request('/api/v1/not-a-route');
    assert.equal(response.status, 404);
    assert.equal(body.error, 'UNKNOWN_ENDPOINT');
  }],
  ['D1 failure returns a bounded unavailable response', async () => {
    const { response, body } = await request('/api/v1/status', { db: mockDb({ failStatus: true }) });
    assert.equal(response.status, 503);
    assert.equal(body.error, 'RESEARCH_DATA_UNAVAILABLE');
    assert.equal(body.message, 'গবেষণা ডেটা এখন পাওয়া যাচ্ছে না।');
  }]
];

let passed = 0;
for (const [name, run] of tests) {
  try {
    await run();
    passed++;
    console.log('PASS', name);
  } catch (error) {
    console.error('FAIL', name, '-', error?.stack || error);
  }
}
console.log(`RESULT: ${passed}/${tests.length} research API contract tests passed`);
if (passed !== tests.length) process.exit(1);
console.log('STATUS: PASS');
