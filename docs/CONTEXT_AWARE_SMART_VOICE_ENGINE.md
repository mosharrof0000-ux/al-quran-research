# Context-Aware Smart Voice Engine v1

Mosharrof's first conservative Bengali voice post-processing layer.

## Pipeline
1. ASR produces raw Bengali transcript text.
2. sanitize_phonetic_speech normalizes transcript input; raw audio requires an explicit ASR adapter.
3. correct_contextual_grammar applies only high-confidence, meaning-preserving fixes.
4. apply_smart_punctuation adds Bengali sentence punctuation conservatively.
5. process_transcript returns raw text, normalized text, confidence, change status, and notes.

## Safety
- The original transcript is always retained.
- Unknown speech is not guessed.
- Raw audio is never decoded by heuristic code.
- Production wiring must be connected to the project's actual voice input path after integration tests.
