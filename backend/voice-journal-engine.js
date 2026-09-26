/* Mosharrof Context-Aware Smart Voice Engine v1
 * Transcript post-processing only. Raw speech must remain recoverable.
 */

const BENGALI_SENTENCE_END = /[।!?]$/;
const QUESTION_START = /^(কি|কী|কেন|কিভাবে|কীভাবে|কোথায়|কোথায়|কখন|কে|কোন|কোনটা|কত|হবে কি|পারবেন|পারি|হয় কি|হয় কি)(?=\s|$)/i;

export function sanitize_phonetic_speech(rawText) {
  return String(rawText ?? '')
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function apply_smart_punctuation(rawText) {
  const text = sanitize_phonetic_speech(rawText);
  if (!text) return '';
  if (BENGALI_SENTENCE_END.test(text)) return text;
  if (QUESTION_START.test(text)) return text + '?';
  return text + '।';
}

export function correct_contextual_grammar(rawText, context = '') {
  const text = sanitize_phonetic_speech(rawText);
  return {
    text,
    changed: false,
    confidence: text ? 0.99 : 1,
    reason: context ? 'conservative-pass-context-available' : 'conservative-pass'
  };
}

export function processVoiceTranscript(rawText, context = '') {
  const sanitized = sanitize_phonetic_speech(rawText);
  const corrected = correct_contextual_grammar(sanitized, context);
  const punctuated = apply_smart_punctuation(corrected.text);
  return {
    raw_text: String(rawText ?? ''),
    sanitized_text: sanitized,
    corrected_text: corrected.text,
    text: punctuated,
    changed: corrected.changed || punctuated !== corrected.text,
    correction_confidence: corrected.confidence,
    engine: 'context-aware-smart-voice-v1'
  };
}
