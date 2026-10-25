import { handleResearchApi } from './research-api.js';

export function parseAyahReference(message) {
  const raw = String(message || '').trim();
  const text = raw
    .replace(/[০-৯]/g, ch => String('০১২৩৪৫৬৭৮৯'.indexOf(ch)))
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ');

  const numeric = text.match(/(?:সূরা|সুরা)\s*(\d{1,3})\s*[:/.-]\s*(\d{1,3})/i);
  if (numeric) return { ref: [Number(numeric[1]), Number(numeric[2])], detected: true };

  const nameMap = [
    [/(?:সূরা|সুরা)\s*(?:আল[-\s]?)?বাকারা(?:র|কে|তে)?/i, 2],
    [/(?:সূরা|সুরা)\s*(?:আল[-\s]?)?ফাতিহা(?:র|কে|তে)?/i, 1],
    [/(?:^|\s)(?:আল[-\s]?)?বাকারা(?:র|কে|তে)?/i, 2],
    [/(?:^|\s)(?:আল[-\s]?)?ফাতিহা(?:র|কে|তে)?/i, 1]
  ];

  for (const [name, surahNumber] of nameMap) {
    const found = name.exec(text);
    if (!found) continue;
    const rest = text.slice(found.index + found[0].length);
    const number =
      rest.match(/(?:আয়াত|আয়াত|verse|ayat)\s*(?:নম্বর|নং|নাম্বার)?\s*(\d{1,3})/i) ||
      rest.match(/(\d{1,3})\s*(?:নম্বর|নং|নাম্বার)?\s*(?:আয়াত|আয়াত|verse|ayat)/i) ||
      rest.match(/^\s*(?:নম্বর|নং|নাম্বার)?\s*(\d{1,3})(?!\d)/i);
    if (number) return { ref: [surahNumber, Number(number[1])], detected: true };
  }

  const explicit =
    (/(?:সূরা|সুরা)/i.test(raw) &&
      /(?:আয়াত|আয়াত|verse|ayat)/i.test(raw) &&
      /[0-9০-৯]{1,3}/.test(raw)) ||
    /(?:সূরা|সুরা)\s*[0-9০-৯]{1,3}\s*[:/.-]\s*[0-9০-৯]{1,3}/i.test(raw);
  return { ref: null, detected: explicit };
}

function buildResearchProvenance(data, surah, ayah) {
  const datasetVersion = data?.dataset_version || 'unknown';
  const ayahId = data?.ayah_id || 'S' + String(surah).padStart(3, '0') + '-A' + String(ayah).padStart(3, '0');
  const tokenIds = Array.isArray(data?.tokens) ? data.tokens.map(t => t?.token_id).filter(Boolean) : [];
  return {
    source_type: 'PROJECT_MASTER_DATASET',
    source_file: data?.source_file || data?.source?.file || data?.record_source_file || 'UNKNOWN_PROJECT_SOURCE',
    dataset_version: datasetVersion,
    dataset_status: data?.dataset_status || 'PILOT',
    ayah_id: ayahId,
    record_scope: 'surah=' + surah + ', ayah=' + ayah,
    token_ids: tokenIds,
    text_status: data?.text_status || null,
    analysis_status: data?.analysis_status || null,
    evidence_records: Array.isArray(data?.evidence)
      ? data.evidence.map(e => ({ evidence_id: e.evidence_id, source_type: e.source_type, name: e.name, scope: e.scope, note_bn: e.note_bn }))
      : [],
    rule: 'এই গবেষণা-রেকর্ডের বাইরে থাকা তথ্যকে প্রকল্পের verified data হিসেবে দাবি করা যাবে না।'
  };
}

export async function getResearchContext(message, env, researchApi = handleResearchApi) {
  const parsed = parseAyahReference(message);
  if (!parsed.detected) return { context: '', ref: null, reference_detected: false, used: false, provenance: null };
  if (!parsed.ref) return { context: '', ref: null, reference_detected: true, used: false, provenance: null };

  const [surah, ayah] = parsed.ref;
  try {
    const req = new Request('https://research.local/api/v1/ayah/' + surah + '/' + ayah, { method: 'GET' });
    const response = await researchApi(req, env);
    if (!response || !response.ok) return { context: '', ref: parsed.ref, reference_detected: true, used: false, provenance: null };
    const data = await response.json();
    if (!data || data.error) return { context: '', ref: parsed.ref, reference_detected: true, used: false, provenance: null };
    const provenance = buildResearchProvenance(data, surah, ayah);
    const context = JSON.stringify({ provenance, record: data }, null, 2).slice(0, 14000);
    return { context, ref: parsed.ref, reference_detected: true, used: true, provenance };
  } catch {
    return { context: '', ref: parsed.ref, reference_detected: true, used: false, provenance: null };
  }
}
