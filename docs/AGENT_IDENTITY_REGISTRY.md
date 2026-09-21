# Agent Identity Registry — v1

## উদ্দেশ্য
প্রতিটি নতুন কাজকে আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID এবং Branch Identity দেওয়া হবে। নাম শুধু প্রদর্শন নয়—কাজের ইতিহাস বোঝার স্থায়ী পরিচয়।

## Naming rules
- কাজের ধরন অনুযায়ী বাংলা মানবসদৃশ নাম নির্বাচন হবে।
- একই সক্রিয় Task-এ একই Agent Identity পুনর্ব্যবহার করা যাবে না।
- একই নাম ভবিষ্যতে আবার ব্যবহার হলে নতুন Agent ID ও Task ID বাধ্যতামূলক।
- Branch নাম হবে: `agent/<roman-name>-<task-type>-<sequence>`
- নাম পরিবর্তন করলে পুরোনো পরিচয় মুছে ফেলা যাবে না; successor relation থাকবে।

## Initial work-type map
| কাজ | প্রস্তাবিত Agent Name |
|---|---|
| Chat/UI | শামীম |
| Icon | শাহীন |
| Reader/Data | সুমন |
| Notification | রাকিব |
| Browser/Visual QA | নাঈম |
| Backend/Worker | ফারহান |
| Documentation/Handoff | আরিফ |
| Security/Isolation | তানভীর |

এই তালিকা seed registry; ভবিষ্যৎ কাজের জন্য collision check ও নতুন identity তৈরি করতে হবে।

## Required identity fields
- Agent Name (বাংলা)
- Agent ID (immutable)
- Task ID
- Session ID
- Work Type
- Requester
- Parent Task ID
- Branch
- Start/End time
- Status

## Rule
কোনো Agent কাজ অসম্পূর্ণ রেখে থামলে তার identity ও record স্থায়ী থাকবে এবং পরবর্তী Agent তাকে successor হিসেবে গ্রহণ করবে।
