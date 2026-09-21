# Mode Icon Usage Registry — Normal Reading Mode v1

**Mode ID:** `quran-normal`

**Asset root:** `assets/icon-engine/modes/normal-v1/`

**Purpose:** সাধারণ কোরআন পড়ার সময় Reader-এর semantic/navigation icon family হিসেবে ব্যবহার করা।

## Runtime rule
Reader-এর current mode যদি `quran-normal` হয়, এই family থেকে icon resolve হবে। Mode যদি `sufi` হয়, resolver এই folder ব্যবহার করবে না; Sufi-specific family resolve করবে।

## Fallback rule
কোনো mode-specific SVG missing হলে canonical icon engine-এর nearest semantic fallback ব্যবহার করা যেতে পারে, কিন্তু এক mode-এর asset অন্য mode-এর নামে copy করা যাবে না।

## Approval rule
এই asset family তৈরি ও সংরক্ষণ সম্পন্ন। Live integration আলাদা acceptance step। Integration-এর আগে isolated visual review আবশ্যক।

## Reference
Visual reference: `docs/design/MODE_ICON_DESIGN_REFERENCE_2026-09-21.md`
