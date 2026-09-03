# আল-কুরআন গবেষণা — AI চ্যাট ব্যাকএন্ড

এই ফোল্ডারে GitHub Pages-এর নিরাপদ AI চ্যাটের জন্য Cloudflare Worker ব্যাকএন্ড রাখা হয়েছে।

- `worker.js` — বাংলা AI চ্যাট API
- `wrangler.jsonc` — Cloudflare Workers AI binding
- Gemini API key কখনো ওয়েবসাইটের HTML/JavaScript-এ রাখা হবে না।
- Gemini primary model: `gemini-3.8-flash`
- Gemini fallback model: `gemini-3.5-flash-lite`
- Gemini ব্যর্থ হলে Cloudflare Workers AI fallback চালু থাকে।

## নিরাপত্তা

Gemini API key `GEMINI_API_KEY` নামে Worker secret হিসেবে রাখতে হবে। Secret কোনো repository file-এ লেখা যাবে না।

## স্থাপন

`main` branch-এ `backend/**` পরিবর্তন হলে `.github/workflows/deploy-worker.yml` Cloudflare Worker deploy করার জন্য চালু হয়।

Worker-এর `workers.dev` ঠিকানাই ওয়েবসাইটের `window.AL_QURAN_CHAT_API` হিসেবে ব্যবহার করা হয়।

GitHub Pages নিজে server-side JavaScript চালায় না; তাই API key নিরাপদ রাখতে Worker আলাদা ব্যাকএন্ড হিসেবে কাজ করে।
