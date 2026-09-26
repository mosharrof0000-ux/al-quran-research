import unittest
from src.core.voice_engine import apply_smart_punctuation, correct_contextual_grammar, process_transcript, sanitize_phonetic_speech

class SmartVoiceEngineTests(unittest.TestCase):
    def test_question_punctuation(self):
        self.assertEqual(apply_smart_punctuation("কীভাবে গবেষণা করবেন"), "কীভাবে গবেষণা করবেন?")
        self.assertEqual(apply_smart_punctuation("আপনি কি ঠিক আছেন"), "আপনি কি ঠিক আছেন?")

    def test_statement_punctuation(self):
        self.assertEqual(apply_smart_punctuation("আমি আজ গবেষণা করব"), "আমি আজ গবেষণা করব।")

    def test_conservative_correction(self):
        self.assertEqual(correct_contextual_grammar("কোরআন গবেষনা"), "কোরআন গবেষণা")
        self.assertEqual(correct_contextual_grammar("প্রজেক্টের কথা বলুন"), "প্রজেক্টের কথা বলুন")

    def test_raw_text_is_retained(self):
        r = process_transcript("কোরআন গবেষনা")
        self.assertEqual(r.raw_text, "কোরআন গবেষনা")
        self.assertEqual(r.normalized_text, "কোরআন গবেষণা।")

    def test_audio_requires_asr_adapter(self):
        with self.assertRaises(ValueError):
            sanitize_phonetic_speech(b"audio")

if __name__ == "__main__":
    unittest.main()
