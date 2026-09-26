"""Mosharrof Context-Aware Smart Voice Engine v1."""
from __future__ import annotations
import re
from dataclasses import dataclass
from typing import Callable, Optional, Union

@dataclass(frozen=True)
class VoiceResult:
    raw_text: str
    normalized_text: str
    confidence: float
    changed: bool
    notes: tuple[str, ...] = ()

def _clean_spaces(text: str) -> str:
    text = re.sub(r"\s+", " ", str(text or "").strip())
    text = re.sub(r"\s+([,!?।])", r"\1", text)
    text = re.sub(r"([,!?।])(?=\S)", r"\1 ", text)
    return text.strip()

def apply_smart_punctuation(raw_text: str) -> str:
    text = _clean_spaces(raw_text)
    if not text:
        return ""
    if re.search(r"[?？]$", text):
        return text[:-1].rstrip() + "?"
    if re.search(r"[।.!]$", text):
        return text
    q = r"(কি|কী|কেন|কীভাবে|কিভাবে|কোথায়|কোথায়|কখন|কে|কাকে|কোন|কত|কেমন)"
    return text + ("?" if re.search(rf"(?:^|\s){q}(?:\s|$)", text) or re.search(rf"\s{q}\s*$", text) else "।")

_COMMON_CONTEXT_FIXES = {
    "কোরআন গবেষনা": "কোরআন গবেষণা",
    "গবেষনা": "গবেষণা",
}

def correct_contextual_grammar(raw_text: str) -> str:
    text = _clean_spaces(raw_text)
    for wrong, right in _COMMON_CONTEXT_FIXES.items():
        text = re.sub(rf"(?<!\S){re.escape(wrong)}(?!\S)", right, text)
    return text

def sanitize_phonetic_speech(audio_stream: Union[str, bytes], transcriber: Optional[Callable[[bytes], str]] = None) -> str:
    if isinstance(audio_stream, str):
        return _clean_spaces(audio_stream)
    if isinstance(audio_stream, bytes):
        if transcriber is None:
            raise ValueError("A Bengali ASR transcriber is required for audio bytes.")
        return _clean_spaces(transcriber(audio_stream))
    raise TypeError("audio_stream must be transcript text or audio bytes")

def process_transcript(raw_text: str, *, correction: bool = True, punctuation: bool = True) -> VoiceResult:
    original = sanitize_phonetic_speech(raw_text)
    text = correct_contextual_grammar(original) if correction else original
    text = apply_smart_punctuation(text) if punctuation else text
    notes = []
    if correction and text != original:
        notes.append("conservative contextual normalization")
    if punctuation and re.search(r"[.!?।]$", text) and not re.search(r"[.!?।]$", original):
        notes.append("smart punctuation")
    return VoiceResult(str(raw_text or ""), text, 0.98 if notes else 1.0, text != original, tuple(notes))
