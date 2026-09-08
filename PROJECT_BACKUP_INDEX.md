# PROJECT BACKUP INDEX — Restore ও Backup Reference

## ব্যবহারবিধি
কোনো গুরুত্বপূর্ণ পরিবর্তনের আগে বর্তমান ভালো অবস্থার file/branch/commit/restore point এখানে নথিভুক্ত করতে হবে। পরিবর্তনের পরে নতুন verified ভালো অবস্থাও এখানে যোগ করতে হবে।

GitHub history একমাত্র backup নয়; গুরুত্বপূর্ণ release/restore point-এর জন্য প্রয়োজনে আলাদা export/off-site backup রাখা উচিত।

---

## BACKUP-2026-09-05-01

**Date:** 2026-09-05

**Purpose:** surgical connection-এর আগের নিরাপদ restore point

**Reference file:** `BACKUP-POINT-2026-09-05.md`

**Protected notes:**
- `chat.html` standalone chat page
- মূল `index.html` surgical connection-এর আগের অবস্থায়
- full `index.html` replacement করা যাবে না
- পরবর্তী connection-এর আগে current `index.html` SHA যাচাই করতে হবে

**Restore source:** Git history-এর পূর্বের known-good commit/restore point

---

## BACKUP-2026-09-07-CONTINUITY-BASELINE

**Date:** 2026-09-07

**Purpose:** স্থায়ী continuity protocol চালুর baseline

**Reference commits:**
- `32b900a1512f0a1ea9d9c6855e6e563c48082962` — continuity protocol
- `0ca7c4cbf8a56785eef0a3dd35b5f7ced6d63f3f` — initial work log

**Protected meaning:**
এই baseline-এর পরে গুরুত্বপূর্ণ কাজের আগে/পরে project history, backup reference এবং verification record `PROJECT_WORK_LOG.md` ও এই index-এ যোগ করতে হবে।

**Status:** VERIFIED DOCUMENTATION BASELINE

---

## BACKUP-2026-09-08-CHAT-FULLSCREEN-PRECHANGE

**Date:** 2026-09-08

**Purpose:** Full-screen adaptive reading chat পরিবর্তনের ঠিক আগের নিরাপদ restore point

**Restore branch:** `backup/fullscreen-chat-before-2026-09-08`

**Restore commit:** `99cbbcf63513287a89c055f4fc0ac503960cfad1`

**Protected file:** `chat.html` — পরিবর্তনের আগের অবস্থার SHA `6c9d94cd7cdb7acc0559a3d515ec6328592f37a2`

**Status:** VERIFIED PRE-CHANGE BACKUP

---

## SAFE-POINT-2026-09-08-CHAT-FULLSCREEN-READING-V1

**Date:** 2026-09-08

**Purpose:** Full-screen chat ও adaptive reading interface সফল পরিবর্তনের restore point

**Main commit:** `139ad87a4ce67bc29a37b5d588dbbe32493f16e2`

**Protected file:** `chat.html`

**New file SHA:** `35ccdd643d43caed98c53c23d1947a91b1e4f33b`

**Restore branch:** `safe/chat-fullscreen-reading-v1-2026-09-08`

**Implemented:**
- Chat পুরো viewport/full-screen করা হয়েছে
- মোবাইল safe-area সমর্থন
- ধীর, মসৃণ dynamic background color flow
- reading/speech চলার সময় visual reading state
- light/dark background অনুযায়ী পাঠযোগ্যতার জন্য contrasting text treatment
- reduced-motion preference সমর্থন
- বিদ্যমান Worker API URL ও chat modes রাখা হয়েছে
- বাংলা voice input ও speech output রাখা হয়েছে

**Verification:**
- GitHub file update accepted
- নতুন file SHA যাচাইযোগ্য
- pre-change backup branch অক্ষুণ্ণ
- কোনো research dataset/backend file পরিবর্তন করা হয়নি

**Status:** VERIFIED SAFE POINT — LIVE BROWSER TEST STILL RECOMMENDED
