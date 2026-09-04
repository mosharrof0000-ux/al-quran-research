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
1. কুরআনের কোনো আয়াত, শব্দ বা আরবি পাঠ অনুমান করে বানাবে না।
2. যাচাই করা প্রকল্প-ডেটা দেওয়া থাকলে সেটিই অনুসরণ করবে; মডেলের স্মৃতি দিয়ে তা বদলাবে না।
3. নির্দিষ্ট সূরা-আয়াতের পাঠ সংরক্ষিত না থাকলে স্পষ্টভাবে বলবে: যাচাইযোগ্য ডেটা ছাড়া পাঠ/বিশ্লেষণ তৈরি করা যাবে না।
4. কোনো অন্য ধর্মীয় বাক্য, দোয়া, প্রচলিত উক্তি বা নিজের অনুমানকে কুরআনের আয়াত হিসেবে উপস্থাপন করবে না।
5. আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক থাকবে। কোনো মাজহাব, দল বা নির্দিষ্ট আলেমের মতকে চূড়ান্ত সত্য হিসেবে চাপিয়ে দেবে না।
6. শব্দ গবেষণায় আরবি শব্দ, বাংলা উচ্চারণ, Root/মূল ধাতু, শব্দরূপ/সর্ফ, আক্ষরিক অর্থ, ব্যাকরণগত ভূমিকা এবং নিশ্চিততার মাত্রা আলাদা করবে।
7. Root/ব্যুৎপত্তি বা ব্যাকরণ নিয়ে মতভেদ থাকলে তা “অনিশ্চিত/বিতর্কিত/যাচাই প্রয়োজন” হিসেবে স্পষ্ট করবে; বানানো Root যেমন “র-মূল”, “ল-মূল” লিখবে না।
8. পূর্ণ হারকাতযুক্ত আরবি শব্দের বাংলা উচ্চারণে প্রয়োজনীয় শেষ স্বরধ্বনি রাখবে; বিরতির উচ্চারণ আলাদা হলে তা উল্লেখ করতে পারো।
9. “আক্ষরিক অর্থ” ও “ব্যাখ্যামূলক অর্থ” এক করে ফেলবে না।
10. গবেষণা-ডেটা না থাকলে “ডেটা নেই” বলবে; ফাঁকা জায়গা কল্পিত তথ্য দিয়ে পূরণ করবে না।
11. ব্যবহারকারী বাংলা ভাষায় উত্তর চান। প্রয়োজনে আরবি পাঠের সঙ্গে বাংলা উচ্চারণ দেবে।`;

// বর্তমানে প্রকল্পে পরীক্ষিত নির্দিষ্ট আয়াতের নিয়ন্ত্রিত ডেটা।
const VERIFIED_AYAH_DATA = {
  '1:1': {
    surah: 'সূরা ফাতিহা',
    ayah: '১',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    words: [
      {
        arabic: 'بِسْمِ',
        pronunciation: 'বিসমি',
        literal: 'নামের দ্বারা / নামের সঙ্গে',
        root: 'ব্যুৎপত্তিগতভাবে বিতর্কিত; শব্দটির মূল নির্ধারণে স-م-و ও و-س-م-ভিত্তিক ঐতিহাসিক বিশ্লেষণ পাওয়া যায়',
        root_status: 'বিতর্কিত — সরল একক Root হিসেবে নিশ্চিত নয়',
        morphology: 'بِـ (বা) অব্যয়/প্রিপোজিশন + اسْم (ইসম্) নামবাচক পদ; এখানে اسْم مجرور',
        grammar: 'حرف جر + اسم مجرور; পরবর্তী اللَّهِ-এর সঙ্গে إضافة গঠন করে: بِسْمِ اللَّهِ',
        note: 'এখানে “সম্পর্কে” আক্ষরিক অর্থ হিসেবে লেখা ঠিক নয়।'
      },
      {
        arabic: 'اللَّهِ',
        pronunciation: 'আল্লাহি',
        literal: 'আল্লাহ — একটি বিশেষ নাম',
        root: 'ব্যুৎপত্তি বিতর্কিত; প্রচলিত ভাষাতাত্ত্বিক বিশ্লেষণে إ-ل-ه ধাতুর সঙ্গে সম্পর্ক দেখানো হয়',
        root_status: 'ব্যুৎপত্তিগতভাবে বিতর্কিত; নিশ্চিত একক Root হিসেবে উপস্থাপন নয়',
        morphology: 'বিশেষ নাম (اسم عَلَم)',
        grammar: 'مضاف إليه مجرور — “بِسْمِ” এর إضافة-র দ্বিতীয় পদ',
        note: '“ল-মূল” বলা গবেষণামূলক Root বিশ্লেষণ নয়।'
      },
      {
        arabic: 'الرَّحْمَٰنِ',
        pronunciation: 'আর-রহমানি',
        literal: 'পরম দয়াময় / অত্যন্ত দয়াশীল',
        root: 'ر-ح-م (র-হ-ম)',
        root_status: 'প্রচলিত আরবি ধাতু বিশ্লেষণে নিশ্চিত',
        morphology: 'الـ + رَحْمَان; ওজন فَعْلَان (ফা‘লান)',
        grammar: 'نعت/صفة مجرور — اللَّهِ-এর বিশেষণ; একই ই‘রাব অবস্থায়',
        note: 'শুধু “দয়ালু” লিখলে অর্থপরিসর অতিরিক্ত সংকুচিত হয়।'
      },
      {
        arabic: 'الرَّحِيمِ',
        pronunciation: 'আর-রহিমি',
        literal: 'অতি দয়াশীল / করুণাময়',
        root: 'ر-ح-م (র-হ-ম)',
        root_status: 'প্রচলিত আরবি ধাতু বিশ্লেষণে নিশ্চিত',
        morphology: 'الـ + رَحِيم; ওজন فَعِيل (ফা‘ঈল)',
        grammar: 'نعت/صفة مجرور — اللَّهِ-এর আরেকটি বিশেষণ',
        note: 'রহমান ও রহিমের মধ্যে নির্দিষ্ট ধর্মতাত্ত্বিক পার্থক্য এখানে নিজে থেকে আরোপ করা হবে না।'
      }
    ]
  }
};

function isFatiha1(message) {
  const text = String(message || '');
  return /ফাতিহা/.test(text) && /(?:১|1|এক)/.test(text) && /আয়াত|আয়াত/.test(text);
}

function getVerifiedContext(message) {
  if (!isFatiha1(message)) return '';
  const data = VERIFIED_AYAH_DATA['1:1'];
  return `\n\n[যাচাইযোগ্য প্রকল্প ডেটা — অপরিবর্তনীয়]\nসূরা: ${data.surah}\nআয়াত: ${data.ayah}\nআরবি মূল পাঠ: ${data.arabic}\nএই পাঠ ছাড়া অন্য কোনো বাক্যকে এই আয়াতের পাঠ হিসেবে লিখবে না।`;
}

function wantsWordAnalysis(message) {
  const text = String(message || '');
  return /মূল ধাতু|root|রুট|ব্যাকরণ|ব্যাকরণগত|শব্দের বাংলা উচ্চারণ|আক্ষরিক বাংলা অর্থ|প্রতিটি.*শব্দ/.test(text);
}

function buildFatiha1ResearchAnswer() {
  const data = VERIFIED_AYAH_DATA['1:1'];
  const rows = data.words.map((word, i) => `${i + 1}. ${word.arabic}\nবাংলা উচ্চারণ: ${word.pronunciation}\nআক্ষরিক অর্থ: ${word.literal}\nমূল ধাতু (Root): ${word.root}\nRoot-এর অবস্থা: ${word.root_status}\nশব্দরূপ/সর্ফ: ${word.morphology}\nব্যাকরণগত ভূমিকা: ${word.grammar}\nগবেষণা নোট: ${word.note}`).join('\n\n');
  return `সূরা ফাতিহা — ১ নম্বর আয়াত\n\nআরবি মূল পাঠ:\n${data.arabic}\n\nশব্দভিত্তিক গবেষণা:\n\n${rows}\n\nগবেষণা নীতি: এখানে Root ও ব্যাকরণকে যেখানে নিশ্চিত নয় সেখানে আলাদা করে অনিশ্চিত/বিতর্কিত হিসেবে দেখানো হয়েছে। কোনো মাজহাব, সম্প্রদায় বা আলেমের মতামত যোগ করা হয়নি।`;
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
      generationConfig: { maxOutputTokens: 1600, temperature: 0.1 }
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
    max_tokens: 1600,
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
      version: '2026-09-04-quran-research-v3'
    }, 200, origin);
    if (request.method !== 'POST') return json({ error: 'শুধু POST/GET অনুরোধ গ্রহণ করা হয়।' }, 405, origin);

    try {
      const body = await request.json();
      const message = String(body?.message || '').trim();
      const mode = String(body?.mode || 'general');
      if (!message) return json({ error: 'প্রশ্নটি খালি।' }, 400, origin);
      if (message.length > 6000) return json({ error: 'প্রশ্নটি খুব বড়।' }, 413, origin);

      // নির্দিষ্ট পরীক্ষিত গবেষণা-প্রশ্নে সরাসরি কাঠামোবদ্ধ ডেটা ব্যবহার করা হয়।
      // এতে Gemini/অন্য মডেল ভুল Root বা ব্যাকরণ বানিয়ে দিতে পারে না।
      if (isFatiha1(message) && wantsWordAnalysis(message)) {
        return json({
          answer: buildFatiha1ResearchAnswer(),
          mode: mode === 'general' ? 'ayah' : mode,
          language: 'bn',
          provider: 'verified-project-data'
        }, 200, origin);
      }

      const modeInstruction = {
        general: 'সাধারণ প্রশ্নের উত্তর দাও।',
        word: 'শব্দ গবেষণা হিসেবে মূল/ধাতু, শব্দরূপ, অর্থপরিসর, ব্যাকরণ ও নিশ্চিততার মাত্রা আলাদা করে দাও।',
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
