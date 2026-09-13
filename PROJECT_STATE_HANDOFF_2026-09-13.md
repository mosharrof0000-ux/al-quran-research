# Project State Handoff — 2026-09-13

## কেন এই নথি
নতুন ChatGPT ID/AI/session যেন আগের কথোপকথনের উপর নির্ভর না করে repository থেকেই বর্তমান কাজ বুঝতে পারে। এটি `PROJECT_STATE.md`-এর replacement নয়; এটি এই তারিখের continuity addendum।

## Verified connection state
- Repository: `mosharrof0000-ux/al-quran-research`
- GitHub write access: VERIFIED
- Safety branch: `test/write-access-2026-09-13`
- `main` সরাসরি পরিবর্তন করা হয়নি এই কাজের মাধ্যমে।

## সর্বশেষ user instruction
প্রকল্পকে folder-by-folder সংগঠিত করতে হবে। প্রতিটি governed folder-এর জন্য local Master structure থাকতে হবে, এবং পুরো প্রকল্পের জন্য একটি central Master থাকতে হবে। কোনো file হারানো যাবে না।

## Governing documents
1. `MASTER_INSTRUCTION.md`
2. `PROJECT_STATE.md`
3. `MASTER_PROJECT.md`
4. `AI_ENTRY_PROTOCOL.md`
5. `INSTRUCTION_REGISTRY.md`
6. `INSTRUCTION_AUDIT_PROTOCOL.md`
7. `MASTER/PROJECT_FOLDER_MASTER_INDEX.md`

## What was completed in this safety branch
- `MASTER_INSTRUCTION.md` v1.7: নতুন AI/ID portability rule যোগ করা হয়েছে।
- Folder Master Governance rule যোগ করা হয়েছে।
- `MASTER/PROJECT_FOLDER_MASTER_INDEX.md` তৈরি হয়েছে।
- তার sibling instruction তৈরি হয়েছে।

## What remains
- প্রতিটি existing governed folder ও nested folder inventory করতে হবে।
- প্রতিটি প্রয়োজনীয় folder-এর local `MASTER/` তৈরি করতে হবে।
- প্রতিটি local Master-এ file inventory, dependency map, instruction map, verification status রাখতে হবে।
- Registry/Project State/Work Log-এ organization completion record করতে হবে।
- সবকিছু verify করে তারপর explicit approval অনুযায়ী `main`-এ promotion করতে হবে।

## Critical safety rule
Organization-এর নামে existing website, backend, database, research data, public URL, stable ID বা automation path সরানো/rename/delete করা যাবে না। প্রথমে map → dependency check → Master → verification হবে।

## New AI instruction
নতুন AI প্রথমে repository থেকে `MASTER_INSTRUCTION.md` এবং `PROJECT_STATE.md` পড়বে। তারপর এই handoff ও `MASTER/PROJECT_FOLDER_MASTER_INDEX.md` দেখে সর্বশেষ কাজের অবস্থা বুঝবে। Chat memory-কে authoritative source হিসেবে ব্যবহার করবে না।

## Status
`ACTIVE HANDOFF — 2026-09-13`
