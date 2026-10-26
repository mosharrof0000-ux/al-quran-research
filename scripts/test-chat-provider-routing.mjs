import assert from 'node:assert/strict';
import worker from '../backend/worker.js';

const originalFetch = globalThis.fetch;
const post = async (env, message, mode = 'general') => {
  const request = new Request('https://worker.test/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, mode, language: 'bn' })
  });
  const response = await worker.fetch(request, env);
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  return body;
};

try {
  // The deterministic route must be identified separately and must not call a provider.
  globalThis.fetch = async () => {
    throw new Error('Unexpected external fetch on verified-project-data route');
  };
  const verified = await post(
    { GEMINI_API_KEY: 'test-only-key', GEMINI_MODEL: 'gemini-test' },
    'সূরা ফাতিহা ১ নম্বর আয়াতের প্রতিটি শব্দের মূল ধাতু ও ব্যাকরণ বিশ্লেষণ দিন',
    'ayah'
  );
  assert.equal(verified.provider, 'verified-project-data');
  assert.ok(verified.answer.includes('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'));
  assert.notEqual(verified.provider, 'gemini-test');
  assert.notEqual(verified.provider, 'cloudflare-ai');

  // Simulate a successful Gemini HTTP response; no real credentials or network are used.
  globalThis.fetch = async (url) => {
    assert.match(String(url), /generativelanguage\.googleapis\.com/);
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: 'MOCK_GEMINI_BENGALI_ANSWER' }] } }]
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  const gemini = await post(
    { GEMINI_API_KEY: 'test-only-key', GEMINI_MODEL: 'gemini-test' },
    'কুরআনের ভাষাতাত্ত্বিক গবেষণায় শব্দের মূল ধাতু কীভাবে যাচাই করা হয়?'
  );
  assert.equal(gemini.provider, 'gemini-test');
  assert.equal(gemini.answer, 'MOCK_GEMINI_BENGALI_ANSWER');

  // Simulate both Gemini models failing and Cloudflare AI returning the fallback.
  let geminiAttempts = 0;
  let cloudflareAttempts = 0;
  globalThis.fetch = async () => {
    geminiAttempts += 1;
    return new Response('simulated provider outage', { status: 503 });
  };
  const cloudflare = await post(
    {
      GEMINI_API_KEY: 'test-only-key',
      GEMINI_MODEL: 'gemini-test',
      AI: {
        run: async () => {
          cloudflareAttempts += 1;
          return { response: 'MOCK_CLOUDFLARE_BENGALI_ANSWER' };
        }
      }
    },
    'কুরআনের ভাষাতাত্ত্বিক গবেষণা কীভাবে প্রমাণভিত্তিক হয়?'
  );
  assert.equal(geminiAttempts, 2, 'primary and fallback Gemini models should both be attempted');
  assert.equal(cloudflareAttempts, 1, 'Cloudflare AI fallback should be attempted once');
  assert.equal(cloudflare.provider, 'cloudflare-ai');
  assert.equal(cloudflare.answer, 'MOCK_CLOUDFLARE_BENGALI_ANSWER');
  assert.notEqual(cloudflare.provider, verified.provider);

  console.log('PASS: provider labels distinguish verified-project-data, mocked Gemini, and mocked Cloudflare AI; no live provider/network call was made.');
} finally {
  globalThis.fetch = originalFetch;
}
