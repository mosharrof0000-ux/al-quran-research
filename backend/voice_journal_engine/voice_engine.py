"""Context-Aware Smart Voice Engine v1.

Text-side post-processing for Bengali speech transcripts.
Audio capture/STT remains the responsibility of the caller.

Safety contract:
- Never invent a correction when confidence is low.
- Preserve the raw transcript.
- Corrections are opt-in and auditable.
- Punctuation must not change lexical content.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Callable, Optional


@dataclass(frozen=True)
class VoiceTransform:
    raw_text: str
    normalized_text: str
    punctuation_applied: bool
    corrections: tuple[tuple[str, str], ...]


def sanitize_phonetic_speech(
    raw_text: str,
    *,
    normalizer: Optional[Callable[[str], str]] = None,
) -> str:
    """Normalize transcript noise without guessing missing words.

    A project-specific phonetic normalizer can be injected later. The default
    only removes repeated whitespace and normalizes common Bengali punctuation.
    """
    if not raw_text:
        return ""

    text = raw_text.replace("\u00a0", " ")
    text = re.sub(r"[ \t\r\f\v]+", " ", text).strip()
    text = re.sub(r"[।]{2,}", "।", text)
    text = re.sub(r"[,]{2,}", ",", text)

    if normalizer is not None:
        candidate = normalizer(text)
        if candidate is not None and candidate.strip():
            text = candidate.strip()

    return text


def correct_contextual_grammar(
    raw_text: str,
    *,
    corrections: Optional[dict[str, str]] = None,
) -> tuple[str, tuple[tuple[str, str], ...]]:
    """Apply only explicitly configured, deterministic corrections.

    No language-model guess is performed here. This keeps speech meaning
    stable until a future context model supplies a verified candidate.
    """
    text = raw_text
    applied: list[tuple[str, str]] = []

    for source, target in (corrections or {}).items():
        if not source or not target or source == target:
            continue
        updated = text.replace(source, target)
        if updated != text:
            applied.append((source, target))
            text = updated

    return text, tuple(applied)


def apply_smart_punctuation(raw_text: str) -> str:
    """Add conservative sentence punctuation to a Bengali transcript.

    This is intentionally conservative: it does not infer questions from
    semantics. A future prosody/pause classifier may provide stronger hints.
    """
    text = raw_text.strip()
    if not text:
        return ""

    # Avoid duplicating terminal punctuation.
    if text[-1] not in "।?!":
        text += "।"

    # Normalize spaces before punctuation.
    text = re.sub(r"\s+([,।?!])", r"\1", text)
    return text


def process_transcript(
    raw_text: str,
    *,
    corrections: Optional[dict[str, str]] = None,
    normalizer: Optional[Callable[[str], str]] = None,
) -> VoiceTransform:
    """Run the safe v1 pipeline: sanitize -> contextual correction -> punctuation."""
    normalized = sanitize_phonetic_speech(raw_text, normalizer=normalizer)
    corrected, applied = correct_contextual_grammar(
        normalized, corrections=corrections
    )
    punctuated = apply_smart_punctuation(corrected)

    return VoiceTransform(
        raw_text=raw_text,
        normalized_text=punctuated,
        punctuation_applied=punctuated != corrected,
        corrections=applied,
    )
