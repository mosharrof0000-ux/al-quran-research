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


## WORK-2026-09-21-GEMINI-CUSTOM-ICON-INTEGRATION-01

**Status:** IMPLEMENTED ON MAIN — documentation recorded; live visual verification pending

### User decision
ব্যবহারকারী চেয়েছেন Gemini AI যেন আল-কুরআন Research Project-এর নিজস্ব custom icon system ব্যবহার করে আয়াত/গবেষণা-উত্তর উপস্থাপন করতে পারে।

### Safety point
- Pre-documentation backup branch: `backup/pre-gemini-custom-icon-documentation-2026-09-21`
- Pre-documentation main commit: `386b2b417b32d64526b9974b23fd738b688e0364`

### Changes made
PR #66-এর মাধ্যমে main-এ সংযুক্ত:
- `assets/icon-engine/aqr-icon-engine.js`
- `ui/home-v1/home-v1.html`
- `ui/home-v1/home-v1.js`
- `ui/home-v1/gemini-icon-v1.css`

### Integration behavior
Gemini-কে controlled icon marker ব্যবহারের নির্দেশ দেওয়া হয়েছে:
`[[AQR_ICON:quran]]`, `ayah`, `research`, `analysis`, `translation`, `tafsir`, `document`, `info`, `verified` ইত্যাদি।
Frontend marker-টি দৃশ্যমান উত্তরের বাইরে সরিয়ে project icon engine-এর SVG icon হিসেবে render করে।

### Important technical note
এটি বর্তমানে Gemini function-calling নয়; prompt-controlled marker → frontend renderer পদ্ধতি।
একটি AI response-এ semantic icon নির্বাচন ও প্রদর্শনের integration করা হয়েছে।

### Corrections after merge
Merge-এর পরে `home-v1.html`-এ literal \\n সমস্যা ধরা পড়ে এবং দুই দফায় ঠিক করা হয়েছে:
- `df4d58e331a2bf8449a1ca47b6f3d30360c24a36`
- `386b2b417b32d64526b9974b23fd738b688e0364`

### Verification
- Main source files inspected after fixes.
- Current main commit: `386b2b417b32d64526b9974b23fd738b688e0364`.
- Live browser rendering/AI marker appearance এখনও প্রত্যক্ষভাবে verified নয়।
- তাই এই entry live feature fully verified বলে দাবি করছে না।

### Preservation / follow-up
Master custom icon engine-এর exact source এবং বর্তমান compact integration implementation আলাদা করে audit করতে হবে; project-এর মূল icon asset overwrite না করে canonical engine source সংরক্ষণ করা প্রয়োজন।


## WORK-2026-09-21-MODE-ICON-DESIGN-REFERENCE-01

Status: REFERENCE RECORDED — NO LIVE UI CHANGE

A generated icon-sheet image has been recorded as the visual reference for the future mode-aware icon system. General Qur'an reading mode will use the referenced minimalist Islamic icon family. A separate Sufi mode will have a separately designed icon family; it will not overwrite the general family. Future integration must follow Backup → Design → Review → Approve → Integrate → Verify → Live.

Reference record: `docs/design/MODE_ICON_DESIGN_REFERENCE_2026-09-21.md`
Reference SHA-256: `170c83ecf42c84ca4c09686fccb32311c2272fe2d15dd4eb4b9be6ebce14c4d1`


## WORK-2026-09-21-MODE-ICON-ASSET-SET-01

**Status:** ASSETS CREATED AND STORED — NOT YET INTEGRATED INTO LIVE UI

### User decision
ব্যবহারকারী চেয়েছেন সাধারণ কোরআন পড়ার জন্য reference image অনুযায়ী ১০টি minimalist Islamic/Qur'anic icon এখনই তৈরি করে project-এ সংরক্ষণ করতে এবং এগুলোর mode-based ব্যবহারের নিয়ম নথিভুক্ত করতে। ভবিষ্যতে Sufi mode-এর জন্য সম্পূর্ণ আলাদা icon family থাকবে।

### Safety
- Backup branch: `backup/pre-mode-icon-assets-2026-09-21`
- Working branch: `feat/mode-icon-assets-2026-09-21`
- No database/backend/live UI change was made by this asset work.

