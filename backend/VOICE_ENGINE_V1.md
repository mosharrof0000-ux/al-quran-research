# Context-Aware Smart Voice Engine v1

Status: isolated feature branch; not connected to production.

Features:
- Smart punctuation from pause/intonation metadata.
- Conservative contextual correction from high-confidence supplied candidates.
- Phonetic/colloquial normalization through an explicit alias dictionary.
- Combined transcript pipeline.

Safety:
- No raw research data overwrite.
- No secrets in code.
- Low-confidence corrections are ignored.
- Audio DSP/STT remains provider-layer responsibility.
- Production integration requires separate wiring and verification.

Test: node backend/voice-engine.test.js
