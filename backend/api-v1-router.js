/* আল-কুরআন গবেষণা — API v1 Gateway
   Stable control-plane endpoints. Existing research endpoints remain unchanged.
*/
const API_VERSION = '1.0';
const DATASET = 'master-dataset';
const ROUTES = [
  '/api/v1/health',
  '/api/v1/status',
  '/api/v1/capabilities',
  '/api/v1/surah/{surah_number}',
  '/api/v1/ayah/{surah_number}/{ayah_number}',
  '/api/v1/word/{token_id}',
  '/api/v1/search?q={query}'
];

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': origin || 'https://mosharrof0000-ux.github.io',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Vary': 'Origin'
    }
  });
}

export function handleApiV1(request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/v1/')) return null;
  if (request.method === 'OPTIONS') return json(null, 204, request.headers.get('Origin') || '');
  if (request.method !== 'GET') return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405, request.headers.get('Origin') || '');

  const origin = request.headers.get('Origin') || '';
  if (url.pathname === '/api/v1/health') {
    return json({
      ok: true,
      service: 'al-quran-research-api',
      api_version: API_VERSION,
      status: 'ready',
      dataset_layer: DATASET
    }, 200, origin);
  }

  if (url.pathname === '/api/v1/capabilities') {
    return json({
      ok: true,
      api_version: API_VERSION,
      read_only: true,
      routes: ROUTES,
      layers: {
        gateway: 'ready',
        research: 'v1-read-only',
        ai: 'worker-entry',
        database: 'migration-ready-d1'
      }
    }, 200, origin);
  }

  return null;
}
