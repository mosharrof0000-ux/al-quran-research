"""Context-Aware Smart Voice Engine v1."""
from __future__ import annotations
import re
from dataclasses import dataclass
from typing import Callable, Mapping, Optional

@dataclass(frozen=True)
class Correction:
    original: str
    corrected: str
    confidence: float
    reason: str

@dataclass(frozen=True)
class VoiceProcessResult:
    raw_text: str
    sanitized_text: str
    corrected_text: str
    final_text: str
    corrections: tuple[Correction, ...]

def apply_smart_punctuation(raw_text: str) -> str:
    text = re.sub(r"[ \t]+", " ", raw_text.strip())
    if not text: return ""
    text = re.sub(r"\s*([.!]+)\s*", "। ", text)
    text = re.sub(r"\s*\?\s*", "? ", text)
    text = re.sub(r"\s*।\s*", "। ", text)
    text = re.sub(r"\s+", " ", text).strip()
    if text and text[-1] not in "।?!": text += "।"
    return text

def correct_contextual_grammar(raw_text: str, corrections: Optional[Mapping[str, str]] = None, *, min_confidence: float = 0.90, confidence_fn: Optional[Callable[[str, str, str], float]] = None):
    if not raw_text: return "", ()
    text = raw_text
    applied = []
    for original, candidate in (corrections or {}).items():
        if not original or not candidate or original == candidate or original not in text: continue
        confidence = confidence_fn(original, candidate, text) if confidence_fn else 1.0
        if confidence < min_confidence: continue
        text = text.replace(original, candidate)
        applied.append(Correction(original, candidate, confidence, "high-confidence contextual correction"))
    return text, tuple(applied)

def sanitize_phonetic_speech(audio_stream) -> str:
    if audio_stream is None: return ""
    text = getattr(audio_stream, "text", audio_stream)
    if not isinstance(text, str): raise TypeError("audio_stream must contain or resolve to text")
    text = text.replace("\u200c", "").replace("\u200d", "")
    return re.sub(r"[ \t\r\n]+", " ", text).strip()

def process_voice(raw_text: str, *, corrections=None, confidence_fn=None, min_confidence: float = 0.90) -> VoiceProcessResult:
    sanitized = sanitize_phonetic_speech(raw_text)
    corrected, log = correct_contextual_grammar(sanitized, corrections, min_confidence=min_confidence, confidence_fn=confidence_fn)
    return VoiceProcessResult(raw_text, sanitized, corrected, apply_smart_punctuation(corrected), log)