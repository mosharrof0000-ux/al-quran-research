# আল-কুরআন গবেষণা — AI চ্যাট ব্যাকএন্ড

এই ফোল্ডারে GitHub Pages-এর নিরাপদ AI চ্যাটের জন্য Cloudflare Workers AI ব্যাকএন্ড রাখা হয়েছে।

- `worker.js` — বাংলা AI চ্যাট API
- `wrangler.jsonc` — Workers AI binding
- API key কখনো ওয়েবসাইটের HTML/JavaScript-এ রাখা হবে না।
- AI মডেল: `@cf/meta/llama-3.1-8b-instruct-fast`

## স্থাপনের পর

Worker-এর `workers.dev` ঠিকানা পাওয়া গেলে সেটিই ওয়েবসাইটের `window.AL_QURAN_CHAT_API` হিসেবে বসাতে হবে।

GitHub Pages নিজে server-side JavaScript চালায় না; তাই Worker আলাদা নিরাপদ ব্যাকএন্ড হিসেবে কাজ করবে।