### Stored assets
`assets/icons/modes/general-quran-v1/` contains 10 SVG icons plus `manifest.json` and `README.md`.

### Runtime usage rule
`readingMode === "general-quran"` selects this family. `readingMode === "sufi"` must select a separate Sufi family and must not overwrite or reuse the general family as its design source.

### Integration gate
Backup → Review → Approve → Integrate → Verify → Live.


## WORK-2026-09-21-NORMAL-QURAN-MODE-ICON-ASSET-VERIFICATION-01

**Status:** VERIFIED AND STORED — NOT LIVE-INTEGRATED

### User decision
ব্যবহারকারী reference image অনুযায়ী সাধারণ কোরআন পড়ার জন্য ১০টি minimalist Islamic/Qur'anic icon project-এ স্থায়ীভাবে সংরক্ষণ এবং ব্যবহারবিধি নথিভুক্ত করতে বলেছেন। ভবিষ্যতের Sufi mode-এর জন্য সম্পূর্ণ আলাদা icon family থাকবে।

### Verified assets
`assets/icons/modes/general-quran-v1/`-এ ১০টি SVG যাচাই করা হয়েছে: quran, surah, ayah, tafseer, bookmark, audio, home, search, favorite, share। প্রতিটি SVG-তে `fill="none"` ও `stroke="currentColor"` রয়েছে এবং lightweight line-art structure বজায় আছে।

### Reference
`docs/design/MODE_ICON_DESIGN_REFERENCE_2026-09-21.md` reference record হিসেবে সংরক্ষিত। Reference SHA-256: `170c83ecf42c84ca4c09686fccb32311c2272fe2d15dd4eb4b9be6ebce14c4d1`।

### Mode usage rule
- `general-quran` mode → `assets/icons/modes/general-quran-v1/`
- `sufi` mode → আলাদা Sufi icon family; General family overwrite/reuse করা যাবে না।
- Runtime mode switch icon family নির্বাচন করবে; live integration আলাদা approval gate-এর অধীন।

### Safety
Backup branch: `backup/pre-mode-icon-assets-2026-09-21`। এই verification কাজ কোনো database/backend/live UI পরিবর্তন করেনি।

### Integration gate
Backup → Review → Approve → Integrate → Verify → Live.


## WORK-2026-09-21-NORMAL-MODE-ICON-ASSET-SET-01

Status: CREATED AND STORED ON MAIN — ASSET-ONLY; NOT LIVE-WIRED

The user approved the generated icon-sheet as the Normal Qur'an Reader visual reference and requested the icon set be created, stored in the project, and its usage documented. A separate Sufi icon family will be created later and will not overwrite the Normal family.

Safety point: backup/pre-normal-mode-icon-set-2026-09-21 was created before this asset work.

Created assets: assets/icons/modes/normal-v1/ — 10 SVG icons, icon-manifest.json, README.md.
Usage record: docs/design/MODE_ICON_USAGE_2026-09-21.md.

Verification: all ten SVG asset files were present on the working branch and use fill=none, stroke=currentColor, 1.8px line-art. No live UI/database/backend integration was made. Runtime mode switching remains a later integration step.


### WORK-2026-09-21-NORMAL-QURAN-ICON-REFERENCE-FINAL
- User requested the 10-icon reference be created now, stored in the project, and its mode usage documented.
- Stored/verified assets: assets/icons/modes/normal-quran-v1/ (quran, surah, ayah, tafseer, bookmark, audio-tilawat, home, search, favorite, share), plus icon-manifest.json and reference-board.svg.
- Normal mode contract: these assets are for ordinary Quran reading only. Future Sufi mode must use a separate versioned asset family.
- Technical contract: SVG, 64x64, fill=none, stroke=currentColor, nominal 1.9–2px line art, round caps/joins.
- Verification: all ten SVG assets are present on main; audio uses the existing canonical filename audio-tilawat.svg; manifest maps the reader role to that file.
- Live integration: NOT performed. Existing reader/icon engine behavior remains unchanged pending isolated visual review and approval.


