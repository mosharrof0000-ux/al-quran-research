/* আল-কুরআন গবেষণা — নিরাপদ AI চ্যাট ব্যাকএন্ড
   Gemini API + Cloudflare Workers AI fallback
   API key/index.html-এ রাখা হবে না।
*/

const ALLOWED_ORIGINS = [
  'https://mosharrof0000-ux.github.io'
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}

const SYSTEM = `তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী।

অবশ্যপালনীয় গবেষণা নিয়ম:
1. কুরআনের কোনো আয়াত, শব্দ বা আরবি পাঠ অনুমান করে বানাবে না। প্রশ্নে নির্দিষ্ট আয়াতের যাচাইযোগ্য মূল পাঠ দেওয়া থাকলে কেবল সেই পাঠ বিশ্লেষণ করবে।
2. কোনো আয়াতের মূল পাঠ তোমার কাছে দেওয়া/সংরক্ষিত না থাকলে স্পষ্টভাবে বলবে যে যাচাইযোগ্য ডেটা ছাড়া তুমি পাঠ বা বিশ্লেষণ বানাবে না।
3. ব্যবহারকারী যদি নির্দিষ্ট সূরা ও আয়াত নম্বর দেন, অন্য কোনো ধর্মীয় বাক্য, দোয়া, প্রচলিত উক্তি বা নিজের অনুমানকে সেই আয়াত হিসেবে উপস্থাপন করবে না।
4. আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক থাকবে। কোনো মাজহাব, দল বা নির্দিষ্ট আলেমের মতকে চূড়ান্ত সত্য হিসেবে চাপিয়ে দেবে না।
5. কুরআন গবেষণায় শব্দ, বাংলা উচ্চারণ, মূল ধাতু (Root), শব্দরূপ/সর্ফ, ব্যাকরণগত ভূমিকা, আক্ষরিক অর্থ ও প্রসঙ্গ আলাদা করে দেখাবে।
6. কোনো Root বা ব্যাকরণগত বিশ্লেষণ নিশ্চিত না হলে “অনিশ্চিত/যাচাই প্রয়োজন” বলে চিহ্নিত করবে; নিশ্চিত তথ্যের মতো লিখবে না।
7. ব্যবহারকারী বাংলা ভাষা চান। আরবি পাঠ প্রয়োজন হলে আরবি পাঠের সঙ্গে বাংলা উচ্চারণও দেবে।
8. কোনো মাযহাব, সম্প্রদায় বা আলেমের মতামত নিজে থেকে যোগ করবে না।
9. গবেষণা-ডেটা না থাকলে “ডেটা নেই” বলবে; কখনোই ফাঁকা জায়গা পূরণ করতে কল্পিত তথ্য দেবে না।`;

// যাচাই করা প্রকল্প-ডেটা না থাকলে মডেলকে স্মৃতি থেকে কুরআনের পাঠ বানাতে দেওয়া যাবে না।
// আপাতত পরীক্ষিত নির্দিষ্ট আয়াতটি নিরাপদ guardrail হিসেবে রাখা হয়েছে।
const VERIFIED_AYAH_DATA = {
  '1:1': {
    surah: 'সূরা ফাতিহা',
    ayah: '১',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    note: 'এই প্রকল্পের বর্তমান পরীক্ষিত ডেটায় সূরা ফাতিহা ১ নম্বর আয়াতের পাঠ হিসেবে এটি সংরক্ষিত।'
  }
};

function getVerifiedContext(message) {
  const text = String(message || '');
  const isFatiha1 = /ফাতিহা/.test(text) && /(?:১|1|এক)/.test(text) && /আয়াত|আয়াত/.test(text);
  if (!isFatiha1) return '';
  const data = VERIFIED_AYAH_DATA['1:1'];
  return `\n\n[যাচাইযোগ্য প্রকল্প ডেটা — মডেলের স্মৃতি দিয়ে পরিবর্তন করা যাবে না]\nসূরা: ${data.surah}\nআয়াত: ${data.ayah}\nআরবি মূল পাঠ: ${data.arabic}\nনোট: ${data.note}\nএই পাঠ ছাড়া অন্য কোনো বাক্যকে এই আয়াতের পাঠ হিসেবে লিখবে না।`;
}

async function askGeminiModel(prompt, env, model) {
  if (!env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY সেট করা নেই।');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1400, temperature: 0.1 }
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`${model} HTTP ${response.status}${detail ? `: ${detail.slice(0, 300)}` : ''}`);
  }

  const data = await response.json();
  const answer = data?.candidates?.[0]?.content?.parts?.map(part => part?.text || '').join('').trim();
  if (!answer) throw new Error(`${model} কোনো উত্তর দেয়নি।`);
  return answer;
}

