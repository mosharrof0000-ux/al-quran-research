const assert = require("node:assert/strict");
const {
  applySmartPunctuation,
  correctContextualGrammar,
  normalizeTranscript,
  sanitizePhoneticSpeech
} = require("./voice-journal-engine");

assert.equal(applySmartPunctuation("আপনি কেমন আছেন"), "আপনি কেমন আছেন।");
assert.equal(applySmartPunctuation("আপনি কোথায়"), "আপনি কোথায়?");
assert.equal(applySmartPunctuation("আপনি কোথায়?"), "আপনি কোথায়?");

assert.equal(
  correctContextualGrammar("মশারফ কোরান রিসার্চ করবেন"),
  "মোশাররফ কুরআন গবেষণা করবেন"
);

const normalized = normalizeTranscript("আমি কোরআন রিসার্চ করবেন", { phoneticMap: { "কোরআন": "কুরআন", "রিসার্চ": "গবেষণা" } });
assert.equal(normalized.text, "আমি কুরআন গবেষণা করব।");
assert.equal(normalized.rawText, "আমি কোরআন রিসার্চ করবেন");
assert.equal(normalized.changed, true);

(async () => {
  const result = await sanitizePhoneticSpeech(
    { audio: "test" },
    async () => ({ text: "মোশারফ কোরান গবেষণা", confidence: 0.98 })
  );
  assert.equal(result.text, "মোশাররফ কুরআন গবেষণা।");
  assert.equal(result.confidence, 0.98);
  console.log("VoiceJournalEngine v1 tests: PASS");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
