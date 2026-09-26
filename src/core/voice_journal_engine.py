"""Context-Aware Smart Voice Engine v1 for Mosharrof."""
from __future__ import annotations
import re
from dataclasses import dataclass, field
from typing import Mapping, Optional

@dataclass(frozen=True)
class VoiceContext:
    previous_text: str = ""
    domain: str = ""
    glossary: Mapping[str, str] = field(default_factory=dict)

@dataclass(frozen=True)
class VoiceResult:
    raw_text: str
    text: str
    corrections: tuple[tuple[str, str], ...] = ()

def apply_smart_punctuation(raw_text: str) -> str:
    text = re.sub(r"\s+", " ", (raw_text or "").strip())
    if not text:
        return ""
    text = re.sub(r"\s+([,।?!])", r"\1", text)
    text = re.sub(r"([,।?!])\1+", r"\1", text)
    for pattern, replacement in (
        (r"\s+(?:প্রশ্নবোধক|প্রশ্ন চিহ্ন)\s*$", "?"),
        (r"\s+(?:দাঁড়ি|দাড়ি|পূর্ণচ্ছেদ)\s*$", "।"),
        (r"\s+(?:কমা)\s*", ", "),
    ):
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    question_words = ("কি", "কী", "কেন", "কখন", "কোথায়", "কোথায়", "কে", "কাকে", "কার", "কত", "কেমন", "কোন", "কোনটি")
    if not text.endswith(("।", "?", "!", ",")):
        first = text.split(" ", 1)[0]
        text += "?" if first in question_words or any(f" {w} " in f" {text} " for w in question_words) else "।"
    return text

def correct_contextual_grammar(raw_text: str, context: Optional[VoiceContext] = None) -> tuple[str, tuple[tuple[str, str], ...]]:
    context = context or VoiceContext()
    text = raw_text or ""
    corrections: list[tuple[str, str]] = []
    for source, target in context.glossary.items():
        if source and target and source != target:
            updated = text.replace(source, target)
            if updated != text:
                corrections.append((source, target))
                text = updated
    updated = text.replace("দাড়ি", "দাঁড়ি")
    if updated != text:
        corrections.append(("দাড়ি", "দাঁড়ি"))
    return updated, tuple(corrections)

def sanitize_phonetic_speech(audio_stream: object, *, transcript: Optional[str] = None, context: Optional[VoiceContext] = None) -> VoiceResult:
    raw_text = transcript if transcript is not None else str(audio_stream or "")
    corrected, corrections = correct_contextual_grammar(raw_text, context)
    return VoiceResult(raw_text=raw_text, text=apply_smart_punctuation(corrected), corrections=corrections)

def process_voice_text(raw_text: str, *, context: Optional[VoiceContext] = None) -> VoiceResult:
    corrected, corrections = correct_contextual_grammar(raw_text, context)
    return VoiceResult(raw_text=raw_text, text=apply_smart_punctuation(corrected), corrections=corrections)

__all__ = ["VoiceContext", "VoiceResult", "apply_smart_punctuation", "correct_contextual_grammar", "sanitize_phonetic_speech", "process_voice_text"]
