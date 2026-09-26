"""Context-Aware Smart Voice Engine v1.

Conservative Bengali transcript post-processing for Mosharrof.
The module is provider-agnostic: ASR is supplied by an adapter/callback.
"""

from __future__ import annotations

from dataclasses import dataclass
import re
from typing import Any, Callable, Optional


@dataclass(frozen=True)
class VoiceResult:
    raw_text: str
    normalized_text: str
    punctuated_text: str
    corrections: tuple[tuple[str, str], ...] = ()


_COMMON_BN_CORRECTIONS = {
    "কেননা": "কারণ",
    "কিরকম": "কী রকম",
    "কিভাবে": "কীভাবে",
}


def _clean_spaces(text: str) -> str:
    return re.sub(r"[ \t]+", " ", text.replace("\u00a0", " ")).strip()


def correct_contextual_grammar(raw_text: str) -> tuple[str, tuple[tuple[str, str], ...]]:
    """Apply only conservative, meaning-preserving corrections.

    Unknown/low-confidence speech is left unchanged. Raw text is never discarded.
    """
    text = _clean_spaces(raw_text)
    corrections: list[tuple[str, str]] = []
    for old, new in _COMMON_BN_CORRECTIONS.items():
        pattern = rf"(?<!\S){re.escape(old)}(?!\S)"
        if re.search(pattern, text):
            text = re.sub(pattern, new, text)
            corrections.append((old, new))
    return text, tuple(corrections)


def apply_smart_punctuation(raw_text: str) -> str:
    """Add conservative Bengali punctuation without changing words.

    This is transcript post-processing; true pause/intonation signals can be
    supplied later by an ASR adapter. A trailing question marker is inferred
    only from explicit Bengali interrogative forms.
    """
    text = _clean_spaces(raw_text)
    if not text:
        return text

    text = re.sub(r"\s*([,!?।])\s*", r"\1 ", text).strip()
    if re.search(r"(কি|কী|কেন|কেনো|কীভাবে|কিভাবে|কোথায়|কোথায়|কখন|কে|কাকে|কোন|কোনটা|কত|কতটা)\s*$", text):
        return text.rstrip("।,!?") + "?"
    if not re.search(r"[।!?]$", text):
        return text.rstrip(",") + "।"
    return text


def sanitize_phonetic_speech(
    audio_stream: Any,
    transcriber: Optional[Callable[[Any], str]] = None,
) -> str:
    """Convert audio through an explicit ASR adapter, then normalize text.

    No audio decoding is attempted internally. This prevents the engine from
    pretending that arbitrary bytes are understood when no ASR provider exists.
    """
    if transcriber is None:
        raise ValueError("A Bengali ASR transcriber callback is required for audio input.")
    transcript = transcriber(audio_stream)
    if not isinstance(transcript, str):
        raise TypeError("The ASR adapter must return a string transcript.")
    corrected, _ = correct_contextual_grammar(transcript)
    return _clean_spaces(corrected)


def process_transcript(raw_text: str) -> VoiceResult:
    """Run the safe text pipeline: normalize -> conservative correction -> punctuation."""
    if not isinstance(raw_text, str):
        raise TypeError("raw_text must be a string")
    corrected, corrections = correct_contextual_grammar(raw_text)
    punctuated = apply_smart_punctuation(corrected)
    return VoiceResult(
        raw_text=raw_text,
        normalized_text=corrected,
        punctuated_text=punctuated,
        corrections=corrections,
    )