## WORK-2026-09-24-MAIN-LIVE-PROTECTION-NOTICE-01

**Status:** ACTIVE — স্থায়ী URL ও live update rule জারি

### User decision
ব্যবহারকারী নির্দেশ দিয়েছেন যে Main Live-কে নিরাপদ মূল পেজ হিসেবে রাখতে হবে; update-এর কারণে Main Live URL পরিবর্তন করা যাবে না। কাজের আগে backup থাকবে, ব্যর্থ হলে নিরাপদ backup restore হবে, এবং failed version storage/history-তে থাকবে।

### Canonical Main Live
https://mosharrof0000-ux.github.io/al-quran-research/#quran

### Required correction
Feature-এর direct page URL আলাদা করে দেওয়ার ফলে Main Live URL নিয়ে বিভ্রান্তি হতে পারে। এখন থেকে কোনো feature/test URL-কে Main Live বলা যাবে না। Main Live URL অপরিবর্তিত থাকবে।

### Mandatory reporting
প্রতিটি production change-এর পরে রিপোর্টে আলাদা করে Main Live, Feature/Test (যদি থাকে), এবং Deployment Status দিতে হবে। Deployment সফল না হওয়া পর্যন্ত live কাজ সম্পূর্ণ বলা যাবে না।

### Backup
Smart Face কাজ শুরুর আগে backup branch: backup/pre-mosharrif-smart-face-2026-09-24

### Permanent safety rule
Main Live URL পরিবর্তন শুধু ব্যবহারকারীর আলাদা স্পষ্ট অনুমোদনে করা যাবে। ব্যর্থ production change হলে সর্বশেষ নিরাপদ backup restore করতে হবে এবং ব্যর্থ সংস্করণ ইতিহাসে সংরক্ষণ করতে হবে।


## WORK-2026-10-25-AYAH-CONTEXT-ROUTING-01

**Status:** PR #170 OPEN/DRAFT — exact-head checks PASS on code head 26f6b3f00834cc436d75de14787760204fb50a39; production verification NOT TESTED

### Timestamp and safe point
- Date/time: 2026-10-25 09:18 Asia/Dhaka
- Base main SHA: `7d10b8b30707fced4ff3a277cfa4c7b509629f3a`
- Feature branch: `fix/research-context-ayah-routing-20261025-r1`
- No direct main write, merge, or deployment was performed.

### Evidence-based diagnosis
- The active Worker entry chain is `backend/wrangler.jsonc` → `backend/cors-entry.js` → `backend/worker-entry.js`.
- In the main source, `extractAyahReference` used double-escaped digit patterns and ASCII word-boundaries around Bengali surah names. A local Node reproduction returned `null` for all five probes: “সূরা ফাতিহা আয়াত ১”, “আল-ফাতিহার ১ নম্বর আয়াত”, “সূরা 1:1”, “সূরা ২:২৫৫”, and “সূরা বাকারা আয়াত 255”.
- `getResearchContext(message)` referenced `env` without receiving it. The surrounding catch swallowed that ReferenceError, so even a parsed ayah reference could not reliably load the Research API context.
- The old caller only failed closed when `research.ref` existed. An explicit ayah request whose surah name was not mapped could therefore continue to Gemini without a verified record.

### Changes on the isolated branch
- Added `backend/research-context.js`: extracted parser/context helper, corrected Bengali/ASCII digit parsing, recognizes Fatiha/Baqarah name forms and numeric surah:ayah references, detects explicit but unmapped ayah requests, passes the Worker environment to the API handler, and returns provenance only when a record is received.
- Updated `backend/worker-entry.js`: passes `env` at both call sites and fails closed whenever an explicit ayah reference was detected but verified context was unavailable.
- Added `scripts/test-research-context-routing.mjs`: seven parser cases plus env propagation, provenance, missing-record and fail-closed assertions.

