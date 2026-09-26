# Context-Aware Smart Voice Engine v1

Mosharrof-এর বাংলা voice transcript post-processing layer।

Pipeline: Speech/ASR -> phonetic sanitation -> conservative contextual correction -> smart punctuation -> VoiceResult.

Safety:
- Raw transcript always retained.
- Only high-confidence, meaning-preserving corrections.
- Audio bytes require an explicit ASR adapter.
- No ASR provider is hard-coded.
- Live integration requires project verification and backup rules.
