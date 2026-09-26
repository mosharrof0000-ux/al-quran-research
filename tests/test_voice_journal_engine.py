from src.core.voice_journal_engine import (
    VoiceContext,
    apply_smart_punctuation,
    correct_contextual_grammar,
    process_voice_text,
    sanitize_phonetic_speech,
)


def test_smart_punctuation_question():
    assert apply_smart_punctuation("তুমি কোথায়") == "তুমি কোথায়?"


def test_smart_punctuation_statement():
    assert apply_smart_punctuation("আজ আমরা গবেষণা করব") == "আজ আমরা গবেষণা করব।"


def test_glossary_contextual_correction():
    text, corrections = correct_contextual_grammar(
        "মোশাররফ এআই",
        VoiceContext(glossary={"মশাররফ": "মোশাররফ"}),
    )
    assert text == "মোশাররফ এআই"
    assert corrections == (("মশাররফ", "মোশাররফ"),)


def test_pipeline_preserves_raw_text():
    result = process_voice_text("আজ আমরা গবেষণা করব")
    assert result.raw_text == "আজ আমরা গবেষণা করব"
    assert result.text == "আজ আমরা গবেষণা করব।"


def test_sanitize_accepts_external_asr_transcript():
    result = sanitize_phonetic_speech(
        b"audio-placeholder",
        transcript="তুমি কোথায়",
    )
    assert result.text == "তুমি কোথায়?"
