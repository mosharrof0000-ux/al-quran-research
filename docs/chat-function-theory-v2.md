# চ্যাট ফাংশন থিওরি — v2

## উদ্দেশ্য

চ্যাট বক্স শুধু প্রশ্নের উত্তর দেওয়ার জায়গা নয়। এটি ভবিষ্যৎ Research Laboratory Engine-এর **Universal Controller** হবে। ব্যবহারকারী স্বাভাবিক বাংলায় নির্দেশ দেবেন; controller প্রয়োজন অনুযায়ী capability/tool খুঁজবে, চালাবে, এবং ফলাফল workspace-এ ফেরত দেবে।

## মূল নীতি

1. **Chat = Controller** — চ্যাট হবে ব্যবহারকারীর প্রধান নিয়ন্ত্রণ দরজা।
2. **Tool = Capability** — একটি Tool একটি নির্দিষ্ট কাজের ক্ষমতা বহন করবে।
3. **Workspace = ব্যবহারকারীর নিজস্ব কাজের স্থান** — অন্যের Tool কপি করলেও ব্যক্তিগত গবেষণা/ডেটা মিশবে না।
4. **Interface ≠ Tool** — একই capability-এর একাধিক interface/workspace থাকতে পারবে।
5. **Auto + Manual** — controller নিজে উপযুক্ত Tool বেছে নিতে পারবে; প্রয়োজনে ব্যবহারকারী Tool/Mode নিজেও বেছে নেবেন।
6. **Version-aware** — Tool, workspace ও গবেষণা-ডেটার পরিবর্তন versioned হবে।
7. **Correction ≠ overwrite** — সংশোধন নতুন version/proposal হিসেবে থাকবে।
8. **AI output ≠ verified research** — AI-এর উত্তর স্বয়ংক্রিয়ভাবে গবেষণার সত্য/যাচাইকৃত তথ্য হয়ে যাবে না।

## Chat-এর বর্তমান capability

- সাধারণ প্রশ্ন
- শব্দ গবেষণা
- আয়াত বিশ্লেষণ
- গাণিতিক গবেষণা
- একই শব্দ অনুসন্ধান
- অনুবাদ গবেষণা
- বাংলা ভয়েস input
- বাংলা voice output
- Cloudflare Worker → AI response
- Worker ব্যর্থ হলে সীমিত স্থানীয় fallback

## নতুন Tool Engine layer

`tool-engine.js` একটি ছোট registry layer হিসেবে কাজ করবে। এর মূল API:

- `register(tool)` — নতুন Tool নিবন্ধন
- `list()` — নিবন্ধিত Tool-এর তালিকা
- `find(query)` — নাম/capability দিয়ে Tool খোঁজা
- `describe(id)` — Tool-এর পরিচয়/ক্ষমতা দেখা
- `execute(id,input,context)` — Tool চালানো

এখনকার registry-তে chat-এর ছয়টি research capability-এর পাশাপাশি `universal-controller` এবং `backup-restore-controller` নিবন্ধিত হয়েছে। Execution handler পরে আলাদা Tool হিসেবে যুক্ত করা যাবে।

## ভবিষ্যৎ controller flow

`বাংলা নির্দেশ → intent বোঝা → capability শনাক্ত → Tool খোঁজা → permission যাচাই → Tool চালানো → ফলাফল → workspace/data-তে traceable save → version/change history`

## Tool তৈরির flow

`প্রয়োজন শনাক্ত → Tool skeleton → capability/permission সংজ্ঞা → test → নিরাপত্তা যাচাই → register → chat থেকে ব্যবহার → version history`

## উদাহরণ

ব্যবহারকারী: **“YouTube চালাও”**

Controller প্রথমে YouTube capability খুঁজবে। একাধিক public interface থাকলে সেগুলো দেখাতে পারবে। ব্যবহারকারী কোনো interface পছন্দ করে কপি করলে সেটি তাঁর নিজস্ব workspace-এর স্বাধীন version হবে। মূল নির্মাতার Tool অপরিবর্তিত থাকবে।

ব্যবহারকারী: **“সূরা ফাতিহার ১ নম্বর আয়াতের শব্দগুলো গবেষণা করো”**

Controller Quran research capability বেছে নেবে, প্রয়োজনীয় research data/API ব্যবহার করবে, এবং ফলাফল গবেষণা workspace-এ traceableভাবে দেখাবে।

ব্যবহারকারী: **“এইটা রাখো”**

বর্তমান ভালো অবস্থাকে নতুন version/safe point হিসেবে চিহ্নিত করার workflow সক্রিয় হবে।

ব্যবহারকারী: **“ফিরিয়ে দাও”**

সর্বশেষ নিরাপদ restore point নির্বাচন করে ফিরিয়ে দেওয়ার workflow চলবে। কোনো ভালো backup নষ্ট করা যাবে না।

## নিরাপত্তা সীমা

- Tool নিজে নিজে অনুমতি ছাড়া sensitive write/delete কাজ করবে না।
- Private research data public Tool/Template-এর সঙ্গে প্রকাশ হবে না।
- Public Tool clone করলে clone-এর পরিবর্তন original-এর ওপর প্রভাব ফেলবে না।
- গবেষণা-তথ্য silent overwrite করা যাবে না।
- গুরুত্বপূর্ণ পরিবর্তনের আগে safe point থাকা বাধ্যতামূলক হবে।

## বর্তমান বাস্তবায়ন

এই v2 নকশার প্রথম ছোট ধাপ হিসেবে `tool-engine.js` যোগ করা হয়েছে এবং `chat-system.js`-কে তার registry-এর সঙ্গে সংযুক্ত করা হয়েছে। বিদ্যমান chat UI, বাংলা voice, speaker, mode এবং Worker connection-এর কাঠামো রাখা হয়েছে; নতুন layer আলাদা রাখা হয়েছে যাতে ভবিষ্যতে Tool Engine বড় করা যায়।

## পরবর্তী স্তর

1. Chat intent router
2. Tool permission layer
3. Real Tool execution adapters
4. Workspace registry
5. Public Tool/Template catalog
6. Clone/customize workflow
7. Automatic safe-point/version manager
8. Test/diagnostic Tool system

এই নথি হলো architecture direction; নতুন capability যোগ করার সময় এটি reference হিসেবে ব্যবহার করতে হবে।
