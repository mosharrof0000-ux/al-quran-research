# Project Folder Master Index — v1.2

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

## Central file inventory and audit
- `MASTER/REPOSITORY_FILE_INVENTORY_2026-09-13.md` — repository-wide file/path inventory and role classification
- `MASTER/REPOSITORY_AUDIT_2026-09-13.md` — final documentation/organization audit
- Their colocated `.instruction.md` files define maintenance rules.

## Dictionary-first organization
The research-data architecture is explicitly organized around:
`আরবি শব্দ → Lemma → Root → শব্দরূপ/মরফোলজি → ব্যাকরণ → অর্থের পরিসর → কুরআনে ব্যবহার → আয়াত → প্রসঙ্গ → প্রমাণ → গবেষণা/বিশ্লেষণ → সংস্করণ ইতিহাস`.

The dictionary layer is defined at `data/dictionary/MASTER/`. Existing research files remain in place; no destructive migration has been performed.

## Protected rule
কেবল organization করার জন্য existing code/data/website/backend path সরানো, rename বা delete করা যাবে না। প্রথমে inventory ও dependency verification হবে।

## Completion gate
Repository organization/documentation is complete when the recursive tree is inventoried, governed folders have local Masters, applicable instructions are mapped, dependency-sensitive paths are preserved, verification is recorded, and continuity records identify the current safe branch.

## Current status
`DOCUMENTATION / ORGANIZATION COMPLETE — repository-wide inventory and final audit completed on safety branch test/write-access-2026-09-13. No known remaining task exists in this documentation phase. Production promotion and future product/research development remain separate gates.`
