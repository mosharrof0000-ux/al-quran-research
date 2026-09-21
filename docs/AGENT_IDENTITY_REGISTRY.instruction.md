# Instruction — AGENT_IDENTITY_REGISTRY.md

## Identity
Path: docs/AGENT_IDENTITY_REGISTRY.md
Purpose: Project Agent identity, naming, ownership and continuation registry.

## Allowed
- Agent identity/task metadata যোগ বা সংশোধন করা।
- নতুন task-এর unique identity record রাখা।
- Successor/handoff সম্পর্ক সংরক্ষণ করা।

## Forbidden
- ইতিহাস মুছে ফেলা।
- main promotion অনুমোদন হিসেবে record করা।
- গোপন credential/token সংরক্ষণ করা।

## Verification
- Task ID unique হতে হবে।
- Agent ID এবং branch mapping পরিষ্কার হতে হবে।
- অসম্পূর্ণ task-এর successor chain দৃশ্যমান হতে হবে।

## Change history
v1.0 — initial registry for autonomous Project Agent system.
