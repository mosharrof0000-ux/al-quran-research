"""Context-Aware Smart Voice Engine v1 for Mosharrof."""
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

def _clean_spaces(text: str) -> str:
    text = re.sub(r"\s+", " ", text.strip())
    text = re.sub(r"\s+([,!?।])", r"\1", text)
    text = re.sub(r"([,!?।])(?=\S)", r"\1 ", text)
    return text.strip()

def apply_smart_punctuation(raw_text: str) -> str:
    """Conservatively infer final Bengali punctuation from text cues."""
    text = _clean_spaces(raw_text)
    if not text:
        return ""
    if re.search(r"[?؟]$", text):
        return text[:-1].rstrip() + "?"
    if re.search(r"[।.!]$", text):
        return text
    question_words = (
        "কি", "কী", "কেন", "কীভাবে", "কিভাবে", "কোথায়", "কোথায়",
        "কখন", "কে", "কাকে", "কার", "কোন", "কত", "কেমন",
        "হবে", "আছে", "করবেন", "করব", "পারবেন", "পারবে"
    )
    tokens = text.split()
    is_question = any(token.rstrip(",") in question_words for token in tokens)
    return text + ("?" if is_question else "।")

_COMMON_CONTEXT_FIXES = {
    "কোরআন গবেষনা": "কোরআন গবেষণা",
    "গবেষনা": "গবেষণা",
}

def correct_contextual_grammar(raw_text: str) -> str:
    """Apply only explicitly high-confidence, meaning-preserving fixes."""
    text = _clean_spaces(raw_text)
    for wrong, right in _COMMON_CONTEXT_FIXES.items():
        text = re.sub(rf"(?<!\S){re.escape(wrong)}(?!\S)", right, text)
    return text

def sanitize_phonetic_speech(
    audio_stream: Union[str, bytes],
    transcriber: Optional[Callable[[bytes], str]] = None,
) -> str:
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
    return VoiceResult(
        raw_text=raw_text,
        normalized_text=text,
        confidence=0.98 if text != original else 1.0,
        changed=text != original,
    )