### Verification
- Local Node regression probe against the original parser: FAIL (all five supported-form probes returned null).
- Local Node test against the proposed helper: PASS — 7 parser cases; env propagation, provenance, missing-record and fail-closed checks.
- Exact-head checks on code head `26f6b3f00834cc436d75de14787760204fb50a39`: Worker build PASS (https://github.com/mosharrof0000-ux/al-quran-research/runs/121064918830); Project Agent build PASS (https://github.com/mosharrof0000-ux/al-quran-research/runs/121064987215); token-runtime PASS (https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40158509417/job/121064895351).
- Production Worker /health, production chat round-trip and Live Pages browser verification: NOT TESTED; available web/network path could not access the production endpoints.
- No Quran text/data, database, secrets, deployment configuration, or production credentials were changed.

### Next action
PR #170 is open as Draft. Keep it unmerged while production endpoints cannot be verified; after final-head checks are green, review the code and separately verify production Worker and Live Pages before promotion.


## AQR-2026-10-25-AUTO02-RUN09-PRECHANGE

- Timestamp: 2026-10-25 19:46 Asia/Dhaka
- Scope: Al-Quran Research only; repository: https://github.com/mosharrof0000-ux/al-quran-research
- Stage ledger before next change: DISCOVER=PASS; DIAGNOSE=PASS; PLAN=PASS; CHANGE=PENDING; FOCUSED_TEST=PENDING; FULL_REQUIRED_CHECKS=PENDING; ARTIFACT_REVIEW=PENDING; ACCEPTANCE_VERIFY=NOT TESTED.
- Main SHA: `7d10b8b30707fced4ff3a277cfa4c7b509629f3a`. Working branch: `fix/research-context-ayah-routing-20261025-r1`. Existing PR: #170. Pre-change branch head: `1ebd28f6ecc93bc8a6c82639da0c62c3f617ebfb`.
- Existing feature in PR #170: Bengali/ASCII ayah-reference parser, Research API env propagation, fail-closed handling, provenance, and null-reference formatting guard. Current exact-head check-runs: Worker build PASS, Project Agent build PASS, token-runtime PASS. The focused test `scripts/test-research-context-routing.mjs` is present but is not invoked by `.github/workflows/mosharrof-token-runtime.yml`.
- Current autonomous loop blocker: run #40189569806 fails before contacting the agent because `MOSHARROF_AGENT_URL` and `AGENT_ACCESS_TOKEN` are empty in the job environment; run #40163115401 has the same failure signature. This is configuration/secret availability, not a transient runner issue; no unchanged retry planned.
- D1 workflow run #40191164508 has zero jobs, so no D1 provision/migration/deploy step ran. Do not interpret this as a successful deployment.
- `docs/WORK_RESUME_PROTOCOL.md` is absent from current main (contents lookup 404); followed the repository's actual continuity protocol `PROJECT_CONTINUITY_PROTOCOL.md` and reviewed `MASTER_PROJECT.md`, `PROJECT_STATE.md`, `PROJECT_WORK_LOG.md`, and `PROJECT_BACKUP_INDEX.md` instead.
- Production Worker health/chat and Live Pages browser acceptance are NOT TESTED: the available browser path could not open the configured endpoints. No main write, merge, deployment, secret change, or research-data mutation was performed.
- Next action: wire the existing focused routing regression script into the already-active read-only token-runtime PR check, then verify the resulting exact-head run.


## AQR-2026-10-25-AUTO02-RUN09-RESULT

- Timestamp: 2026-10-25 19:52 Asia/Dhaka
- Task/request ID: AQR-2026-10-25-AUTO02-RUN09-RESULT; project: Al-Quran Research only.
- Main SHA at verification: 7d10b8b30707fced4ff3a277cfa4c7b509629f3a; tested feature head before this documentation commit: c84df02228b63813d7504f5ce5dc5aa9ce5cb760; branch: fix/research-context-ayah-routing-20261025-r1; PR: [#170](https://github.com/mosharrof0000-ux/al-quran-research/pull/170).
- Change made in this run: appended the pre-change recovery record above, then added a conditional invocation of scripts/test-research-context-routing.mjs to the existing read-only .github/workflows/mosharrof-token-runtime.yml workflow. It runs only when that test file exists, so unrelated PRs without the file keep the prior behavior. No secrets or write permissions were added.
- Exact-head focused test: PASS — [token-runtime run #40199522477](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40199522477), job [121187514745](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40199522477/job/121187514745). Job log explicitly prints: PASS: 7 reference parsing cases; env propagation, provenance, missing-record and fail-closed checks.
- Exact tested head c84df02228b63813d7504f5ce5dc5aa9ce5cb760: [al-quran-research Worker build PASS](https://dash.cloudflare.com/5deb168bbc31c47db0419913860fce21/workers/services/view/al-quran-research/production/builds/e4e44d8e-4967-4901-8f21-490cd6d81277); [Project Agent Worker build PASS](https://dash.cloudflare.com/5deb168bbc31c47db0419913860fce21/workers/services/view/al-quran-research-project-agent/production/builds/2a8613fd-d72b-4937-82e5-da4dc7e8c661); token-runtime PASS. PR remains OPEN/DRAFT, mergeable metadata true; no merge or deployment occurred.
- Changed paths: PROJECT_WORK_LOG.md (checkpoint entries) and .github/workflows/mosharrof-token-runtime.yml (focused test hook). Research Quran data, DB schema, production credentials and live UI were not modified.
- Production acceptance: Worker /health, real non-mock Bengali chat response and Live Pages browser behavior remain NOT TESTED because the available browser path could not open the endpoints. D1 provision/deploy run #40199516037 ended FAILURE with zero jobs; no deployment step ran.
- Separate recurring blocker: autonomous loop run #40189569806 (and #40163115401) failed immediately because MOSHARROF_AGENT_URL and AGENT_ACCESS_TOKEN were empty in the job environment. No secret values were read or changed; a repository administrator must configure the endpoint URL and authorized bearer token before that loop can call the agent.
- Follow-up: this checkpoint-only commit changes the PR head after the tested implementation head. Re-read the branch and verify the exact new head's token-runtime and Worker build checks before considering the PR for review; keep PR #170 Draft until production verification and review gates are satisfied.

## AUTO-02 — Fresh-state checkpoint (AQR-2026-10-26-AUTO02-FRESH-RECONCILE-0154)

- **Timestamp:** 2026-10-26 01:54 Asia/Dhaka.
- **Scope:** Al-Quran Research only. Canonical repository: https://github.com/mosharrof0000-ux/al-quran-research.
- **Source-of-truth refs:** main = `c6e0fd2d269b39a677cfa3999b6078c7efc9b630`; PR #170 remains OPEN/DRAFT at `2eb3c32e396f7d1aacf3fa5f1f31e75bebbf754b` on `fix/research-context-ayah-routing-20261025-r1`. Do not merge or deploy from this checkpoint.
- **PR #171 reconciliation:** PR #171 was merged at 2026-10-25T19:49:14Z; merge commit is the current main SHA above. Its merge is confirmed by the GitHub PR API, not inferred from earlier reports: https://github.com/mosharrof0000-ux/al-quran-research/pull/171.
- **Current-main live runtime evidence:** Workflow run #40227837387 on exact main SHA `c6e0fd2d269b39a677cfa3999b6078c7efc9b630` completed SUCCESS: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40227837387. Job log reports Worker health/version PASS, Research API v1.1 with `github-json-fallback` and dataset `2026-09-04-fatiha-master-v1`, Fatiha 1:1 from `master-dataset`, Pages HTTP 200, and deterministic Bengali chat via `verified-project-data`; `RESULT: 5/5 live runtime smoke checks passed`. This is live HTTP acceptance through the GitHub runner, not full browser/UI acceptance and not an AI-provider call.
- **PR #171 test evidence:** Research API contract run #40226839882 PASS (7/7 mocked-D1 tests); Token Runtime #40226839845 PASS (14 token + 12 permission-route checks); PR live smoke #40226839665 PASS (5/5). These support test/build behavior, not live D1 or Gemini/Cloudflare-AI acceptance.
- **D1 workflow:** Main-push run #40227836398 is COMPLETED/FAILURE with zero jobs: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40227836398. The run record does not expose a job log; no D1 provision, migration, seed, or deploy step ran. Exact cause of the zero-job record is NOT PROVEN. Do not retry unchanged or create/provision a database to investigate.
- **Autonomous agent blocker:** Run #40211694743 failed at job #121224089577, step `Start isolated Mosharrof agent cycle`; log shows `AGENT_URL` and `AGENT_ACCESS_TOKEN` empty and exit code 1, before contacting the agent: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40211694743. Repository administrator must configure the intended endpoint and authorized bearer token. No secret was read or changed.
- **Runtime boundaries:** Worker health, Research API, Fatiha 1:1, Pages HTTP response and deterministic Bengali chat are PASS via run #40227837387. Production D1 is not configured (API reports `github-json-fallback`); live D1 reads/migrations and Gemini/Cloudflare-AI model invocation remain NOT TESTED. Full browser interaction remains NOT TESTED; this execution's browser tool could not open the public endpoints.
- **Automation health snapshot:** AUTO-02 ID `6ad51b8bbbe08191aa33e12da4b96841` was enabled when checked, but `next_run_time=null` and its last-run record was stale `in_progress`; scheduler health is UNCONFIRMED. Recheck after this invocation completes; do not create a duplicate.
- **Stage ledger:** DISCOVER=PASS; DIAGNOSE=PASS for the observed agent config blocker and D1 zero-job boundary; PLAN=PASS; CHANGE=PASS for this checkpoint-only append if the resulting commit is returned; FOCUSED_TEST=PENDING on the resulting PR head; FULL_REQUIRED_CHECKS=PENDING; ARTIFACT_REVIEW=PASS for the listed logs; ACCEPTANCE_VERIFY=PARTIAL PASS (live Worker/API/Pages/deterministic chat), NOT TESTED (live D1, model-provider, full browser UI); CHECKPOINT/REPORT=PENDING until exact new head and checks are reconciled.
- **Next bounded actions:** inspect D1 run/check-suite metadata for a specific no-job reason without provisioning; refresh PR #170 and dependency PRs #145/#148 against current main; recheck token-runtime on the exact updated #170 head. Keep #170 Draft and production untouched.


## AUTO-02 — Pre-change checkpoint (AQR-2026-10-26-AUTO02-RUN11-PRECHANGE)

- **Timestamp:** 2026-10-26 02:05 Asia/Dhaka.
- **Scope:** Al-Quran Research only; no Android or video work.
- **Canonical repository:** https://github.com/mosharrof0000-ux/al-quran-research
- **Main SHA:** `c6e0fd2d269b39a677cfa3999b6078c7efc9b630` (confirmed by latest repository commit search).
- **Existing PR:** #170 remains OPEN/DRAFT; branch `fix/research-context-ayah-routing-20261025-r1`; pre-change head `f757172001875fdc754e825eab173d952f3a971d`. No duplicate PR, merge, or deployment.
- **Current exact-head test evidence:** Token Runtime run #40228527990 completed SUCCESS on the pre-change head; job log reports 14/14 token tests, 12/12 permission-route tests, and the research-context routing test PASS (7 reference cases plus env/provenance/fail-closed checks). Run: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40228527990
- **Main runtime evidence:** run #40227837387 passed 5/5 read-only smoke checks on main SHA `c6e0fd2d269b39a677cfa3999b6078c7efc9b630`; it verifies Worker health, API status, Fatiha 1:1, Pages HTTP 200, and deterministic Bengali chat. It explicitly did NOT call an AI provider and reported `github-json-fallback` storage. Run: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40227837387
- **Observed blockers/boundaries:** full browser interaction and live Gemini/Cloudflare AI generation remain NOT TESTED; D1 run #40227836398 had zero jobs and did not deploy/provision D1; autonomous agent run #40211694743 failed because AGENT_URL and AGENT_ACCESS_TOKEN were empty. No secret was read or changed.
- **Pre-change diagnosis:** `backend/research-context.js` parses numeric references without validating general Qur'an bounds, and `formatResearchContextReference` currently formats out-of-range integers. Plan is to reject surah outside 1–114 and ayah outside 1–286 while preserving `reference_detected=true` and fail-closed behavior; add regression tests proving invalid references do not call the API.
- **Stages at checkpoint:** DISCOVER=PASS; DIAGNOSE=PASS; PLAN=PASS; CHANGE=PENDING; FOCUSED_TEST=PENDING; FULL_REQUIRED_CHECKS=PENDING; ARTIFACT_REVIEW=PASS for the evidence above; ACCEPTANCE_VERIFY=PARTIAL (deterministic runtime smoke only); CHECKPOINT/REPORT=PENDING.
- **Rollback:** all planned code/test changes remain isolated on PR #170 branch. Main and production are untouched. If focused checks fail, do not merge/deploy; fix or revert only the isolated branch changes.
- **Next step:** commit the regression guard/test together after this checkpoint is persisted; verify the exact resulting head and all checks before any further decision.


## AUTO-02 — Run 11 result checkpoint (AQR-2026-10-26-AUTO02-RUN11-RESULT)

- **Timestamp:** 2026-10-26 02:10 Asia/Dhaka.
- **Main SHA:** `c6e0fd2d269b39a677cfa3999b6078c7efc9b630`.
- **PR #170:** still OPEN/DRAFT; branch `fix/research-context-ayah-routing-20261025-r1`; implementation/test head before this log-only commit: `088d248aa96784a7c8ec25b5e8c8181a87d67f6c`. No merge, production deploy, secret change, or database provision.
- **Change delivered on isolated branch:** `backend/research-context.js` now validates generic Qur'an bounds (surah 1–114, ayah 1–286) before producing a usable numeric reference; invalid explicit references remain detected but return `ref: null`, causing fail-closed handling before API access. `formatResearchContextReference` rejects out-of-range values. `scripts/test-research-context-routing.mjs` adds invalid-boundary parser/formatter/API-call regression assertions and reports the expanded count accurately.
- **Exact-head focused CI:** Token Runtime run #40229485574 completed SUCCESS and is associated with implementation/test head `088d248aa96784a7c8ec25b5e8c8181a87d67f6c`: https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40229485574. Job checkout used PR merge-ref commit `a97ba3427dbf274fc91082e8f34d586a3fdddf56`; log explicitly reports 14/14 token tests, 12/12 permission-route tests, and: “PASS: 11 reference parsing cases; Quran bounds validation (surah 1-114, ayah 1-286); env propagation, provenance, missing-record and fail-closed checks.”
- **Earlier checkpoint-only commit:** `6dbc67f450c5fe18c246031bc42b2458f966f7a0` (pre-change state recorded before code writes).
- **Live runtime boundary:** Main run #40227837387 passed 5/5 read-only smoke checks on main `c6e0fd2d269b39a677cfa3999b6078c7efc9b630`: Worker health, API status, Fatiha 1:1, Pages HTTP 200, and deterministic Bengali chat. It used `github-json-fallback` and explicitly avoided AI-provider calls. https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40227837387
- **Still NOT TESTED / blocked:** live Gemini or Cloudflare AI generation, full browser/UI interaction, production D1. D1 workflow run #40227836398 had zero jobs, so no provision/migration/deploy occurred; its precise cause remains unproven. Autonomous agent run #40211694743 failed before contacting the agent because `AGENT_URL` and `AGENT_ACCESS_TOKEN` were empty; repository admin must configure the intended endpoint and authorized bearer token. No secret was read or changed.
- **Stage ledger:** DISCOVER=PASS; DIAGNOSE=PASS; PLAN=PASS; CHANGE=PASS on isolated PR branch; FOCUSED_TEST=PASS on head `088d248aa96784a7c8ec25b5e8c8181a87d67f6c`; FULL_REQUIRED_CHECKS=PENDING for the final log-only head and any additional required checks; ARTIFACT_REVIEW=PASS for the linked CI log; ACCEPTANCE_VERIFY=PARTIAL (deterministic HTTP smoke PASS; provider/browser/D1 NOT TESTED); CHECKPOINT/REPORT=PENDING until this log commit's exact head/checks are reconciled.
- **Rollback:** main and production remain untouched. If later checks fail, keep PR #170 Draft and fix/revert only its isolated branch; do not merge or deploy without runtime acceptance and approval.
- **Next:** verify the new log commit's exact PR head and checks; recheck AUTO-02 scheduler state and record next-run health separately.
