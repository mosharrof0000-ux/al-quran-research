from src.core.voice_engine import *

def test_punctuation():
    assert apply_smart_punctuation("আমি আজ গবেষণা করব") == "আমি আজ গবেষণা করব।"

def test_question_preserved():
    assert apply_smart_punctuation("তুমি কি আসবে?") == "তুমি কি আসবে?"

def test_sanitize():
    assert sanitize_phonetic_speech("আমি\u200c গবেষণা করি") == "আমি গবেষণা করি"

def test_low_confidence_is_preserved():
    text, log = correct_contextual_grammar("আমি কুরআন গবেষণা করি", {"কুরআন":"কোরআন"}, confidence_fn=lambda *_: 0.6)
    assert text == "আমি কুরআন গবেষণা করি" and log == ()

def test_high_confidence_logged():
    text, log = correct_contextual_grammar("আমি কোরান গবেষণা করি", {"কোরান":"কুরআন"})
    assert text == "আমি কুরআন গবেষণা করি" and len(log) == 1

def test_pipeline():
    result = process_voice("আমি কোরান গবেষণা করি", corrections={"কোরান":"কুরআন"})
    assert result.final_text == "আমি কুরআন গবেষণা করি।"