#!/usr/bin/env node
'use strict';

import assert from 'node:assert/strict';
import workerEntry, { isVerifiedProjectDataRequest } from '../backend/worker-entry.js';

const message = 'সূরা ফাতিহা ১ নম্বর আয়াতের প্রতিটি শব্দের মূল ধাতু ও ব্যাকরণ বিশ্লেষণ দিন';

assert.equal(isVerifiedProjectDataRequest(message), true, 'Fatiha word-analysis prompt must be recognized');
assert.equal(isVerifiedProjectDataRequest('সাধারণ একটি প্রশ্ন'), false, 'Unrelated prompts must not use the deterministic route');

const originalFetch = globalThis.fetch;
let outboundFetchCount = 0;
globalThis.fetch = async () => {
  outboundFetchCount += 1;
  throw new Error('Unexpected outbound request: deterministic route must not call AI or remote context');
};

try {
  const request = new Request('https://worker.local/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://mosharrof0000-ux.github.io'
    },
    body: JSON.stringify({ message, mode: 'ayah' })
  });
  const response = await workerEntry.fetch(request, {
    // Deliberately present a key: the test proves deterministic routing takes precedence.
    GEMINI_API_KEY: 'test-only-not-a-real-secret',
    GEMINI_MODEL: 'test-model'
  }, {});

  assert.equal(response.status, 200, 'Deterministic response must return HTTP 200');
  const payload = await response.json();
  assert.equal(payload.provider, 'verified-project-data');
  assert.equal(payload.language, 'bn');
  assert.match(payload.answer, /بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ/);
  assert.match(payload.answer, /বাংলা উচ্চারণ/);
  assert.equal(outboundFetchCount, 0, 'No external API/context fetch is allowed for this deterministic request');
  console.log('PASS deterministic Bengali Fatiha chat route');
  console.log('PASS verified-project-data response and expected fields');
  console.log('PASS no Gemini, Cloudflare AI, or remote context fetch');
} finally {
  globalThis.fetch = originalFetch;
}
