/* আল-কুরআন গবেষণা — নিরাপদ Worker Entry Wrapper v1.6
   Research API + মূল AI chat + Workers AI fallback/recovery.
*/
import worker from './worker.js';
import { handleResearchApi } from './research-api.js';
import { recoverChat } from './chat-recovery.js';

const ALLOWED_ORIGINS = ['https://mosharrof0000-ux.github.io'];
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}
function json(data, status, origin) { return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) }); }

async function diagnostic(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== '/diagnostic') return null;
  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (request.method !== 'GET') return json({ ok:false, error:'শুধু GET অনুরোধ গ্রহণ করা হয়।' },405,origin);
  const out = { ok:true, service:'al-quran-research-diagnostic', worker_runtime:'reachable', gemini_key_present:Boolean(env.GEMINI_API_KEY), workers_ai_binding_present:Boolean(env.AI), gemini_test:'not-run' };
  if (!env.GEMINI_API_KEY) { out.ok=false; out.gemini_test='skipped-key-missing'; return json(out,200,origin); }
  try {
    const model=env.GEMINI_MODEL||'gemini-2.5-flash';
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:'Reply with exactly: OK'}]}],generationConfig:{maxOutputTokens:8,temperature:0}})});
    out.gemini_model=model; out.gemini_http_status=r.status; out.gemini_test=r.ok?'success':'failed';
    if(!r.ok){out.ok=false;out.gemini_error=(await r.text().catch(()=>'' )).slice(0,300);}
  } catch(e){out.ok=false;out.gemini_test='network-error';out.gemini_error=String(e?.message||e).slice(0,300);}
  return json(out,200,origin);
}

export default { async fetch(request, env, ctx) {
  const origin=request.headers.get('Origin')||'';
  const d=await diagnostic(request,env); if(d) return d;
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers:corsHeaders(origin)});
  const research=await handleResearchApi(request); if(research) return research;
  const response=await worker.fetch(request.clone(),env,ctx);
  if(response.status<500) return response;
  const recovery=await recoverChat(request.clone(),env);
  if(recovery) return recovery;
  return response;
} };