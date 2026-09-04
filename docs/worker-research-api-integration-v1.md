# আল-কুরআন গবেষণা — Worker + Research API Integration v1.0

## বর্তমান অবস্থা

বর্তমান Cloudflare Worker-এর মূল entry হলো `backend/worker.js`। `backend/wrangler.jsonc`-এ `main` হিসেবে `worker.js` নির্ধারিত আছে। তাই বর্তমান AI Worker অক্ষত রেখে Research API-কে ধাপে ধাপে যুক্ত করতে হবে।

`backend/research-api.js` বর্তমানে read-only `/api/v1/...` route দেয় এবং `backend/research-api-entry.js` একটি নিরাপদ আলাদা entry bridge হিসেবে রাখা হয়েছে।

## নিরাপদ routing নিয়ম

মূল Worker-এর `fetch(request, env, ctx)`-এর একেবারে শুরুতে Research API route পরীক্ষা করতে হবে:

```js
const researchResponse = await handleResearchApi(request);
if (researchResponse) return researchResponse;
```

এর আগে import যোগ করতে হবে:

```js
import { handleResearchApi } from './research-api.js';
```

তারপর বিদ্যমান CORS, Gemini, fallback এবং AI chat logic অপরিবর্তিত থাকবে।

## কেন এভাবে

1. `/api/v1/...` request Research API নেবে।
2. অন্য request বর্তমান AI Worker-এ যাবে।
3. বর্তমান Gemini AI logic overwrite হবে না।
4. Website UI পরিবর্তন করার প্রয়োজন নেই।
5. ভবিষ্যতে workspace/authentication যোগ করার জায়গা থাকবে।

## Workspace নিরাপত্তা

Workspace endpoint কখনো browser-এর পাঠানো `workspace_id`-কে একমাত্র বিশ্বাসযোগ্য পরিচয় হিসেবে গ্রহণ করবে না। Authentication চালু হলে server-side identity থেকে user/workspace membership নির্ধারণ করতে হবে।

## বর্তমান API

- `/api/v1/status`
- `/api/v1/surah/{surah_number}`
- `/api/v1/ayah/{surah_number}/{ayah_number}`
- `/api/v1/word/{token_id}`
- `/api/v1/search?q={query}`

## গুরুত্বপূর্ণ সতর্কতা

এই নথি তৈরি করার সময় `backend/worker.js`-এর সম্পূর্ণ source নিরাপদভাবে একসঙ্গে যাচাই করা সম্ভব হয়নি। তাই বর্তমান Worker-এ blind replacement করা হবে না। পূর্ণ source নির্ভরযোগ্যভাবে পাওয়া গেলে minimal import + route insertion করা হবে।

## পরবর্তী ধাপ

পূর্ণ Worker source নিরাপদভাবে পাওয়া গেলে:

`worker.js → Research API route → existing AI route`

এই minimal integration করা হবে এবং তারপর endpoint test করা হবে।
