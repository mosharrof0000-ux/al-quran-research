/* আল-কুরআন গবেষণা — CORS Safety Wrapper v1
   Worker-এর যেকোনো success/error/recovery response-এ browser CORS header নিশ্চিত করে।
   মূল গবেষণা/AI logic পরিবর্তন করে না।
   Deployment trigger: 2026-09-10 connection recovery check.
*/
import entry from './worker-entry.js';

const ALLOWED_ORIGINS = ['https://mosharrof0000-ux.github.io'];

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Vary': 'Origin'
  };
}

function withCors(response, origin) {
  const headers = new Headers(response.headers);
  const cors = corsHeaders(origin);
  for (const [key, value] of Object.entries(cors)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    try {
      const response = await entry.fetch(request, env, ctx);
      return withCors(response, origin);
    } catch (error) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'WORKER_RUNTIME_ERROR',
        message: String(error?.message || error).slice(0, 500)
      }), {
        status: 500,
        headers: {
          ...corsHeaders(origin),
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
  }
};
