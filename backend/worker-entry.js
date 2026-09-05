/* আল-কুরআন গবেষণা — নিরাপদ Worker Entry Wrapper v1.5

Research API ও মূল worker.js অপরিবর্তিত রেখে chat-এর জন্য নির্ভরযোগ্য
Workers AI fallback রাখা হয়েছে। মূল AI ব্যর্থ হলে বর্তমান সক্রিয় Gemma 4
model, তারপর দ্বিতীয় সক্রিয় Llama recovery model দিয়ে উত্তর দেওয়ার চেষ্টা করা হবে।
*/

import worker from './worker.js';
import { handleResearchApi } from './research-api.js';
import { recoverChat } from './chat-recovery.js';

const ALLOWED_ORIGINS = [
  'https://mosharrof0000-ux.github.io'
];

const CHAT_SYSTEM = `তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী।
বাংলায় পরিষ্কার ও সংক্ষিপ্ত উত্তর দাও। কুরআনের আয়াত/আরবি পাঠ অনুমান করে বানাবে না।
প্রকল্পের যাচাইযোগ্য তথ্য না থাকলে তা স্পষ্ট বলবে। আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক থাকবে।
`;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin)
  });
}

async function handleDiagnostic(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== '/diagnostic') return null;

  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (request.method !== 'GET') return json({ ok: false, error: 'শুধু GET অনুরোধ গ্রহণ করা হয়।' }, 405, origin);

  const result = {
    ok: true,
    service: 'al-quran-research-diagnostic',
    worker_runtime: 'reachable',
    gemini_key_present: Boolean(env.GEMINI_API_KEY),
    workers_ai_binding_present: Boolean(env.AI),
    gemini_test: 'not-run'
  };

  if (!env.GEMINI_API_KEY) {
    result.ok = false;
    result.gemini_test = 'skipped-key-missing';
    return json(result, 200, origin);
  }

  try {
    const model = env.GEMINI_MODEL || 'gemini-3.8-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Reply with exactly: OK' }] }],
        generationConfig: { maxOutputTokens: 8, temperature: 0 }
      })
    });
    result.gemini_model = model;
    result.gemini_http_status = response.status;
    result.gemini_test = response.ok ? 'success' : 'failed';
    if (!response.ok) {
      result.gemini_error = (await response.text().catch(() => '')).slice(0, 300);
      result.ok = false;
    }
  } catch (error) {
    result.gemini_test = 'network-error';
    result.gemini_error = String(error?.message || error).slice(0, 300);
    result.ok = false;
  }

  return json(result, 200, origin);
}

async function workersAiFallback(request, env, origin) {
  if (request.method !== 'POST' || !env.AI) return null;

  let body;
  try {
    body = await request.clone().json();
  } catch {
    return null;
  }

  const message = String(body?.message || '').trim();
  if (!message) return null;

  try {
    const result = await env.AI.run('@cf/google/gemma-4-26b-a4b-it', {
      messages: [
        { role: 'system', content: CHAT_SYSTEM },
        { role: 'user', content: message }
      ],
      max_tokens: 1600,
      temperature: 0.1
    });

    const answer = result?.response || result?.choices?.[0]?.message?.content;
    if (!answer) return null;
    return json({ answer, mode: String(body?.mode || 'general'), language: 'bn', provider: 'cloudflare-workers-ai-fallback' }, 200, origin);
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';

    const diagnosticResponse = await handleDiagnostic(request, env);
    if (diagnosticResponse) return diagnosticResponse;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const researchResponse = await handleResearchApi(request);
    if (researchResponse) return researchResponse;

    // মূল chat worker-কে আগে চেষ্টা করা হয়; এতে বিদ্যমান verified Fatiha logic অক্ষুণ্ণ থাকে।
    const response = await worker.fetch(request.clone(), env, ctx);
    if (response.status < 500) return response;

    // প্রথম Workers AI fallback।
    const fallback = await workersAiFallback(request, env, origin);
    if (fallback) return fallback;

    // দ্বিতীয় recovery layer। প্রথম fallback ব্যর্থ হলেও সক্রিয় Llama model দিয়ে চেষ্টা করবে।
    const recovery = await recoverChat(request.clone(), env);
    if (recovery) return recovery;

    return response;
  }
};
