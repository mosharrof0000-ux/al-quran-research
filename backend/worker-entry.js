/* আল-কুরআন গবেষণা — নিরাপদ Worker Entry Wrapper v1.1

বর্তমান worker.js অপরিবর্তিত রেখে Research API-কে সামনে আনার জন্য
এই wrapper ব্যবহার করা হবে। Research API route হলে সেটি response দেবে;
অন্য সব request বর্তমান worker.js-এ চলে যাবে।

নিরাপদ AI diagnostic endpoint:
/diagnostic — Secret-এর মূল্য প্রকাশ না করে runtime-এ GEMINI_API_KEY
আছে কি না এবং Gemini API reachable কি না পরীক্ষা করে।
*/

import worker from './worker.js';
import { handleResearchApi } from './research-api.js';

const ALLOWED_ORIGINS = [
  'https://mosharrof0000-ux.github.io'
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}

function diagnosticJson(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin)
  });
}

async function handleDiagnostic(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== '/diagnostic') return null;

  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (request.method !== 'GET') {
    return diagnosticJson({ ok: false, error: 'শুধু GET অনুরোধ গ্রহণ করা হয়।' }, 405, origin);
  }

  const result = {
    ok: true,
    service: 'al-quran-research-diagnostic',
    worker_runtime: 'reachable',
    gemini_key_present: Boolean(env.GEMINI_API_KEY),
    gemini_test: 'not-run'
  };

  if (!env.GEMINI_API_KEY) {
    result.ok = false;
    result.gemini_test = 'skipped-key-missing';
    return diagnosticJson(result, 200, origin);
  }

  try {
    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Reply with exactly: OK' }] }],
        generationConfig: { maxOutputTokens: 8, temperature: 0 }
      })
    });

    result.gemini_model = model;
    result.gemini_http_status = response.status;
    result.gemini_test = response.ok ? 'success' : 'failed';
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      result.gemini_error = detail.slice(0, 300);
      result.ok = false;
    }
  } catch (error) {
    result.gemini_test = 'network-error';
    result.gemini_error = String(error?.message || error).slice(0, 300);
    result.ok = false;
  }

  return diagnosticJson(result, 200, origin);
}

export default {
  async fetch(request, env, ctx) {
    const diagnosticResponse = await handleDiagnostic(request, env);
    if (diagnosticResponse) return diagnosticResponse;

    const researchResponse = await handleResearchApi(request);

    if (researchResponse) {
      return researchResponse;
    }

    return worker.fetch(request, env, ctx);
  }
};
