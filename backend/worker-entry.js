/* আল-কুরআন গবেষণা — Worker Entry Wrapper v1.9
   Research API + Gemini chat + Cloudflare AI recovery.
   chat.html / website design অপরিবর্তিত রাখা হয়েছে।
   Deployment trigger: latest chat connection.
*/
import worker from './worker.js';
import { handleResearchApi } from './research-api.js';
import { recoverChat } from './chat-recovery.js';

const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
function corsHeaders(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:corsHeaders(origin)});}

async function diagnostic(request,env){
 const url=new URL(request.url);if(url.pathname!=='/diagnostic')return null;const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders(origin)});
 if(request.method!=='GET')return json({ok:false,error:'শুধু GET অনুরোধ গ্রহণ করা হয়।'},405,origin);
 const out={ok:true,service:'al-quran-research-diagnostic',worker_runtime:'reachable',gemini_key_present:Boolean(env.GEMINI_API_KEY),workers_ai_binding_present:Boolean(env.AI),gemini_test:'not-run'};
 if(!env.GEMINI_API_KEY){out.ok=false;out.gemini_test='skipped-key-missing';return json(out,200,origin);}
 try{const model=env.GEMINI_MODEL||'gemini-2.5-flash';const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:'Reply with exactly: OK'}]}],generationConfig:{maxOutputTokens:8,temperature:0}})});out.gemini_model=model;out.gemini_http_status=r.status;out.gemini_test=r.ok?'success':'failed';if(!r.ok){out.ok=false;out.gemini_error=(await r.text().catch(()=>'' )).slice(0,300);}}catch(e){out.ok=false;out.gemini_test='network-error';out.gemini_error=String(e?.message||e).slice(0,300);}return json(out,200,origin);
}

async function directGemini(request,env,origin){
 if(request.method!=='POST'||!env.GEMINI_API_KEY)return null;let body;try{body=await request.clone().json();}catch{return null;}
 const message=String(body?.message||'').trim();if(!message)return null;const mode=String(body?.mode||'general');
 const instruction=({general:'সাধারণ প্রশ্নের উত্তর দাও।',word:'শব্দ গবেষণা: মূল/ধাতু, শব্দরূপ, অর্থপরিসর, ব্যাকরণ ও নিশ্চিততার মাত্রা আলাদা করো।',ayah:'আয়াত বিশ্লেষণ: যাচাইযোগ্য তথ্য ছাড়া কুরআনের পাঠ বানাবে না।',math:'গাণিতিক গবেষণা: প্রদত্ত বা যাচাইযোগ্য ডেটা ও হিসাবের ধাপ ব্যবহার করো।',concordance:'একই শব্দ অনুসন্ধান: যাচাইযোগ্য ডেটা না থাকলে সংখ্যা বা তালিকা বানাবে না।',translation:'অনুবাদ গবেষণা: আক্ষরিক অর্থ, প্রসঙ্গ ও সম্ভাব্য বাংলা রূপ আলাদা করো।'})[mode]||'সাধারণ প্রশ্নের উত্তর দাও।';
 const system=`তুমি “আল-কুরআন গবেষণা” প্রকল্পের বাংলা গবেষণা সহকারী। বাংলায় পরিষ্কার উত্তর দাও। কুরআনের আয়াত বা আরবি পাঠ অনুমান করে বানাবে না। যাচাইযোগ্য প্রকল্প-ডেটা না থাকলে তা স্পষ্ট বলবে। আকিদা-নিরপেক্ষ, ভাষাতাত্ত্বিক ও প্রমাণভিত্তিক থাকবে। AI-এর তৈরি তথ্য স্বয়ংক্রিয়ভাবে verified নয়.`;
 const models=[env.GEMINI_MODEL||'gemini-2.5-flash','gemini-2.5-flash-lite'].filter((v,i,a)=>a.indexOf(v)===i);
 for(const model of models){try{const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:`${instruction}\n\nব্যবহারকারীর প্রশ্ন:\n${message}`}]}],generationConfig:{maxOutputTokens:1600,temperature:0.1}})});if(!r.ok)continue;const data=await r.json();const answer=data?.candidates?.[0]?.content?.parts?.map(p=>p?.text||'').join('').trim();if(answer)return json({answer,mode,language:'bn',provider:model},200,origin);}catch{}}
 return null;
}

export default {async fetch(request,env,ctx){const origin=request.headers.get('Origin')||'';const d=await diagnostic(request,env);if(d)return d;if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders(origin)});const research=await handleResearchApi(request);if(research)return research;const gemini=await directGemini(request,env,origin);if(gemini)return gemini;const response=await worker.fetch(request.clone(),env,ctx);if(response.status<500)return response;const recovery=await recoverChat(request.clone(),env);if(recovery)return recovery;return response;}};
