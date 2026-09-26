const DEFAULT_CONFIG = {
  commaPauseMs: 450, sentencePauseMs: 900, questionConfidence: 0.72,
  correctionConfidence: 0.86, maxCorrectionDistance: 2,
};

function normalizeSpaces(text) {
  return String(text ?? "").replace(/[\\t\\r ]+/g, " ").replace(/\\n{3,}/g, "\\n\\n").trim();
}

function hasTerminalPunctuation(text) { return /[।!?！？]$/.test(text.trim()); }

function tokenRegex(token) {
  const escaped = token.replace(/[-/\\^$*+?.()|[\\]{}]/g, "\\\\$&");
  return new RegExp("(^|\\\\s)" + escaped + "(?=\\\\s|[।,!?！？]|$)", "gu");
}

export function applySmartPunctuation(segments, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options };
  if (typeof segments === "string") return normalizeSpaces(segments);
  if (!Array.isArray(segments)) throw new TypeError("segments must be a string or an array");
  const output = [];
  for (const segment of segments) {
    if (!segment || typeof segment.text !== "string") continue;
    let text = normalizeSpaces(segment.text);
    if (!text) continue;
    if (hasTerminalPunctuation(text)) { output.push(text); continue; }
    const pauseMs = Number(segment.pauseMs || 0);
    const intonation = String(segment.intonation || "").toLowerCase();
    const isQuestion = segment.isQuestion === true ||
      intonation === "rising-question" ||
      (intonation === "rising" && Number(segment.questionConfidence || 0) >= config.questionConfidence);
    if (isQuestion && pauseMs >= config.commaPauseMs) text += "?";
    else if (pauseMs >= config.sentencePauseMs) text += "।";
    else if (pauseMs >= config.commaPauseMs) text += ",";
    output.push(text);
  }
  return normalizeSpaces(output.join(" "));
}

export function correctContextualGrammar(rawText, candidates = [], options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options };
  let text = normalizeSpaces(rawText);
  if (!text || !Array.isArray(candidates)) return text;
  const sorted = [...candidates].filter(candidate =>
    candidate && typeof candidate.from === "string" && typeof candidate.to === "string" &&
    candidate.from.trim() && candidate.to.trim() &&
    Number(candidate.confidence) >= config.correctionConfidence &&
    Number(candidate.editDistance ?? 0) <= config.maxCorrectionDistance
  ).sort((a,b) => b.from.length - a.from.length);
  for (const candidate of sorted) {
    text = text.replace(tokenRegex(candidate.from), (_match, prefix) => prefix + candidate.to);
  }
  return normalizeSpaces(text);
}

export function sanitizePhoneticSpeech(audioStream, options = {}) {
  const aliases = options.aliases || {};
  const rawText = typeof audioStream === "string" ? audioStream :
    audioStream && typeof audioStream.transcript === "string" ? audioStream.transcript : "";
  if (!rawText) return { transcript: "", changed: false, mode: "text-sanitizer" };
  let transcript = normalizeSpaces(rawText);
  const before = transcript;
  for (const [spoken, normalized] of Object.entries(aliases).sort((a,b) => b[0].length - a[0].length)) {
    transcript = transcript.replace(tokenRegex(spoken), (_match, prefix) => prefix + normalized);
  }
  return { transcript, changed: transcript !== before, mode: "text-sanitizer" };
}

export function processVoiceTranscript({ segments, rawText, corrections = [], phoneticAliases = {}, options = {} } = {}) {
  const source = segments ?? rawText ?? "";
  const original = normalizeSpaces(typeof source === "string" ? source : source.map(s => s?.text || "").join(" "));
  const punctuated = applySmartPunctuation(source, options.punctuation);
  const corrected = correctContextualGrammar(punctuated, corrections, options.correction);
  const sanitized = sanitizePhoneticSpeech(corrected, { aliases: phoneticAliases });
  return {
    transcript: sanitized.transcript,
    stages: { punctuation: punctuated, correction: corrected, phonetic: sanitized.transcript },
    changed: sanitized.transcript !== original,
    mode: "context-aware-smart-voice-v1",
  };
}

export default { applySmartPunctuation, correctContextualGrammar, sanitizePhoneticSpeech, processVoiceTranscript };
