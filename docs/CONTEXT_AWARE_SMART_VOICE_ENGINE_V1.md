# Context-Aware Smart Voice Engine v1

Pipeline: Speech/ASR → phonetic sanitation → conservative contextual correction → smart punctuation → chat.

Functions:
- `apply_smart_punctuation(raw_text)`
- `correct_contextual_grammar(raw_text)`
- `sanitize_phonetic_speech(audio_stream)`
- `process_transcript(raw_text)`

Safety:
- Raw transcript is retained.
- Only high-confidence meaning-preserving corrections are applied.
- Ambiguous raw audio is never guessed without an explicit ASR adapter.
- This is input normalization, not verified research data.
- Browser voice uses a matching lightweight normalization layer because the current UI receives SpeechRecognition transcripts directly.

Status: isolated feature branch; live verification required after merge/deploy.
