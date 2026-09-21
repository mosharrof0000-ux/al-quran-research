# PROJECT WORK LOG — স্থায়ী কাজের ইতিহাস

> নতুন AI/account/session-এর জন্য: কাজ শুরু করার আগে `PROJECT_CONTINUITY_PROTOCOL.md`, `PROJECT_STATE.md` এবং এই ফাইলের সর্বশেষ entry পড়ুন। তারপর সংশ্লিষ্ট file/branch সরাসরি পরীক্ষা করুন। অনুমান করবেন না।

---

## WORK-2026-09-07-CONTINUITY-01

**Status:** VERIFIED — continuity system established

### User decision
ব্যবহারকারী বিভিন্ন free AI/account/session ব্যবহার করেন। তাই প্রতিবার শুরু থেকে পুরো প্রকল্প বোঝাতে না হয়—এমন স্থায়ী project continuity, backup এবং handoff ব্যবস্থা repository-তে রাখতে বলেছেন।

### Objective
গুরুত্বপূর্ণ কথোপকথন-সিদ্ধান্ত, কাজ, পরিবর্তন, যাচাই, backup এবং পরবর্তী কাজ এমনভাবে সংরক্ষণ করা যাতে ভবিষ্যতের AI নতুন account থেকেও repository দেখে কাজের ধারাবাহিকতা বুঝতে পারে।

### Project facts inspected
- `MASTER_PROJECT.md`
- `PROJECT_STATE.md`
- `BACKUP-POINT-2026-09-05.md`
- বর্তমান repository-এর existing project-state information

### Existing protection found
- GitHub restore point-এর ধারণা আগে থেকেই আছে।
- গুরুত্বপূর্ণ গবেষণা-ইতিহাস ও audit trail সংরক্ষণের নীতি আছে।
- Locked/master page সরাসরি edit না করার নীতি আছে।

### Changes made
নতুন স্থায়ী নথি তৈরি:
- `PROJECT_CONTINUITY_PROTOCOL.md`
- `PROJECT_WORK_LOG.md`
- ভবিষ্যতে backup reference রাখার জন্য `PROJECT_BACKUP_INDEX.md`

### Important rule recorded
কাজের আগে:
Inspect → Understand → Read current log → Identify backup → Confirm instruction → Work on safe copy when needed.

কাজের পরে:
Verify → Record result → Record backup/restore reference → Update current state when materially changed → Report.

### Current design work remembered for next steps
ব্যবহারকারীর অনুমোদিত design direction:
1. AI chatbox-কে full-screen research workspace করার চিন্তা।
2. Quran/reading environment-এ ধীর ambient multi-colour transition পরীক্ষা করা।
3. Background light হলে text ধীরে deep/dark হবে; background deep হলে text light হবে—readability/contrast সবসময় priority।
4. Colour transition শান্ত, ধীর এবং মর্যাদাপূর্ণ হবে; readability-এর জন্য unsafe contrast অনুমোদিত নয়।

### Robot experiment status
আগের পরীক্ষায় একটি robot copy করে দুইটি করার কাজ হয়েছিল, কিন্তু verification-এ দেখা গেছে working copy-তে দুইটির initial position আলাদা করা হয়নি এবং mobile-এ small robot 40%-এর বদলে 36% ছিল। এটিকে completed বলে ধরা যাবে না যতক্ষণ না পুনরায় ঠিক করে verify করা হয়।

### Verification
এই log entry repository continuity rule-এর সঙ্গে মিলিয়ে তৈরি। কোনো existing locked page পরিবর্তন করা হয়নি।

### Next step
পরবর্তী actual interface change-এর আগে সংশ্লিষ্ট বর্তমান file/branch পুনরায় inspect করতে হবে, backup reference নিতে হবে, তারপর user-approved change করতে হবে।

---

## WORK-2026-09-11-LIVE-ENTRYPOINT-CONSOLIDATION-01

**Status:** VERIFIED — canonical automation consolidation completed

### User decision
ব্যবহারকারী live-entrypoint automation-এর controlled consolidation অনুমোদন করেছেন।

### Objective
একাধিক GitHub Actions workflow যেন একই protected `index.html`-এ আলাদা আলাদাভাবে write না করে—তার জন্য একটি canonical automatic writer প্রতিষ্ঠা করা।

### Safe point
- `backup/pre-live-entrypoint-consolidation-2026-09-11`
- Pre-change commit: `35249656450757813964b2fd83287edf0551ee49`

### Changes made
Created:
- `.github/workflows/live-entrypoint-sync.yml`

Converted to preserved manual/read-only legacy workflows:
- `.github/workflows/connect-tafsir-library.yml`
- `.github/workflows/connect-tafsir-library-now.yml`
- `.github/workflows/set-site-favicon.yml`
- `.github/workflows/install-chat-system.yml`

Updated governance records:
- `docs/INSTRUCTION_AUDIT_AUTOMATION_2026-09-11.md`
- `docs/instructions/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md`
- `PROJECT_BACKUP_INDEX.md`

### Canonical behavior
The new canonical workflow handles:
- Tafsir Library button integration
- favicon synchronization
- chat-system script-tag normalization

