"""Context-Aware Smart Voice Engine v1 for Mosharrof.

Conservative voice post-processing: punctuation and high-confidence contextual
normalization without silently rewriting uncertain user speech.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Mapping, Optional


@dataclass(frozen=True)
class VoiceContext:
    """Optional context supplied by the caller."""

    previous_text: str = ""
    domain: str = ""
    glossary: Mapping[str, str] = field(default_factory=dict)


@dataclass(frozen=True)
class VoiceResult:
    """Structured result preserving original and processed speech."""

    raw_text: str
    text: str
    corrections: tuple[tuple[str, str], ...] = ()


def apply_smart_punctuation(raw_text: str) -> str:
    """Normalize basic punctuation while preserving Bengali prose."""
    text = re.sub(r"\\s+", " ", (raw_text or "").strip())
    if not text:
        return ""

    text = re.sub(r"\\s+([,।?!])", r"\\1", text)
    text = re.sub(r"([,।?!])\\1+", r"\\1", text)

    replacements = (
        (r"\\s+(?:প্রশ্নবোধক|প্রশ্ন চিহ্ন)\\s*$", "?"),
        (r"\\s+(?:দাঁড়ি|দাড়ি|পূর্ণচ্ছেদ)\\s*$", "।"),
        (r"\\s+(?:কমা)\\s*", ", "),
    )
    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    question_words = (
        "কি", "কী", "কেন", "কখন", "কোথায়", "কোথায়", "কে",
        "কাকে", "কার", "কত", "কেমন", "কোন", "কোনটি",
    )
    if not text.endswith(("।", "?", "!", ",")):
        first = text.split(" ", 1)[0]
        if first in question_words or any(
            f" {word} " in f" {text} " for word in question_words
        ):
            text += "?"
        else:
            text += "।"
    return text


def correct_contextual_grammar(
    raw_text: str,
    context: Optional[VoiceContext] = None,
) -> tuple[str, tuple[tuple[str, str], ...]]:
    """Apply only high-confidence contextual replacements."""
    context = context or VoiceContext()
    text = raw_text or ""
    corrections: list[tuple[str, str]] = []

    for source, target in context.glossary.items():
        if not source or not target or source == target:
            continue
        updated = text.replace(source, target)
        if updated != text:
            corrections.append((source, target))
            text = updated

    standard = {"দাড়ি": "দাঁড়ি"}
    for source, target in standard.items():
        updated = text.replace(source, target)
        if updated != text:
            corrections.append((source, target))
            text = updated

    return text, tuple(corrections)


def sanitize_phonetic_speech(
    audio_stream: object,
    *,
    transcript: Optional[str] = None,
    context: Optional[VoiceContext] = None,
) -> VoiceResult:
    """Process an ASR transcript; audio decoding stays in an external adapter."""
    raw_text = transcript if transcript is not None else str(audio_stream or "")
    corrected, corrections = correct_contextual_grammar(raw_text, context)
    punctuated = apply_smart_punctuation(corrected)
    return VoiceResult(raw_text=raw_text, text=punctuated, corrections=corrections)


def process_voice_text(
    raw_text: str,
    *,
    context: Optional[VoiceContext] = None,
) -> VoiceResult:
    """Convenience pipeline: contextual correction followed by punctuation."""
    corrected, corrections = correct_contextual_grammar(raw_text, context)
    punctuated = apply_smart_punctuation(corrected)
    return VoiceResult(raw_text=raw_text, text=punctuated, corrections=corrections)


__all__ = [
    "VoiceContext",
    "VoiceResult",
    "apply_smart_punctuation",
    "correct_contextual_grammar",
    "sanitize_phonetic_speech",
    "process_voice_text",
]
