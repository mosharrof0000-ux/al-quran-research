import { processVoiceTranscript, apply_smart_punctuation, sanitize_phonetic_speech } from '../backend/voice-journal-engine.js';

const cases = [
  ['তুমি কেমন আছো', 'তুমি কেমন আছো।'],
  ['তুমি কেমন আছো?', 'তুমি কেমন আছো?'],
  ['কেন এমন হলো', 'কেন এমন হলো?'],
  ['  বাংলা   ভয়েস  ', 'বাংলা ভয়েস।']
];

for (const [input, expected] of cases) {
  const actual = apply_smart_punctuation(input);
  if (actual !== expected) throw new Error(`punctuation failed: ${input} -> ${actual}`);
}

if (sanitize_phonetic_speech('  কুরআন\u200B  গবেষণা  ') !== 'কুরআন গবেষণা') {
  throw new Error('sanitization failed');
}

const result = processVoiceTranscript('তুমি কেমন আছো');
if (result.text !== 'তুমি কেমন আছো।') throw new Error('pipeline failed');

console.log('voice-journal-engine tests: PASS');
