# MOSHARROF Live Core — Progressive Public Capability Delivery v0.1

## উদ্দেশ্য
মোশাররফের protected live/core surface এবং সাধারণ user-facing surface আলাদা থাকবে। সাধারণ ব্যবহারকারী root/core/admin interface সরাসরি আবিষ্কার বা ব্যবহার করবে না। User-facing tools প্রয়োজন অনুযায়ী ধাপে ধাপে নতুন validated capability গ্রহণ করবে।

## স্থাপত্য
HUMAN / APPROVED POLICY
        ↓
MOSHARROF PROTECTED CORE
        ↓
CAPABILITY + PERMISSION + TOKEN GATE
        ↓
RELEASE / FEATURE GATE
        ↓
USER-FACING TOOL SURFACE

## মূল নীতি
1. Protected core URL/UI public navigation, sitemap, search index বা tool navigation-এ প্রকাশ করা হবে না।
2. Public user interface কেবল অনুমোদিত Tool surface দেখাবে।
3. নতুন capability আগে sandbox → validation → staging/canary → controlled release পেরোবে।
4. User-facing release ধাপে ধাপে capability পাবে; একবারে সব internal power প্রকাশ করা হবে না।
5. Capability update মানে user-এর অজান্তে privilege escalation নয়; এটি approved feature/capability release।
6. Existing users-এর data, permissions বা security boundary নীরবে পরিবর্তন করা যাবে না।
7. Core, security/admin, token management এবং destructive controls public surface-এ প্রকাশ করা যাবে না।
8. প্রতিটি release-এর version, scope, rollout state ও audit event থাকবে।
9. Rollback capability বাধ্যতামূলক।
10. Public surface ও protected core-এর মধ্যে direct bypass থাকবে না।

## Release states
INTERNAL → SANDBOX → VALIDATED → STAGING → CANARY → PROGRESSIVE_RELEASE → ACTIVE → ROLLBACK/REVIEW

## Progressive update model
- নতুন capability তৈরি হলে প্রথমে internal.
- পরীক্ষিত হলে staging.
- সীমিত public traffic/user surface-এ canary.
- verification সফল হলে progressive release.
- সমস্যা হলে আগের known-good version-এ rollback.
- Active capability পরবর্তী version দ্বারা supersede হতে পারে; ইতিহাস মুছে যাবে না।

## Visibility boundary
Public:
- approved tools
- approved features
- user-facing research/read/chat interfaces

Protected:
- Mosharrof root/core
- permission registry
- token registry
- security/admin controls
- deployment/promotion controls
- audit and policy controls

## গুরুত্বপূর্ণ সীমা
"ব্যবহারকারীরা মূল live page খুঁজে পাবে না" বলতে protected core-কে public navigation থেকে পৃথক রাখা বোঝানো হয়েছে। এটি security-by-obscurity হিসেবে একমাত্র নিরাপত্তা ব্যবস্থা নয়। Authentication, authorization, permission checks এবং server-side policy enforcement বাধ্যতামূলক।

## Non-goals
- গোপনে privilege escalation
- user permissions bypass
- root/core exposure
- automatic unverified promotion
- audit/logging বন্ধ করা