It uses concurrency control and verifies target content before committing.

### Preservation decision
No workflow file was deleted, renamed, or moved. Existing backend deployment, research-record approval, backup, smoke-test, and link-integrity workflows were not changed.

### Verification
- Canonical workflow fetched after creation: SHA `3259b5ca515b996b4b9ceb5ef5b4d644f1e88414`.
- All four former live-entrypoint writers were fetched after modification and confirmed as manual/read-only legacy workflows.
- Pre-change backup branch was created and recorded.
- Existing `index.html` was inspected before consolidation.

### Result
There is now one canonical automatic live-entrypoint writer. Existing legacy workflow paths remain available for historical traceability without automatic repository-write behavior.

---

## WORK-2026-09-11-STABLE-CHECKPOINT-01

**Status:** VERIFIED — stable checkpoint established

### Checkpoint
- Main baseline: `cf6a49812e14ab7a04d0aafb2ce9a7dc6bde4c3a`
- Governance control set promoted to `main`.
- GitHub Actions deployment: successful.
- GitHub Pages deployment check: successful.
- Smoke test: successful.
- Cloudflare production build: successful.
- Cloudflare production version: `32ed44fe-c7ad-4802-ae54-539b9ee6b2f2`.
- User manually opened the live site and confirmed connection and chat responses are working.

### Scope
This checkpoint records a known-good operational state. It does not claim that all future research features are complete.

### Protected meaning
No locked page, research dataset, or production architecture was intentionally changed for this checkpoint. Documentation/state records are being synchronized so a future AI/session can resume from a verified baseline without relying on chat memory.

### Next step
Resume future work from this checkpoint. Any new material change must follow the Master Instruction, Universal AI Governance Gate, relevant individual instruction, backup/safe-point procedure, verification, and state/log update rules.


## WORK-2026-09-18-MINIMAL-CHAT-UI-01

**Status:** IMPLEMENTED ON SAFETY BRANCH — awaiting production verification

### User decision
ব্যবহারকারী বর্তমান ব্যস্ত/বড় Home UI সরিয়ে একদম simple, ChatGPT-style chat interface চান। মূল দৃশ্যমান কাঠামো: উপরে sidebar/menu access এবং নিচে প্রশ্ন লেখার composer; অপ্রয়োজনীয় UI থাকবে না।

### Safety point
- Backup branch: `backup/before-minimal-chat-ui-2026-09-18`
- Working branch: `work/minimal-chat-ui-2026-09-18`

### Changes
Updated only:
- `ui/home-v1/home-v1.html`
- `ui/home-v1/home-v1.css`
- `ui/home-v1/home-v1.js`
- `CHATBOX-DESIGN-2026-09-08.instruction.md`

### Preserved behavior
- Existing question submission route to `dynamic-reader.html`
- Bengali voice input
- Sidebar research options
- Search focuses the question box
- Existing project/backend paths were not intentionally changed

### Verification status
Safety-branch file updates completed. Production Live Page verification remains the acceptance check after promotion/deployment.

### Rollback
If the live result is broken or rejected, restore the previous known-good state using the backup branch before another design iteration.


## WORK-2026-09-21-PROJECT-AGENT-STRENGTHENING-01

**Agent Identity:** শাহীন
**Agent ID:** agent-শাহীন-system-001
**Task ID:** TASK-202609212145-agent
**Status:** IMPLEMENTED ON SAFETY BRANCH — validation pending
**Branch:** agent/shahin-ai-strengthening-001

### Objective
Project Agent-কে আরও শক্তিশালী করা, যাতে প্রতিটি কাজের জন্য Bengali human-like identity, Task/Session metadata, governance-first bootstrap এবং নিরাপদ isolated execution বজায় থাকে।

### Verified findings before change
- MASTER_INSTRUCTION.md, AI_ENTRY_PROTOCOL.md, INSTRUCTION_REGISTRY.md, PROJECT_STATE.md, PROJECT_WORK_LOG.md inspected.
- Existing isolated Project Agent branch/work found.
- Project Agent Worker-এ JavaScript syntax corruption পাওয়া যায়: decoded-content লাইনে literal backslash-n ছিল।
- Identity/work-ledger/handoff documents ছিল, কিন্তু তাদের colocated instructions ছিল না।

### Changes
- Fixed Project Agent Worker decoding syntax.
- Added work-type-based Bengali Agent Name selection.
- Added Task ID, Session ID, Agent ID and work-type metadata generation.
- Strengthened governance-first system instruction.
- Added mandatory incomplete-task handoff language.
- Added colocated instruction files for the Agent Identity, Work Ledger, Handoff Protocol, Worker, Wrangler config, workflow and engine documentation.
- Registered the new governance instructions in INSTRUCTION_REGISTRY.md.

### Safety
- Production main was not changed.
- Project Agent remains isolated to agent/* writes.
- Merge/deploy capability remains disabled inside the Worker.

### Remaining verification
- Run Worker syntax/runtime check.
- Validate isolated health endpoint.
- Validate authenticated tool call.
- Validate branch-only write and protected-path rejection.
- Validate identity metadata in actual Agent response.
- Only after successful verification consider PR/review and later explicit promotion.
