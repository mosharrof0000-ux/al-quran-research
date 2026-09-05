/* আল-কুরআন গবেষণা — AI rescue entry v1.2
   বর্তমান worker.js, Research API ও website design অপরিবর্তিত রেখে
   chat POST ব্যর্থ হলে দ্বিতীয় AI পথ চালু করে।
*/
import worker from './worker.js';
import { handleResearchApi } from './research-api.js';

const ALLOWED_ORIGINS = ['https://mosharrof0000-ux.github.io'];
const SYSTEM = `তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী।
আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক থাকবে।
কুরআনের আয়াত/আরবি পাঠ অনুমান করে বানাবে না। যাচাইযোগ্য প্রকল্প-ডেটা না থাকলে তা স্পষ্ট বলবে।
AI-এর তৈরি তথ্য স্বয়ংক্রিয়ভাবে verified নয়। Root, morphology, grammar বা অর্থে মতভেদ থাকলে অনিশ্চিত/বিতর্কিত হিসেবে দেখাবে।
ব্যবহারকারী বাংলা ভাষায় উত্তর চান।`;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}
function textFromInteraction(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  const output = Array.isArray(data?.output) ? data.output : [];
  const parts = [];
  for (const item of output) {
    if (typeof item?.text === 'string') parts.push(item.text);
    for (const part of (item?.content || [])) if (typeof part?.text === 'string') parts.push(part.text);
  }
  return parts.join('').trim();
}

async function geminiRescue(prompt, env) {
  if (!env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY সেট করা নেই।');
  const model = env.GEMINI_MODEL || 'gemini-3.8-flash';
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({
      model,
      input: `${SYSTEM}\n\n${prompt}`
    })
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`${model} HTTP ${response.status}: ${raw.slice(0, 300)}`);
  const data = JSON.parse(raw);
  const answer = textFromInteraction(data);
  if (!answer) throw new Error(`${model} কোনো উত্তর দেয়নি।`);
  return { answer, provider: model };
}

async function cloudflareRescue(prompt, env) {
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
  return { answer, provider: 'cloudflare-ai:llama-3.1-8b-instruct-fast' };
}

async function rescueChat(request, env) {
  const body = await request.json();
  const message = String(body?.message || '').trim();
  const mode = String(body?.mode || 'general');
  if (!message) return json({ error: 'প্রশ্নটি খালি।' }, 400, request.headers.get('Origin') || '');
  if (message.length > 6000) return json({ error: 'প্রশ্নটি খুব বড়।' }, 413, request.headers.get('Origin') || '');
  const instruction = {
    general: 'সাধারণ প্রশ্নের উত্তর দাও।',
    word: 'শব্দ গবেষণায় Root/মূল ধাতু, morphology, grammar, আক্ষরিক অর্থ ও নিশ্চিততার মাত্রা আলাদা করো।',
    ayah: 'আয়াত বিশ্লেষণে যাচাইযোগ্য পাঠ ছাড়া আরবি আয়াত বানাবে না; ভাষাগত বিশ্লেষণ দাও।',
    math: 'গাণিতিক গবেষণায় সূত্র, ডেটা ও হিসাবের ধাপ স্পষ্ট রাখো।',
    concordance: 'একই শব্দের অনুসন্ধানে যাচাইযোগ্য অবস্থান ছাড়া সংখ্যা বা তালিকা বানাবে না।',
    translation: 'অনুবাদ গবেষণায় আক্ষরিক ও ব্যাখ্যামূলক অর্থ আলাদা করে তুলনা করো।'
  }[mode] || 'সাধারণ প্রশ্নের উত্তর দাও।';
  const prompt = `${instruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}`;
  try { return json(await geminiRescue(prompt, env), 200, request.headers.get('Origin') || ''); }
  catch (geminiError) {
    try { return json(await cloudflareRescue(prompt, env), 200, request.headers.get('Origin') || ''); }
    catch (cloudflareError) {
      return json({ error: 'AI ব্যাকএন্ডে সমস্যা হয়েছে।', detail: `Gemini: ${String(geminiError?.message || geminiError)}; Cloudflare AI: ${String(cloudflareError?.message || cloudflareError)}` }, 500, request.headers.get('Origin') || '');
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
    const researchResponse = await handleResearchApi(request);
    if (researchResponse) return researchResponse;

    // প্রথমে বর্তমান production worker-ই চালানো হবে—এতে verified Fatiha logic অক্ষুণ্ণ থাকে।
    const response = await worker.fetch(request.clone(), env, ctx);
    if (response.ok || request.method !== 'POST') return response;

    // পুরোনো provider/backend ব্যর্থ হলে rescue AI দিয়ে উত্তর দেওয়ার দ্বিতীয় পথ।
    try {
      return await rescueChat(request.clone(), env);
    } catch (error) {
      return json({ error: 'চ্যাট অনুরোধ প্রক্রিয়া করা যায়নি।', detail: String(error?.message || error) }, 500, origin);
    }
  }
};
