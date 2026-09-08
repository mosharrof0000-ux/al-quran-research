/* আল-কুরআন গবেষণা — Worker Entry Wrapper v4.2
   Research API + Gemini chat + Cloudflare AI recovery + AI Research Brain.
   Research context is fetched internally as read-only project data before Gemini.
*/
import worker from './worker.js';
import { handleResearchApi } from './research-api.js';
import { recoverChat } from './chat-recovery.js';
import { BRAIN_VERSION, BRAIN_SYSTEM, buildBrainPrompt } from './ai-research-brain.js';
import { loadProjectContext } from './research-project-context.js';

const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
function corsHeaders(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:corsHeaders(origin)});}

async function diagnostic(request,env){
 const url=new URL(request.url);const origin=request.headers.get('Origin')||'';
 if(url.pathname!=='/diagnostic' && url.pathname!=='/diagnostic/research')return null;
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders(origin)});
 if(request.method!=='GET')return json({ok:false,error:'শুধু GET অনুরোধ গ্রহণ করা হয়।'},405,origin);
 if(url.pathname==='/diagnostic/research'){
   const surah=Number(url.searchParams.get('surah')||1);
   const ayah=Number(url.searchParams.get('ayah')||1);
   try{
     const response=await handleResearchApi(new Request(`https://research.local/api/v1/ayah/${surah}/${ayah}`,{method:'GET'}));
     const data=response?await response.json():null;
     return json({ok:Boolean(response?.ok),research_api_status:response?.status||null,requested:{surah,ayah},record_found:Boolean(response?.ok&&data&&!data.error),dataset_version:data?.dataset_version||'embedded-in-record',surah_number:data?.surah_number||null,ayah_number:data?.ayah_number||null,arabic_text:data?.arabic_text||null,analysis_status:data?.analysis_status||null,token_count:Array.isArray(data?.tokens)?data.tokens.length:null},200,origin);
   }catch(e){return json({ok:false,error:'RESEARCH_DIAGNOSTIC_FAILED',detail:String(e?.message||e).slice(0,300)},200,origin);}
 }
 const out={ok:true,service:'al-quran-research-diagnostic',worker_runtime:'reachable',brain_version:BRAIN_VERSION,research_api:'available',gemini_key_present:Boolean(env.GEMINI_API_KEY),workers_ai_binding_present:Boolean(env.AI),gemini_test:'not-run'};
 if(!env.GEMINI_API_KEY){out.ok=false;out.gemini_test='skipped-key-missing';return json(out,200,origin);}
 try{const model=env.GEMINI_MODEL||'gemini-2.5-flash';const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:'Reply with exactly: OK'}]}],generationConfig:{maxOutputTokens:8,temperature:0}})});out.gemini_model=model;out.gemini_http_status=r.status;out.gemini_test=r.ok?'success':'failed';if(!r.ok){out.ok=false;out.gemini_error=(await r.text().catch(()=>'' )).slice(0,300);}}catch(e){out.ok=false;out.gemini_test='network-error';out.gemini_error=String(e?.message||e).slice(0,300);}return json(out,200,origin);
}

function extractAyahReference(message){
 const text=String(message||'');
 if(/ফাতিহা/.test(text)&&/(?:১|1|এক)/.test(text)&&/আয়াত|আয়াত/.test(text))return [1,1];
 const m=text.match(/(?:সূরা|সুরা)\s*(\d+)\s*[:/.-]\s*(\d+)/i);
 if(m)return [Number(m[1]),Number(m[2])];
 return null;
}

async function getResearchContext(message){
 const ref=extractAyahReference(message);if(!ref)return {context:'',ref:null,used:false};
 const [surah,ayah]=ref;
 try{
   const req=new Request(`https://research.local/api/v1/ayah/${surah}/${ayah}`,{method:'GET'});
   const response=await handleResearchApi(req);
   if(!response||!response.ok)return {context:'',ref,used:false};
   const data=await response.json();
   if(!data||data.error)return {context:'',ref,used:false};
   return {context:JSON.stringify(data,null,2).slice(0,12000),ref,used:true};
 }catch{return {context:'',ref,used:false};}
}

async function directGemini(request,env,origin){
 if(request.method!=='POST'||!env.GEMINI_API_KEY)return null;let body;try{body=await request.clone().json();}catch{return null;}
 const message=String(body?.message||'').trim();if(!message)return null;
 const mode=String(body?.mode||'general');
 const research=await getResearchContext(message);
 let projectContext='';
 try{projectContext=await loadProjectContext();}catch{projectContext='';}
 const brain=buildBrainPrompt(message,research.context);
 if(research.ref&&!research.used){
   return json({answer:'এই আয়াতের জন্য প্রকল্পের Research API থেকে যাচাইযোগ্য গবেষণা-রেকর্ড পাওয়া যায়নি। তাই আমি সাধারণ তাফসির বা অনুমান দিয়ে প্রকল্পের তথ্যের বিকল্প উত্তর দিচ্ছি না। আগে Research API সংযোগ/ডেটা যাচাই করতে হবে।',mode,language:'bn',provider:'research-api',brain_version:BRAIN_VERSION,intent:brain.type,research_context_used:false,research_context_ref:`${research.ref[0]}:${research.ref[1]}`},200,origin);
 }
 const prompt=`${brain.prompt}\n\nফ্রন্টএন্ডের মোড: ${mode}\n\nপ্রকল্পের file-based read-only context:\n${projectContext}`;
 const models=[env.GEMINI_MODEL||'gemini-2.5-flash','gemini-2.5-flash-lite'].filter((v,i,a)=>a.indexOf(v)===i);
 for(const model of models){try{const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:BRAIN_SYSTEM}]},contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{maxOutputTokens:1600,temperature:0.1}})});if(!r.ok)continue;const data=await r.json();const answer=data?.candidates?.[0]?.content?.parts?.map(p=>p?.text||'').join('').trim();if(answer)return json({answer,mode,language:'bn',provider:model,brain_version:BRAIN_VERSION,intent:brain.type,research_context_used:research.used,research_context_ref:research.ref?`${research.ref[0]}:${research.ref[1]}`:null,project_context_loaded:Boolean(projectContext)},200,origin);}catch{}}
 return null;
}

export default {async fetch(request,env,ctx){const origin=request.headers.get('Origin')||'';const d=await diagnostic(request,env);if(d)return d;if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders(origin)});const research=await handleResearchApi(request);if(research)return research;const gemini=await directGemini(request,env,origin);if(gemini)return gemini;const response=await worker.fetch(request.clone(),env,ctx);if(response.status<500)return response;const recovery=await recoverChat(request.clone(),env);if(recovery)return recovery;return response;}};
