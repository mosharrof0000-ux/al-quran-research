# Open Quran Reader Source Registration — 2026-09-18

## Candidate source
- Dataset: Multilingual Quran Dataset
- Provider: Anis Afifi
- Repository: https://huggingface.co/datasets/anisafifi/multilingual-quran
- Declared license: CC BY 4.0
- Coverage: 6,236 verses
- Fields: Arabic text, Bengali translation, Bengali transliteration, and other languages.

## Important source-provenance gate
The dataset declares CC BY 4.0, but its repository states that source material was assembled from other Quran resources. Therefore the project will not assume that the dataset-level license overrides the rights/terms of each underlying translation or source.

## Project handling rule
- No rewriting, normalization, paraphrasing, or silent alteration.
- Preserve source text exactly when an edition is admitted.
- Keep edition/source metadata and attribution.
- Do not promote this candidate to the live canonical Quran source until underlying-source rights are verified.

## Reader goal
This candidate is registered for evaluation as an interim Quran reading source. The final reader should keep SOURCE, READER, and RESEARCH layers separate.

## Next gate
Verify each intended Bengali translation/transliteration source and its redistribution terms. If confirmed, import that exact source as a separate immutable edition and provide the canonical live link for user testing before approval.
