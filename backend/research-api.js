/* আল-কুরআন গবেষণা — Research API Adapter v1.0
   Master Dataset → Read-only API

   এই স্তর UI বা AI logic বদলায় না।
   Canonical dataset: data/fatiha-master-v1.json
   ভবিষ্যতে একই API contract Cloudflare D1-এ সরানো যাবে।
*/

const DATA_URL = 'https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/fatiha-master-v1.json';
const CACHE_KEY = 'al-quran-research:master:v1';

function apiJson(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    }
  });
}

async function loadMasterDataset() {
  const cached = await caches.default.match(new Request('https://cache.local/' + CACHE_KEY));
  if (cached) return cached.json();

  const response = await fetch(DATA_URL, {
    headers: { 'Accept': 'application/json' },
    cf: { cacheTtl: 60, cacheEverything: true }
  });

  if (!response.ok) throw new Error(`Master dataset fetch failed: ${response.status}`);

  const data = await response.json();
  const cacheResponse = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
  await caches.default.put(new Request('https://cache.local/' + CACHE_KEY), cacheResponse);
  return data;
}

function normalizePath(pathname) {
  return pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
}

export async function handleResearchApi(request) {
  const url = new URL(request.url);
  const parts = normalizePath(url.pathname);

  // API contract: /api/v1/...
  if (parts[0] !== 'api' || parts[1] !== 'v1') return null;
  if (request.method !== 'GET') return apiJson({ error: 'METHOD_NOT_ALLOWED' }, 405);

  try {
    const db = await loadMasterDataset();
    const surahs = Array.isArray(db.surahs) ? db.surahs : [];

    if (parts[2] === 'status') {
      return apiJson({
        api_version: '1.0',
        schema_version: db.schema_version || 'unknown',
        dataset_version: db.dataset_version || 'unknown',
        status: db.status || 'unknown',
        source: 'master-dataset'
      });
    }

    if (parts[2] === 'surah' && parts[3]) {
      const number = Number(parts[3]);
      const surah = surahs.find(s => Number(s.surah_number) === number);
      if (!surah) return apiJson({ error: 'SURAH_NOT_FOUND' }, 404);
      return apiJson(surah);
    }

    if (parts[2] === 'ayah' && parts[3] && parts[4]) {
      const surahNumber = Number(parts[3]);
      const ayahNumber = Number(parts[4]);
      const surah = surahs.find(s => Number(s.surah_number) === surahNumber);
      const ayah = surah?.ayahs?.find(a => Number(a.ayah_number) === ayahNumber);
      if (!ayah) return apiJson({ error: 'AYAH_NOT_FOUND' }, 404);
      return apiJson({
        surah_number: surahNumber,
        surah_name: surah.name_bengali,
        ...ayah
      });
    }

    if (parts[2] === 'word' && parts[3]) {
      const tokenId = parts.slice(3).join('/');
      for (const surah of surahs) {
        for (const ayah of (surah.ayahs || [])) {
          const token = (ayah.tokens || []).find(t => t.token_id === tokenId);
          if (token) return apiJson({
            surah_number: surah.surah_number,
            ayah_number: ayah.ayah_number,
            ...token
          });
        }
      }
      return apiJson({ error: 'WORD_NOT_FOUND' }, 404);
    }

    if (parts[2] === 'search') {
      const q = String(url.searchParams.get('q') || '').trim().toLowerCase();
      if (!q) return apiJson({ results: [] });

      const results = [];
      for (const surah of surahs) {
        for (const ayah of (surah.ayahs || [])) {
          const haystack = JSON.stringify(ayah).toLowerCase();
          if (haystack.includes(q)) {
            results.push({
              surah_number: surah.surah_number,
              ayah_number: ayah.ayah_number,
              arabic_text: ayah.arabic_text,
              analysis_status: ayah.analysis_status
            });
          }
        }
      }
      return apiJson({ query: q, count: results.length, results });
    }

    return apiJson({
      error: 'UNKNOWN_ENDPOINT',
      endpoints: [
        '/api/v1/status',
        '/api/v1/surah/{surah_number}',
        '/api/v1/ayah/{surah_number}/{ayah_number}',
        '/api/v1/word/{token_id}',
        '/api/v1/search?q={query}'
      ]
    }, 404);
  } catch (error) {
    return apiJson({
      error: 'RESEARCH_DATA_UNAVAILABLE',
      message: 'Master dataset এখন পাওয়া যাচ্ছে না।',
      detail: String(error?.message || error)
    }, 503);
  }
}
