from voice_engine import (
    apply_smart_punctuation,
    correct_contextual_grammar,
    process_transcript,
    sanitize_phonetic_speech,
)


def test_sanitize_preserves_words_and_normalizes_spaces():
    assert sanitize_phonetic_speech("  আমি   বাংলা\u00a0বলছি  ") == "আমি বাংলা বলছি"


def test_punctuation_is_conservative():
    assert apply_smart_punctuation("আপনি কেমন আছেন") == "আপনি কেমন আছেন।"
    assert apply_smart_punctuation("আপনি কেমন আছেন?") == "আপনি কেমন আছেন?"


def test_corrections_are_explicit_and_auditable():
    text, corrections = correct_contextual_grammar(
        "আমি কোরান গবেষণা করি",
        corrections={"কোরান": "কুরআন"},
    )
    assert text == "আমি কুরআন গবেষণা করি"
    assert corrections == (("কোরান", "কুরআন"),)


def test_pipeline_preserves_raw_transcript():
    result = process_transcript(
        "  আমি   কোরান গবেষণা করি  ",
        corrections={"কোরান": "কুরআন"},
    )
    assert result.raw_text == "  আমি   কোরান গবেষণা করি  "
    assert result.normalized_text == "আমি কুরআন গবেষণা করি।"
    assert result.corrections == (("কোরান", "কুরআন"),)
