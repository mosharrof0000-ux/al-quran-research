/* Al-Quran Research API Gateway v1.0 */
import { handleResearchApi } from './research-api.js';

const API_VERSION = '1.0';
const ALLOWED_ORIGIN = 'https://mosharrof0000-ux.github.io';

function headers(origin, cache='no-store') {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': cache,
    'Vary': 'Origin'
  };
}
function json(data, status=200, origin='', cache='no-store') {
  return new Response(JSON.stringify(data), { status, headers: headers(origin, cache) });
}
export async function handleApiV1(request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/v1')) return null;
  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: headers(origin) });
  if (request.method !== 'GET') return json({ok:false,error:'METHOD_NOT_ALLOWED'},405,origin);
  if (url.pathname === '/api/v1' || url.pathname === '/api/v1/') {
    return json({ok:true,api_version:API_VERSION,service:'al-quran-research-api',mode:'read-only',endpoints:[
      '/api/v1/health','/api/v1/capabilities','/api/v1/status','/api/v1/surah/{surah_number}',
      '/api/v1/ayah/{surah_number}/{ayah_number}','/api/v1/word/{token_id}','/api/v1/search?q={query}'
    ]},200,origin,'public, max-age=30');
  }
  if (url.pathname === '/api/v1/capabilities') {    return json({ok:true,api_version:API_VERSION,read_only:true,layers:{gateway:'ready',research:'v1-read-only',ai:'worker-entry',database:'D1-ready-not-active'}},200,origin);\n  }\n  if (url.pathname === '/api/v1/health') {
    return json({ok:true,service:'al-quran-research-api',api_version:API_VERSION,read_only:true,
      data_layer:'master-dataset-adapter',database_migration:'D1-ready-not-active'},200,origin);
  }
  const response = await handleResearchApi(request);
  if (response) return response;
  return json({ok:false,error:'UNKNOWN_ENDPOINT'},404,origin);
}
