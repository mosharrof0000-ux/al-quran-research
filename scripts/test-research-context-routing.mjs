import assert from 'node:assert/strict';
import { getResearchContext, parseAyahReference } from '../backend/research-context.js';

const cases = [
  ['সূরা ফাতিহা আয়াত ১', { ref: [1, 1], detected: true }],
  ['আল-ফাতিহার ১ নম্বর আয়াত', { ref: [1, 1], detected: true }],
  ['সূরা 1:1', { ref: [1, 1], detected: true }],
  ['সূরা ২:২৫৫', { ref: [2, 255], detected: true }],
  ['সূরা বাকারা আয়াত 255', { ref: [2, 255], detected: true }],
  ['সূরা নিসা আয়াত 5', { ref: null, detected: true }],
  ['কুরআনের ভাষাতত্ত্ব কী?', { ref: null, detected: false }]
];
for (const [query, expected] of cases) assert.deepEqual(parseAyahReference(query), expected, query);

const env = { DB: { binding: 'test' } };
const record = {
  ayah_id: 'S001-A001', surah_number: 1, ayah_number: 1,
  arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  dataset_version: 'pilot-v1', dataset_status: 'PILOT',
  source_file: 'data/fatiha-master-v1.json', text_status: 'VERIFIED',
  analysis_status: 'PENDING', tokens: [{ token_id: 'Q001001-W001' }], evidence: []
};
let receivedEnv;
const found = await getResearchContext('সূরা ফাতিহা আয়াত ১', env, async (request, passedEnv) => {
  receivedEnv = passedEnv;
  assert.equal(request.url, 'https://research.local/api/v1/ayah/1/1');
  return new Response(JSON.stringify(record), { status: 200, headers: { 'Content-Type': 'application/json' } });
});
assert.equal(receivedEnv, env, 'the runtime environment must be passed to the Research API');
assert.equal(found.reference_detected, true);
assert.equal(found.used, true);
assert.equal(found.provenance.source_file, 'data/fatiha-master-v1.json');
assert.match(found.context, /S001-A001/);

let unsupportedApiCalled = false;
const unsupported = await getResearchContext('সূরা নিসা আয়াত 5', env, async () => {
  unsupportedApiCalled = true;
  return new Response('{}', { status: 200 });
});
assert.equal(unsupported.reference_detected, true);
assert.equal(unsupported.used, false);
assert.equal(unsupportedApiCalled, false, 'unmapped surah must fail closed without querying an invalid numeric reference');

const missing = await getResearchContext('সূরা বাকারা আয়াত 255', env, async () => new Response('{"error":"AYAH_NOT_FOUND"}', { status: 404 }));
assert.deepEqual(missing.ref, [2, 255]);
assert.equal(missing.reference_detected, true);
assert.equal(missing.used, false);

console.log('PASS: 7 reference parsing cases; env propagation, provenance, missing-record and fail-closed checks.');
