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
