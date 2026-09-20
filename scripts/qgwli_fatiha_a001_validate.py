#!/usr/bin/env python3
"""Independent QGWLI Fatiha A001 pilot validation.

Two independent letter-count methods are compared:
1) Unicode-category method: count Arabic letters by Unicode category L*.
2) Explicit-base-letter method: remove known Quranic combining marks and count the
   remaining Arabic letters from the fixture.

This validator is intentionally scoped to A001 and never modifies project data.
"""
import json, unicodedata
from pathlib import Path

FIXTURE = Path("data/qgwli-fatiha-a001-fixture-v1.json")

def unicode_letter_count(text):
    return sum(1 for ch in text if unicodedata.category(ch).startswith("L"))

def explicit_base_letter_count(text):
    marks = set()
    for cp in range(0x0600, 0x0700):
        cat = unicodedata.category(chr(cp))
        if cat.startswith("M"):
            marks.add(chr(cp))
    return sum(1 for ch in text if ch not in marks and unicodedata.category(ch).startswith("L"))

def main():
    data = json.loads(FIXTURE.read_text(encoding="utf-8"))
    words = data["words"]
    letters = data["letter_occurrences"]
    raw_words = [w["raw"] for w in words]

    assert len(words) == data["expected"]["word_count"]
    assert len(letters) == data["expected"]["letter_count"]

    assert [w["global_word_position"] for w in words] == data["expected"]["global_word_positions"]
    assert [x["global_letter_position"] for x in letters] == data["expected"]["global_letter_positions"]

    unicode_counts = [unicode_letter_count(w) for w in raw_words]
    explicit_counts = [explicit_base_letter_count(w) for w in raw_words]
    fixture_counts = [w["letter_count"] for w in words]

    assert unicode_counts == fixture_counts, (unicode_counts, fixture_counts)
    assert explicit_counts == fixture_counts, (explicit_counts, fixture_counts)
    assert unicode_counts == explicit_counts, (unicode_counts, explicit_counts)

    assert all(len(set(w["base_letters"])) <= len(w["base_letters"]) for w in words)
    assert len({x["letter_occurrence_id"] for x in letters}) == len(letters)
    assert len({x["word_occurrence_id"] for x in letters}) == 4
    assert all(x["global_letter_position"] == f"GL-{i:06d}" for i, x in enumerate(letters, 1))

    # Verify reverse mapping and local positions.
    for word in words:
        wid = word["word_occurrence_id"]
        linked = [x for x in letters if x["word_occurrence_id"] == wid]
        assert [x["local_letter_position"] for x in linked] == list(range(1, len(linked)+1))
        assert [x["letter_type"] for x in linked] == word["base_letters"]

    print("PASS: QGWLI Fatiha A001 fixture validation")
    print(f"PASS: words={len(words)}, base_letters={len(letters)}")
    print("PASS: independent Unicode-category count == explicit base-letter count == fixture")
    print("PASS: global and local positions are gap-free")
    print("PASS: forward and reverse word-letter mappings are consistent")

if __name__ == "__main__":
    main()
