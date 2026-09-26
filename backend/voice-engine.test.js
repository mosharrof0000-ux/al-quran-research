import assert from "node:assert/strict";
import { applySmartPunctuation, correctContextualGrammar, sanitizePhoneticSpeech, processVoiceTranscript } from "./voice-engine.js";

assert.equal(applySmartPunctuation([
  { text: "আপনি কেমন", pauseMs: 500 }, { text: "আছেন", pauseMs: 1100 }
]), "আপনি কেমন, আছেন।");

assert.equal(applySmartPunctuation([
  { text: "আপনি আসবেন", pauseMs: 1000, intonation: "rising-question" }
]), "আপনি আসবেন?");

assert.equal(correctContextualGrammar("আমি গবেষণা করতেছি",
  [{ from: "করতেছি", to: "করছি", confidence: 0.94, editDistance: 1 }]), "আমি গবেষণা করছি");

assert.equal(correctContextualGrammar("আমি গবেষণা করতেছি",
  [{ from: "করতেছি", to: "করছি", confidence: 0.60, editDistance: 1 }]), "আমি গবেষণা করতেছি");

assert.deepEqual(sanitizePhoneticSpeech("আমি কোরান গবেষণা করছি",
  { aliases: { "কোরান": "কুরআন" } }),
  { transcript: "আমি কুরআন গবেষণা করছি", changed: true, mode: "text-sanitizer" });

assert.equal(processVoiceTranscript({
  segments: [{ text: "আপনি আসবেন", pauseMs: 1000, intonation: "rising-question" }]
}).transcript, "আপনি আসবেন?");

console.log("Context-Aware Smart Voice Engine v1 tests: PASS");