async function askGemini(prompt, env) {
  const primary = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const models = [primary, 'gemini-2.5-flash-lite'].filter((value, index, list) => list.indexOf(value) === index);
  let firstError;
  for (const model of models) {
    try {
      return { answer: await askGeminiModel(prompt, env, model), model };
    } catch (error) {
      if (!firstError) firstError = error;
    }
  }
  throw new Error(`Gemini primary/fallback ব্যর্থ: ${String(firstError?.message || firstError)}`);
}

async function askCloudflareAI(prompt, env) {
  if (!env.AI) throw new Error('Cloudflare AI binding পাওয়া যায়নি।');
  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1400,
    temperature: 0.1
  });
  const answer = result?.response || result?.choices?.[0]?.message?.content;
  if (!answer) throw new Error('Cloudflare AI কোনো উত্তর দেয়নি।');
  return answer;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (request.method === 'GET') return json({
      ok: true,
      service: 'al-quran-research-chat',
      status: 'Worker চালু আছে',
      gemini: env.GEMINI_MODEL || 'gemini-2.5-flash',
      fallback: 'gemini-2.5-flash-lite',
      version: '2026-09-04-quran-guardrail-v2'
    }, 200, origin);
    if (request.method !== 'POST') return json({ error: 'শুধু POST/GET অনুরোধ গ্রহণ করা হয়।' }, 405, origin);

    try {
      const body = await request.json();
      const message = String(body?.message || '').trim();
      const mode = String(body?.mode || 'general');
      if (!message) return json({ error: 'প্রশ্নটি খালি।' }, 400, origin);
      if (message.length > 6000) return json({ error: 'প্রশ্নটি খুব বড়।' }, 413, origin);

      const modeInstruction = {
        general: 'সাধারণ প্রশ্নের উত্তর দাও।',
        word: 'শব্দ গবেষণা হিসেবে মূল/ধাতু, শব্দরূপ, অর্থপরিসর ও প্রাসঙ্গিক ব্যবহার আলাদা করে দাও।',
        ayah: 'আয়াত বিশ্লেষণ হিসেবে প্রথমে যাচাইযোগ্য আয়াতের মূল পাঠ দেখাও, তারপর প্রতিটি শব্দ আলাদা করে বাংলা উচ্চারণ, Root, আক্ষরিক অর্থ ও ব্যাকরণগত ভূমিকা দাও। কোনো তথ্য নিশ্চিত না হলে তা চিহ্নিত করো।',
        math: 'গাণিতিক গবেষণা হিসেবে কেবল যাচাইযোগ্য ডেটা ব্যবহার করো; সূত্র ও হিসাবের ধাপ দেখাও।',
        concordance: 'একই শব্দ অনুসন্ধান হিসেবে শব্দের অবস্থান/ব্যবহার নিয়ে উত্তর দাও; ডেটা না থাকলে তা স্পষ্ট বলো।',
        translation: 'অনুবাদ গবেষণা হিসেবে মূল শব্দের অর্থপরিসর, প্রসঙ্গ এবং সম্ভাব্য বাংলা রূপ তুলনা করো।'
      }[mode] || 'সাধারণ প্রশ্নের উত্তর দাও।';

      const verifiedContext = getVerifiedContext(message);
      const prompt = `${modeInstruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}${verifiedContext}`;
      let answer;
      let provider;

      try {
        const result = await askGemini(prompt, env);
        answer = result.answer;
        provider = result.model;
      } catch (geminiError) {
        provider = 'cloudflare-ai';
        try {
          answer = await askCloudflareAI(prompt, env);
        } catch (cloudflareError) {
          return json({
            error: 'AI ব্যাকএন্ডে সমস্যা হয়েছে।',
            detail: `Gemini: ${String(geminiError?.message || geminiError)}; Cloudflare AI: ${String(cloudflareError?.message || cloudflareError)}`
          }, 500, origin);
        }
      }

      if (!answer) return json({ error: 'AI কোনো উত্তর দেয়নি।' }, 502, origin);
      return json({ answer, mode, language: 'bn', provider }, 200, origin);
    } catch (error) {
      return json({ error: 'AI ব্যাকএন্ডে সমস্যা হয়েছে।', detail: String(error?.message || error) }, 500, origin);
    }
  }
};
