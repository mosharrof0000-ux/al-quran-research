# Context-Aware Smart Voice Engine v1

## Pipeline
Speech/ASR -> phonetic sanitation -> conservative contextual correction -> smart punctuation -> VoiceResult.

## Safety
- Raw transcript is always retained.
- Only high-confidence, meaning-preserving corrections are applied.
- Audio bytes require an explicit Bengali ASR adapter; the engine never pretends to decode audio.
- Punctuation does not change lexical content.
- No ASR provider is hard-coded in v1.

## API
- apply_smart_punctuation(raw_text)
- correct_contextual_grammar(raw_text)
- sanitize_phonetic_speech(audio_stream, transcriber=None)
- process_transcript(raw_text)

This version is isolated for review. Live integration must follow project verification and backup rules.
