# Project Folder Master Index — v1.1

## Purpose
এই নথি পুরো repository-র folder-by-folder organization-এর কেন্দ্রীয় সূচি। এটি `MASTER_INSTRUCTION.md` ও `PROJECT_STATE.md`-এর অধীন।

## Root authority
- `MASTER_INSTRUCTION.md` — সর্বোচ্চ operational governance
- `PROJECT_STATE.md` — বর্তমান প্রকল্প-অবস্থা
- `MASTER_PROJECT.md` — স্থায়ী architecture ও উদ্দেশ্য
- `INSTRUCTION_REGISTRY.md` — instruction coverage
- `PROJECT_WORK_LOG.md` — কাজের ইতিহাস

## Folder organization rule
প্রতিটি governed folder-এর জন্য প্রয়োজন অনুযায়ী একটি স্থানীয় `MASTER/` directory থাকবে। সেখানে থাকবে:
1. Folder identity/purpose
2. File inventory
3. Dependency map
4. Local rules
5. Verification status
6. Change history

`MASTER/` নিজে আবার `MASTER/MASTER/` তৈরি করবে না।

## Existing top-level folders
- `.github/` — local Master established
- `assets/` — local Master established
- `backend/` — local Master established
- `data/` — local Master established
- `database/` — local Master established
- `docs/` — local Master established
- `exports/` — local Master established
- `migrations/` — local Master established
- `scripts/` — local Master established
- `validation/` — local Master established

## Known nested governed folders
- `.github/workflows/` — local Master established
- `data/research-records/` — local Master established
- `data/dictionary/` — Dictionary-first Master established

## Dictionary-first organization
The research-data architecture is now explicitly organized around:
`আরবি শব্দ → Lemma → Root → শব্দরূপ/মরফোলজি → ব্যাকরণ → অর্থের পরিসর → কুরআনে ব্যবহার → আয়াত → প্রসঙ্গ → প্রমাণ → গবেষণা/বিশ্লেষণ → সংস্করণ ইতিহাস`.

The dictionary layer is defined at `data/dictionary/MASTER/`. Existing research files remain in place; no destructive migration has been performed.

## Protected rule
কেবল organization করার জন্য existing code/data/website/backend path সরানো, rename বা delete করা যাবে না। প্রথমে inventory ও dependency verification হবে।

## Completion gate
Folder organization সম্পূর্ণ বলা যাবে কেবল যখন প্রতিটি governed folder-এর:
- local Master আছে;
- file inventory আছে;
- applicable instructions mapped আছে;
- dependencies checked আছে;
- verification record আছে;
- Registry/State update করা হয়েছে।

## Current status
`STRUCTURE ESTABLISHED — local Masters and dictionary-first architecture are established on safety branch test/write-access-2026-09-13. Full dependency/inventory verification and controlled promotion remain separate gates.`
