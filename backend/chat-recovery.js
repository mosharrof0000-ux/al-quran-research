/* আল-কুরআন গবেষণা — AI Chat Recovery v5.2
   মূল AI ব্যর্থ হলে সক্রিয় Cloudflare Workers AI model দিয়ে উত্তর ফেরত দেয়।
   Free-plan compatible recovery models: Gemma 4 26B A4B + GLM-4.7-Flash.
   কোনো frontend/design পরিবর্তন করা হয়নি।
   Deployment trigger: chat AI connection repair.
*/

const RECOVERY_MODELS = [
  '@cf/google/gemma-4-26b-a4b-it',
  '@cf/zai-org/glm-4.7-flash'
];

export async function recoverChat(request, env) {
  if (request.method !== 'POST' || !env.AI) return null;

  let body;
  try { body = await request.clone().json(); } catch (_) { return null; }
  const message = String(body?.message || '').trim();
  if (!message) return null;

  const mode = String(body?.mode || 'general');
  const instruction = {
    general: 'সাধারণ প্রশ্নের উত্তর দাও।',
    word: 'শব্দ গবেষণা হিসেবে মূল/ধাতু, শব্দরূপ, অর্থপরিসর, ব্যাকরণ ও নিশ্চিততার মাত্রা আলাদা করো।',
    ayah: 'আয়াত বিশ্লেষণে যাচাইযোগ্য তথ্য ছাড়া কুরআনের পাঠ বানাবে না; তথ্য না থাকলে তা স্পষ্ট বলো।',
    math: 'গাণিতিক গবেষণায় কেবল প্রদত্ত বা যাচাইযোগ্য ডেটা ব্যবহার করো এবং হিসাবের ধাপ দেখাও।',
    concordance: 'একই শব্দ অনুসন্ধানে ডেটা না থাকলে অনুমান না করে সীমাবদ্ধতা জানাও।',
    translation: 'অনুবাদ গবেষণায় আক্ষরিক অর্থ, প্রসঙ্গ ও সম্ভাব্য বাংলা রূপ আলাদা করো।'
  }[mode] || 'সাধারণ প্রশ্নের উত্তর দাও।';

  const system = `তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী। বাংলায় পরিষ্কার উত্তর দাও।
আকিদা-নিরপেক্ষ ও প্রমাণভিত্তিক থাকবে। কুরআনের আয়াত বা আরবি পাঠ অনুমান করে বানাবে না।
যাচাইযোগ্য প্রকল্প-ডেটা না থাকলে তা স্পষ্ট বলবে। AI-এর অনুমানকে যাচাই করা গবেষণা-তথ্য হিসেবে উপস্থাপন করবে না।`;

  for (const model of RECOVERY_MODELS) {
    try {
      const result = await env.AI.run(model, {
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `${instruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}` }
        ],
        max_tokens: 1600,
        temperature: 0.1
      });
      const answer = result?.response || result?.choices?.[0]?.message?.content;
      if (!answer) continue;
      return new Response(JSON.stringify({
        answer: String(answer), mode, language: 'bn',
        provider: `cloudflare-workers-ai-recovery:${model}`,
        recovery: true
      }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://mosharrof0000-ux.github.io',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json; charset=utf-8',
          'Vary': 'Origin'
        }
      });
    } catch (_) {}
  }

  return null;
}
