# Worker Wrapper Integration v1.0

## উদ্দেশ্য
বর্তমান `backend/worker.js` অপরিবর্তিত রেখে Research API-কে Worker routing-এর সামনে আনার নিরাপদ পদ্ধতি।

## Wrapper
`backend/worker-entry.js` প্রথমে `handleResearchApi(request)` চালায়। Research API route হলে তার response ফেরত দেয়। অন্যথায় বর্তমান `worker.js`-এর `fetch()`-এ request পাঠায়।

## নিরাপত্তা
- `worker.js` সরাসরি প্রতিস্থাপন করা হয়নি।
- Gemini API key বা secret এই wrapper-এ রাখা হয়নি।
- Client-provided workspace ID দিয়ে authorization করা হবে না।
- Workspace write endpoint authentication/server-side identity প্রস্তুত না হওয়া পর্যন্ত read-only Research API থাকবে।

## গুরুত্বপূর্ণ
এই commit source-level wrapper তৈরি করেছে। `backend/wrangler.jsonc` এখনো `worker.js`-কে entry point হিসেবে ব্যবহার করছে। তাই Cloudflare Worker-এ wrapper live হয়নি। Wrangler entry পরিবর্তন ও deployment-এর আগে `worker.js`-এর default module export নিশ্চিত করতে হবে।

## বর্তমান অবস্থা
- Existing AI Worker: অপরিবর্তিত
- Research API: read-only
- Wrapper: তৈরি
- Live deployment: এখনো নয়
