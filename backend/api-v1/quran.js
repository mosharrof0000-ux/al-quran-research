import { positiveInt } from './validation.js';
import { error, json } from './response.js';

const DATA_URL = 'https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/fatiha-master-v1.json';

async function loadSnapshot() {
  const r = await fetch(DATA_URL, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error('MASTER_DATASET_FETCH_FAILED');
  return r.json();
}

function surahs(data) {
  if (Array.isArray(data?.surahs)) return data.surahs;
  if (data?.surah) return [{ ...data.surah, name_bengali: data.surah.name_bn, ayahs: data.ayahs || [] }];
  return [];
}

export async function getAyah(surahValue, ayahValue, origin) {
  try {
    const surahNo = positiveInt(surahValue, 'SURAH', { max: 114 });
    const ayahNo = positiveInt(ayahValue, 'AYAH', { max: 286 });
    const data = await loadSnapshot();
    const surah = surahs(data).find(s => Number(s.surah_number) === surahNo);
    const ayah = surah?.ayahs?.find(a => Number(a.ayah_number) === ayahNo);
    if (!ayah) return error('AYAH_NOT_FOUND', 'Requested ayah is not in the verified dataset.', 404, origin);
    return json({
      ok: true,
      api_version: 'v1',
      source: 'master-dataset',
      dataset_version: data.dataset_version || 'unknown',
      surah_number: surahNo,
      surah_name: surah.name_bengali || surah.name_bn || surah.name_ar || null,
      ...ayah
    }, 200, origin);
  } catch (e) {
    const code = String(e?.message || e);
    return error(code === 'MASTER_DATASET_FETCH_FAILED' ? code : 'VALIDATION_ERROR', 'Unable to read Qur’an data.', code === 'MASTER_DATASET_FETCH_FAILED' ? 503 : 400, origin);
  }
}
