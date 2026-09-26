/**
 * Mosharrof Context-Aware Smart Voice Engine v1
 * ASR transcript -> phonetic normalization -> contextual correction -> punctuation.
 * Audio-to-text remains an adapter boundary; uncertain speech is preserved.
 */

const DEFAULT_PHONETIC_MAP = Object.freeze({
  "মশারফ": "মোশাররফ",
  "মোশারফ": "মোশাররফ",
  "কোরান": "কুরআন",
  "কোরআন": "কুরআন",
  "রিসার্চ": "গবেষণা"
});

const DEFAULT_CONTEXT_MAP = Object.freeze({
  "মোশারফ এআই": "Mosharrof AI",
  "ভয়েস জার্নাল": "Voice Journal",
  "ভয়েস জার্নাল": "Voice Journal"
});

function cleanWhitespace(text) {
  return String(text ?? "").replace(/\s+/gu, " ").trim();
}

function applySmartPunctuation(rawText) {
  let text = cleanWhitespace(rawText);
  if (!text) return "";
  if (/[।!?]$/u.test(text)) return text;

  if (/(?:কি|কী|কেন|কোথায়|কোথায়|কখন|কীভাবে|কিভাবে|কত|কে|কার|কোনটি|কোনটা)\s*$/u.test(text)) {
    return text + "?";
  }

  return text + "।";
}

function replaceWholeWords(text, replacements) {
  let output = String(text ?? "");
  for (const [from, to] of Object.entries(replacements || {})) {
    const pattern = new RegExp("(^|\\s)" + from.replace(/[.*+?^()|[\]\\]/g, "\\$&") + "(?=\\s|[।,!?]|$)", "gu");
    output = output.replace(pattern, "$1" + to);
  }
  return output;
}

function correctContextualGrammar(rawText, context = {}) {
  let text = cleanWhitespace(rawText);
  if (!text) return "";

  text = replaceWholeWords(text, context.contextMap || DEFAULT_CONTEXT_MAP);
  text = replaceWholeWords(text, context.phoneticMap || DEFAULT_PHONETIC_MAP);

  return text
    .replace(/আমি\s+যাবেন\b/gu, "আমি যাব")
    .replace(/আমি\s+করবেন\b/gu, "আমি করব")
    .replace(/তুমি\s+করবেন\b/gu, "তুমি করবে")
    .replace(/সে\s+করবেন\b/gu, "সে করবে");
}

function normalizeTranscript(input, context = {}) {
  const source = typeof input === "string" ? { text: input } : (input || {});
  const rawText = cleanWhitespace(source.text);
  if (!rawText) return { rawText: "", text: "", confidence: source.confidence ?? null, changed: false };

  const corrected = correctContextualGrammar(rawText, context);
  const punctuated = applySmartPunctuation(corrected);

  return {
    rawText,
    text: punctuated,
    confidence: source.confidence ?? null,
    alternatives: Array.isArray(source.alternatives) ? source.alternatives : [],
    changed: rawText !== punctuated
  };
}

async function sanitizePhoneticSpeech(audioStream, transcribe, context = {}) {
  if (typeof transcribe !== "function") {
    throw new TypeError("sanitizePhoneticSpeech requires an ASR transcribe(audioStream) adapter");
  }
  const transcript = await transcribe(audioStream);
  return normalizeTranscript(transcript, context);
}

module.exports = {
  applySmartPunctuation,
  correctContextualGrammar,
  sanitizePhoneticSpeech,
  normalizeTranscript
};
