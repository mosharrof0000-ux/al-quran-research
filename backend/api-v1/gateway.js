import { pathParts } from './validation.js';
import { error, json, options } from './response.js';
import { health } from './health.js';
import { getAyah } from './quran.js';

export async function handleApiV1(request, env) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin') || '';
  const parts = pathParts(url.pathname);

  if (parts[0] !== 'api' || parts[1] !== 'v1') return null;
  if (request.method === 'OPTIONS') return options(origin);
  if (request.method !== 'GET') return error('METHOD_NOT_ALLOWED', 'Only GET is enabled in this read-only foundation.', 405, origin);

  try {
    if (parts[2] === 'health') return json({ ok: true, ...health(env) }, 200, origin);
    if (parts[2] === 'status') return json({ ok: true, ...health(env), contract: 'v1' }, 200, origin);

    if (parts[2] === 'ayah' && parts[3] && parts[4]) {
      return await getAyah(parts[3], parts[4], origin);
    }

    return error('UNKNOWN_ENDPOINT', 'API endpoint not found.', 404, origin, {
      available: [
        'GET /api/v1/health',
        'GET /api/v1/status',
        'GET /api/v1/ayah/{surah}/{ayah}'
      ]
    });
  } catch (e) {
    return error('API_INTERNAL_ERROR', 'API request failed safely.', 500, origin);
  }
}
