#!/usr/bin/env node
'use strict';

import assert from 'node:assert/strict';

const WORKER = 'https://al-quran-research.mosharrof0000.workers.dev';
const PAGES = 'https://mosharrof0000-ux.github.io/al-quran-research/';
const EXPECTED_VERSION = '2026-09-11-response-limit-fix';
const VERIFIED_ARABIC = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchBounded(url, options = {}, label = url) {
  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000)
      });
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === maxRetries) return response;
      console.warn(`RETRY ${label}: transient HTTP ${response.status}; attempt ${attempt + 2}/${maxRetries + 1}`);
    } catch (error) {
      if (attempt === maxRetries) throw new Error(`${label} failed after ${maxRetries + 1} bounded attempts: ${error?.message || error}`);
      console.warn(`RETRY ${label}: transient network/timeout error; attempt ${attempt + 2}/${maxRetries + 1}`);
    }
    await sleep(500 * (attempt + 1));
  }
  throw new Error(`${label} exhausted retries`);
}

async function main() {
  // Check the deployed version first. Do not POST if production does not advertise
  // the version whose deterministic verified-data route this test expects.
  const health = await fetchBounded(`${WORKER}/health`, { method: 'GET' }, 'Worker health');
  assert.equal(health.status, 200, `Worker health HTTP status was ${health.status}`);
  const healthBody = await health.json();
  assert.equal(healthBody.ok, true, 'Worker health must report ok=true');
  assert.equal(healthBody.service, 'al-quran-research-chat', 'Unexpected Worker service');
  assert.equal(healthBody.version, EXPECTED_VERSION, 'Production version mismatch; skipped POST to avoid any model-provider call');
  console.log('PASS Worker health: service and expected version confirmed');

  const page = await fetchBounded(PAGES, { method: 'GET' }, 'Live Pages');
  assert.equal(page.status, 200, `Live Pages HTTP status was ${page.status}`);
  assert.match(page.headers.get('content-type') || '', /text\/html/i, 'Live Pages must return HTML');
  const html = await page.text();
  assert.ok(html.length > 100, 'Live Pages HTML response is unexpectedly short');
  console.log('PASS Live Pages: HTTP 200 and HTML document received');

  // This exact prompt is handled by the deployed Worker’s verified-project-data
  // branch before any Gemini/Cloudflare-AI call. This is a real, non-mock HTTP
  // round-trip without consuming model-provider quota.
  const message = 'সূরা ফাতিহা ১ নম্বর আয়াতের প্রতিটি শব্দের মূল ধাতু ও ব্যাকরণ বিশ্লেষণ দিন';
  const chat = await fetchBounded(WORKER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://mosharrof0000-ux.github.io'
    },
    body: JSON.stringify({ message, mode: 'ayah' })
  }, 'Verified Bengali chat round-trip');
  assert.equal(chat.status, 200, `Bengali chat HTTP status was ${chat.status}`);
  const chatBody = await chat.json();
  assert.equal(chatBody.provider, 'verified-project-data', 'Expected deterministic verified-data route; no model call is permitted in this smoke test');
  assert.equal(chatBody.language, 'bn');
  assert.ok(typeof chatBody.answer === 'string' && chatBody.answer.includes(VERIFIED_ARABIC), 'Answer must contain the exact verified Arabic fixture');
  assert.ok(chatBody.answer.includes('বাংলা উচ্চারণ'), 'Answer must include Bengali word-analysis fields');
  console.log('PASS live Bengali chat round-trip: verified-project-data route; provider call avoided');
  console.log('RESULT: 3/3 live runtime smoke checks passed');
}

main().catch((error) => {
  console.error('FAIL live runtime smoke:', error?.stack || error);
  process.exitCode = 1;
});
