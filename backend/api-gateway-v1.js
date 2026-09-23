/* আল-কুরআন গবেষণা — API Gateway v1
   Stable routing layer. Existing AI/Research implementations remain behind it.
*/
import { handleResearchApi } from './research-api.js';

const API_VERSION = 'v1';
const ALLOWED_ORIGINS = ['https://mosharrof0000-ux.github.io'];

function cors(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(data, status, origin, extra = {}) {
  const headers = new Headers({ ...cors(origin), 'Content-Type': 'application/json; charset=utf-8', ...extra });
  return new Response(JSON.stringify(data), { status, headers });
}

export async function handleApiGateway(request, env, ctx) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return null;

  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] !== 'api') return null;

  if (parts[1] !== API_VERSION) {
    return json({ ok:false, error:'API_VERSION_NOT_FOUND', supported:['/api/v1'] }, 404, origin);
  }

  if (parts[2] === 'health') {
    return json({
      ok:true,
      api_version:API_VERSION,
      service:'al-quran-research-api',
      components:{ gateway:true, research_api:true, database: Boolean(env.DB), ai: Boolean(env.AI || env.GEMINI_API_KEY) }
    }, 200, origin, { 'Cache-Control':'no-store' });
  }

  if (parts[2] === 'status') {
    const response = await handleResearchApi(new Request(new URL('/api/v1/status', url), { method:'GET' }));
    if (response) return response;
  }

  const research = await handleResearchApi(request);
  if (research) return research;

  return json({
    ok:false,
    error:'ENDPOINT_NOT_FOUND',
    api_version:API_VERSION,
    endpoints:[
      'GET /api/v1/health',
      'GET /api/v1/status',
      'GET /api/v1/surah/{surah_number}',
      'GET /api/v1/ayah/{surah_number}/{ayah_number}',
      'GET /api/v1/word/{token_id}',
      'GET /api/v1/search?q={query}'
    ]
  }, 404, origin);
}
