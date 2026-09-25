# মোশাররফ Token Runtime v0.1

## উদ্দেশ্য
Permission/Capability সিদ্ধান্তের পরে কোন credential ব্যবহার করা যাবে তা নির্ধারণের জন্য নিরাপদ Token Runtime foundation।

## মূল নীতি
- Token = credential; Capability/Permission = ক্ষমতার সীমা।
- Token নিজে নতুন permission তৈরি বা privilege বাড়াতে পারে না।
- Effective power = parent policy ∩ capability ∩ operation ∩ resource scope ∩ environment ∩ token scope ∩ policy gate.
- Least-privilege token নির্বাচন করতে হবে।
- Raw token/secret কখনো source code, log, audit payload বা learning record-এ রাখা যাবে না।
- Token scope parent permission-এর চেয়ে বড় হতে পারবে না।
- Destructive/security/admin/live-sensitive কাজ default deny বা explicit approval ছাড়া চলবে না।
- Token registry-তে secret value নয়, শুধু opaque auth_reference/secret_ref থাকবে।

## Runtime flow
REQUEST → CAPABILITY RESOLVE → PERMISSION CHECK → TOKEN CANDIDATES → SCOPE INTERSECTION → POLICY CHECK → LEAST PRIVILEGE → APPROVAL CHECK → EXECUTE → VERIFY → AUDIT

## Token lifecycle
DISCOVERED → REGISTERED → VERIFIED → ACTIVE → REVIEW → SUSPENDED/REVOKED

## Token record
token_id, provider, auth_reference, capabilities, operations, resource_scopes, environments, rate_limits, expiry/review, status, policy_gate, audit_reference.

## Hard boundaries
1. No super-token.
2. No raw secret exposure.
3. No token self-escalation.
4. No parent DENY override.
5. No permission self-approval.
6. No direct live bypass.
7. No destructive execution without required approval.
8. No audit bypass.

## গুরুত্বপূর্ণ
এটি token তৈরির জন্য secret generate করে না। এটি ভবিষ্যতে user-approved provider token-কে নিরাপদভাবে register, map, select ও verify করার runtime contract। Actual provider token creation remains an external/provider-side operation.
