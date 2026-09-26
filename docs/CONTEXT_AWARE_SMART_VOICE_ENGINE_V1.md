# Context-Aware Smart Voice Engine v1

## Status
Implemented as an isolated backend module on `feature/context-aware-smart-voice-v1`. It is **not merged into main and is not a live deployment**.

## Pipeline
Speech/ASR -> phonetic sanitation -> conservative contextual correction -> smart punctuation -> VoiceResult.

## Safety
- Raw transcript is always retained.
- Only high-confidence, meaning-preserving corrections are applied.
- Audio bytes require an explicit Bengali ASR adapter; the engine never pretends to decode audio.
- Punctuation does not change lexical content.
- No ASR provider is hard-coded in v1.
- The module does not replace the project's existing live voice UI.

## API
- `apply_smart_punctuation(raw_text)`
- `correct_contextual_grammar(raw_text)`
- `sanitize_phonetic_speech(audio_stream, transcriber=None)`
- `process_transcript(raw_text)`

## Current implementation boundary
This first implementation provides conservative transcript post-processing and an ASR adapter boundary. True pause/intonation analysis and production ASR-provider wiring are intentionally left to the integration stage so that an unverified provider is not silently introduced.

## Verification
The module should be run through the project's Python test/CI environment before merge. Live integration must follow project verification and backup rules.
