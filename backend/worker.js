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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin)
  });
}

const SYSTEM = `তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী।
ভাষা: বাংলা। ব্যবহারকারী আরবি ও ইংরেজি পড়তে পারেন না, তাই প্রয়োজন হলে আরবি শব্দের বাংলা উচ্চারণ/লিপ্যন্তর দাও।
পদ্ধতি: আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক। কোনো মাজহাব, দল বা নির্দিষ্ট আলেমের মতকে চূড়ান্ত সত্য হিসেবে চাপিয়ে দেবে না।
কুরআন গবেষণায় মূল শব্দ, ধাতু, শব্দরূপ, ব্যাকরণ, সম্ভাব্য অর্থপরিসর, প্রসঙ্গ এবং অনুবাদ আলাদা করে দেখাবে। নিশ্চিত তথ্য ও অনুমান আলাদা রাখবে। তথ্য না থাকলে বানিয়ে সংখ্যা বা উদ্ধৃতি দেবে না।
গাণিতিক গবেষণায় কেবল যাচাইযোগ্য ডেটা থাকলে হিসাব করবে এবং সূত্র/ধাপ দেখাবে।`;

async function askGemini(prompt, env) {
  if (!env.GEMINI_API_KEY) return null;

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 900,
          temperature: 0.25
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API HTTP ${response.status}`);
  }

  const data = await response.json();
  const answer = data?.candidates?.[0]?.content?.parts
    ?.map(part => part?.text || '')
    .join('')
    .trim();

  if (!answer) throw new Error('Gemini কোনো উত্তর দেয়নি।');
  return answer;
}

async function askCloudflareAI(prompt, env) {
  if (!env.AI) throw new Error('Cloudflare AI binding পাওয়া যায়নি।');

  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: prompt }
    ],
    max_tokens: 900,
    temperature: 0.25
  });

  const answer = result?.response || result?.choices?.[0]?.message?.content;
  if (!answer) throw new Error('Cloudflare AI কোনো উত্তর দেয়নি।');
  return answer;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'শুধু POST অনুরোধ গ্রহণ করা হয়।' }, 405, origin);
    }

    try {
      const body = await request.json();
      const message = String(body?.message || '').trim();
      const mode = String(body?.mode || 'general');

      if (!message) return json({ error: 'প্রশ্নটি খালি।' }, 400, origin);
      if (message.length > 6000) return json({ error: 'প্রশ্নটি খুব বড়।' }, 413, origin);

      const modeInstruction = {
        general: 'সাধারণ প্রশ্নের উত্তর দাও।',
        word: 'শব্দ গবেষণা হিসেবে মূল/ধাতু, শব্দরূপ, অর্থপরিসর ও প্রাসঙ্গিক ব্যবহার আলাদা করে দাও।',
        ayah: 'আয়াত বিশ্লেষণ হিসেবে শব্দ, ব্যাকরণ, বাক্যগঠন, প্রসঙ্গ ও অনুবাদ-সম্ভাবনা আলাদা করো।',
        math: 'গাণিতিক গবেষণা হিসেবে কেবল যাচাইযোগ্য ডেটা ব্যবহার করো; সূত্র ও হিসাবের ধাপ দেখাও।',
        concordance: 'একই শব্দ অনুসন্ধান হিসেবে শব্দের অবস্থান/ব্যবহার নিয়ে উত্তর দাও; ডেটা না থাকলে তা স্পষ্ট বলো।',
        translation: 'অনুবাদ গবেষণা হিসেবে মূল শব্দের অর্থপরিসর, প্রসঙ্গ এবং সম্ভাব্য বাংলা রূপ তুলনা করো।'
      }[mode] || 'সাধারণ প্রশ্নের উত্তর দাও।';

      const prompt = `${modeInstruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}`;

      // প্রথমে Gemini ব্যবহার করা হবে। Gemini ব্যর্থ হলে Cloudflare AI fallback হিসেবে কাজ করবে।
      let answer;
      let provider = 'gemini';

      try {
        answer = await askGemini(prompt, env);
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

      return json({ answer, mode, language: 'bn', provider }, 200, origin);
    } catch (error) {
      return json({ error: 'AI ব্যাকএন্ডে সমস্যা হয়েছে।', detail: String(error?.message || error) }, 500, origin);
    }
  }
};
