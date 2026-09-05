/* আল-কুরআন গবেষণা — Chat Recovery v3 */
const MODEL='@cf/meta/llama-3.1-8b-instruct-fp8-fast';
export async function recoverChat(request,env){
 if(request.method!=='POST'||!env.AI)return null;
 let body;try{body=await request.clone().json();}catch(_){return null;}
 const message=String(body?.message||'').trim();if(!message)return null;
 const mode=String(body?.mode||'general');
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের বাংলা সহকারী। বাংলায় সরাসরি ব্যবহারকারীর প্রশ্নের উত্তর দাও। কুরআনের আয়াত বা আরবি পাঠ অনুমান করে বানাবে না। যাচাইযোগ্য প্রকল্প-ডেটা না থাকলে তা স্পষ্ট বলবে। আকিদা-নিরপেক্ষ ও প্রমাণভিত্তিক থাকবে।';
 const instruction=({general:'সাধারণ প্রশ্নের উত্তর দাও।',word:'শব্দ গবেষণা: মূল ধাতু, শব্দরূপ, অর্থপরিসর ও ব্যাকরণ আলাদা করো।',ayah:'আয়াত বিশ্লেষণ: যাচাইযোগ্য তথ্য ছাড়া আয়াতের পাঠ বানাবে না।',math:'গাণিতিক গবেষণা: হিসাবের ধাপ দেখাও এবং সংখ্যা অনুমান করো না।',concordance:'একই শব্দ অনুসন্ধান: প্রকল্পে তথ্য না থাকলে সীমাবদ্ধতা বলো।',translation:'অনুবাদ গবেষণা: আক্ষরিক অর্থ ও ব্যাখ্যামূলক অর্থ আলাদা করো।'}[mode]||'সাধারণ প্রশ্নের উত্তর দাও।');
 try{const result=await env.AI.run(MODEL,{messages:[{role:'system',content:system},{role:'user',content:`${instruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}`}],max_tokens:1600,temperature:0.1});const answer=result?.response||result?.choices?.[0]?.message?.content;if(!answer)return null;return new Response(JSON.stringify({answer:String(answer),mode,language:'bn',provider:'cloudflare-workers-ai-recovery-v3'}),{status:200,headers:{'Access-Control-Allow-Origin':'https://mosharrof0000-ux.github.io','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json; charset=utf-8','Vary':'Origin'}})}catch(_){return null;}
}
