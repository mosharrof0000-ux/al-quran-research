/* Al-Quran Research — Isolated Project Agent Engine v1.1
   Duplicate-safe, resumable, isolated Project Agent.
   Never writes main, never merges, never deploys production.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=8;
const DEFAULT_ACTIVE_WINDOW_MS=2*60*60*1000;
const DEFAULT_SAME_FAILURE_LIMIT=3;
const VERIFIER_MODEL='gemini-2.5-flash';
const DEFAULT_MAX_ACTIVE_MS=2*60*60*1000;
const DEFAULT_MAX_SAME_FAILURES=3;

function cors(origin){
  return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Authorization',
    'Content-Type':'application/json; charset=utf-8','Vary':'Origin'};
}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function safePath(path,write=false){
  const p=String(path||'').replace(/^\/+?/,'');
  if(!p||p.includes('..')||p.startsWith('.git/'))return false;
  if(write){
    const blocked=['.github/','database/','migrations/','validation/'];
    if(blocked.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
  }
  return true;
}
async function gh(env,path,init={}){
  if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
  const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
  const text=await r.text(); let data; try{data=JSON.parse(text)}catch{data={raw:text}}
  if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||text).slice(0,500));
  return data;
}
function encPath(path){return path.split('/').map(encodeURIComponent).join('/');}
async function readFile(env,args){
  const path=String(args.path||''),branch=String(args.branch||'main');
  if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch));
  if(data.type!=='file')throw new Error('এটি file নয়।');
  if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
  const bin=atob(String(data.content||'').replace(/\n/g,''));
  const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
  const decoded=new TextDecoder().decode(bytes);
  return {path,branch,sha:data.sha,size:data.size,content:decoded};
}
async function listDirectory(env,args){
  const path=String(args.path||''),branch=String(args.branch||'main');
  if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch));
  if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
  return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
  const q=String(args.query||'').trim(); if(!q)throw new Error('search query প্রয়োজন।');
  const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
  return (data.items||[]).slice(0,20).map(x=>({path:x.path,html_url:x.html_url}));
}
async function createBranch(env,args){
  const branch=String(args.branch||''),base=String(args.base||'main');
  if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
  if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
  try{
    const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
    const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha}),headers:{'Content-Type':'application/json'}});
    return {branch,base,sha:created.object.sha,created:true};
  }catch(e){
    if(String(e.message||'').includes('Reference already exists'))return {branch,base,created:false,already_exists:true};
    throw e;
  }
}
async function writeFile(env,args){
  const path=String(args.path||''),branch=String(args.branch||'');
  if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক। main-এ লেখা নিষিদ্ধ।');
  if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
  const content=String(args.content||''); if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
  let existing=null;
  try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch));}catch{}
  const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
  if(existing?.sha)payload.sha=existing.sha;
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
  return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
function activeWindowMs(env){const n=Number(env.AGENT_MAX_ACTIVE_MS||DEFAULT_ACTIVE_WINDOW_MS);return Number.isFinite(n)&&n>0?n:DEFAULT_ACTIVE_WINDOW_MS;}
function sameFailureLimit(env){const n=Number(env.AGENT_MAX_SAME_FAILURES||DEFAULT_SAME_FAILURE_LIMIT);return Number.isFinite(n)&&n>0?n:DEFAULT_SAME_FAILURE_LIMIT;}
function nowIso(){return new Date().toISOString();}
function taskFailureKey(error){return String(error||'unknown').toLowerCase().replace(/\d+/g,'#').replace(/\s+/g,' ').slice(0,240);}
function ensureActiveWindow(task){const deadline=Date.parse(String(task?.deadline_at||''));if(Number.isFinite(deadline)&&Date.now()>=deadline){const e=new Error('ACTIVE_TIME_LIMIT_REACHED');e.code='TIME_LIMIT_REACHED';throw e;}}
async function persistTask(env,task,patch={}){
  const branch=task.branch||'';
  if(!isAgentBranch(branch))return {persisted:false,error:'task branch missing'};
  const record={...task,...patch,updated_at:new Date().toISOString()};
  return writeFile(env,{path:'docs/agent-work/runtime/'+task.task_id+'.json',branch,content:JSON.stringify(record,null,2)+'\n',message:'Persist Project Agent task state '+task.task_id});
}
async function loadTask(env,taskId,branch){
  if(!taskId||!isAgentBranch(branch))return null;
  try{return JSON.parse((await readFile(env,{path:'docs/agent-work/runtime/'+taskId+'.json',branch})).content);}catch{return null;}
}
function maxActiveMs(env){
  const n=Number(env.AGENT_MAX_ACTIVE_MS||DEFAULT_MAX_ACTIVE_MS);
  return Number.isFinite(n)&&n>0?n:DEFAULT_MAX_ACTIVE_MS;
}
function maxSameFailures(env){
  const n=Number(env.AGENT_MAX_SAME_FAILURES||DEFAULT_MAX_SAME_FAILURES);
  return Number.isFinite(n)&&n>0?Math.floor(n):DEFAULT_MAX_SAME_FAILURES;
}
function newActiveWindow(env){
  const started=Date.now();
  return {started_at:new Date(started).toISOString(),deadline_at:new Date(started+maxActiveMs(env)).toISOString()};
}
function checkTimeLimit(deadlineMs){
  if(Date.now()>deadlineMs){
    const e=new Error('ACTIVE_TIME_LIMIT_REACHED');
    e.code='ACTIVE_TIME_LIMIT_REACHED';
    throw e;
  }
}
function normalizeCommand(message){return String(message||'').trim().toLowerCase().replace(/[\s\u200b]+/g,' ').replace(/[.!?。！？]+$/,'');}
async function fingerprint(message){
  const data=new TextEncoder().encode(normalizeCommand(message));
  const digest=await crypto.subtle.digest('SHA-256',data);
  return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('').slice(0,20);
}
const AGENT_NAMES={chat_ui:['শামীম','রাকিব'],icon_visual:['শাহীন','তানভীর'],reader_data:['সুমন','মাহিন'],notification:['রাকিব','নাঈম'],browser_qa:['নাঈম','আরিফ'],architecture_security:['আরিফ','সাইফ'],data_mapping:['মাহিন','সুমন'],general:['শামীম','সুমন','শাহীন','নাঈম','আরিফ']};
function slug(s){return String(s||'general').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'general';}
function classifyWork(message){
  const m=String(message||'').toLowerCase();
  if(/আইকন|icon|visual|css|style/.test(m))return 'icon_visual';
  if(/reader|কুরআন পাঠ|আয়াত|ডেটা|data/.test(m))return 'reader_data';
  if(/notification|নোটিফিকেশন|update|আপডেট/.test(m))return 'notification';
  if(/browser|test|পরীক্ষা|qa/.test(m))return 'browser_qa';
  if(/security|নিরাপত্তা|architecture|স্থাপত্য/.test(m))return 'architecture_security';
  if(/mapping|ম্যাপিং/.test(m))return 'data_mapping';
  if(/chat|চ্যাট|ui|interface/.test(m))return 'chat_ui';
  return 'general';
}
async function makeIdentity(message,provided={}){
  const work=classifyWork(message);
  const name=provided.agent_name_bn||AGENT_NAMES[work]?.[0]||AGENT_NAMES.general[0];
  const fp=await fingerprint(message);
  const taskId=String(provided.task_id||'TASK-'+fp);
  const agentId=String(provided.agent_id||'AG-'+slug(name)+'-'+work+'-'+fp.slice(0,10));
  const branch=String(provided.branch||'agent/'+slug(name)+'-'+work+'-'+fp.slice(0,12));
  const session=String(provided.session_id||'SESSION-'+fp);
  if(!isAgentBranch(branch))throw new Error('Invalid agent branch.');
  return {task_id:taskId,agent_name_bn:name,agent_id:agentId,work_type:work,session_id:session,branch,fingerprint:fp};
}
const TOOLS=[
 {name:'project_read_file',description:'Read a text file from the Quran Research repository before analyzing or editing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'List files in a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for a term or identifier.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function executeTool(env,name,args){
  if(name==='project_read_file')return readFile(env,args);
  if(name==='project_list_directory')return listDirectory(env,args);
  if(name==='project_search_code')return searchCode(env,args);
  if(name==='project_create_branch')return createBranch(env,args);
  if(name==='project_write_file')return writeFile(env,args);
  throw new Error('Unknown tool: '+name);
}
async function independentVerify(env,identity,answer){
  if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
  if(!isAgentBranch(identity.branch))return {status:'FAILED',reasons:['agent branch invalid']};
  const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(identity.branch));
  const compare=await gh(env,'/repos/'+repo(env)+'/compare/main...'+encodeURIComponent(identity.branch));
  const files=(compare.files||[]).map(x=>x.filename);
  const blocked=['.github/','database/','migrations/','validation/','quran_research.db','schema.sql'];
  const protectedTouched=files.filter(p=>blocked.some(x=>p===x||p.startsWith(x)));
  const journal=await loadTask(env,identity.task_id,identity.branch);
  const evidence={identity:{task_id:identity.task_id,agent_id:identity.agent_id,branch:identity.branch},branch_sha:ref.object?.sha||null,files,protected_touched:protectedTouched,journal_state:journal?.state||null,answer:String(answer||'').slice(0,6000)};
  const prompt='তুমি Independent Verification Agent। Primary agent-এর সিদ্ধান্ত বিশ্বাস করবে না। Evidence স্বাধীনভাবে পরীক্ষা করো। যাচাই করো: task identity, agent/* branch, protected path, task journal এবং কাজের প্রমাণ। শুধু JSON দাও: {"status":"VERIFIED"|"FAILED"|"REQUIRES_REVIEW","reasons":["..."]}. অনিশ্চয়তা থাকলে VERIFIED দেবে না।';
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+VERIFIER_MODEL+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:prompt}]},contents:[{role:'user',parts:[{text:JSON.stringify(evidence)}]}],generationConfig:{maxOutputTokens:1200,temperature:0}})});
  const data=await r.json(); if(!r.ok)throw new Error('Verifier Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
  const raw=(data?.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();
  let parsed; try{parsed=JSON.parse(raw.replace(/^```json\s*|\s*```$/g,''));}catch{parsed={status:'REQUIRES_REVIEW',reasons:['Verifier returned non-JSON output.']};}
  if(protectedTouched.length)parsed={status:'FAILED',reasons:['Protected path touched: '+protectedTouched.join(', ')]};
  if(!journal)parsed={status:'REQUIRES_REVIEW',reasons:['Task journal missing on isolated branch.']};
  if(!['VERIFIED','FAILED','REQUIRES_REVIEW'].includes(parsed.status))parsed.status='REQUIRES_REVIEW';
  return {status:parsed.status,reasons:Array.isArray(parsed.reasons)?parsed.reasons.slice(0,8):[],files,branch_sha:ref.object?.sha||null};
}
async function gemini(env,history,context,deadlineMs,maxFailures){
  if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
  const model=env.GEMINI_MODEL||'gemini-2.5-flash';
  const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Project Agent। প্রথমে প্রকল্পের প্রয়োজনীয় ফাইল পড়বে। কখনো main-এ লিখবে না; শুধু নির্ধারিত agent/* branch-এ লিখবে। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql পরিবর্তন করবে না। কাজের আগে বিদ্যমান কাজ, task state এবং বর্তমান branch বুঝবে। একই task পুনরায় এলে নতুন পরিবর্তন না করে আগের state থেকে resume করবে। কাজ ইতিমধ্যে সম্পন্ন হলে DUPLICATE হিসেবে চিহ্নিত করবে। কোনো tool error পেলে কারণ বুঝে নিরাপদভাবে arguments/path/branch ঠিক করে সীমিত retry করবে; একই ভুল অনন্তবার করবে না। destructive বা অস্পষ্ট পরিবর্তন অনুমান করে করবে না। শেষে কী পড়েছ, কী পরিবর্তন করেছ, branch/commit এবং approval/deployment অবস্থা বাংলায় জানাবে। Merge বা production deploy করতে পারো না।';
  let contents=history.slice();
  const repairBudget=new Map();
  for(let turn=0;turn<MAX_TURNS;turn++){
    ensureActiveWindow(task);
    task.last_activity_at=nowIso();
    if(checkpoint) await checkpoint({last_activity_at:task.last_activity_at});
    checkTimeLimit(deadlineMs);
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:context}]},...contents],tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
    const data=await r.json(); if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
    const modelContent=data?.candidates?.[0]?.content; if(!modelContent)throw new Error('Gemini response missing content.');
    const calls=(modelContent.parts||[]).filter(p=>p.functionCall);
    if(!calls.length)return {answer:(modelContent.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
    contents.push(modelContent);
    const responses=[];
    for(const part of calls){
      checkTimeLimit(deadlineMs);
      const fc=part.functionCall;
      const key=fc.name+':'+JSON.stringify(fc.args||{});
      let result;
      try{result=await executeTool(env,fc.name,fc.args||{}); repairBudget.delete(key);}
      catch(e){
        const attempts=Number(repairBudget.get(key)||0);
        if(attempts<maxFailures){
          repairBudget.set(key,attempts+1);
          result={ok:false,error:String(e?.message||e),repair_attempt:attempts+1,repair_instruction:'এই tool call ব্যর্থ হয়েছে। কারণটি বিশ্লেষণ করে নিরাপদভাবে arguments/path/branch ঠিক করে পুনরায় চেষ্টা করো। একই ভুল পুনরাবৃত্তি করো না।'};
        }else{
          result={ok:false,error:String(e?.message||e),repair_attempts_exhausted:true,repair_instruction:'এই operation বারবার ব্যর্থ হয়েছে। আর retry না করে কাজটিকে BLOCKED হিসেবে রিপোর্ট করো এবং কী যাচাই করা দরকার তা জানাও.'};
        }
      }
      responses.push({functionResponse:{name:fc.name,response:{result}}});
    }
    contents.push({role:'user',parts:responses});
  }
  throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
  const origin=request.headers.get('Origin')||'';
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
  if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'1.2.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false},200,origin);
  if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
  const auth=request.headers.get('Authorization')||'';
  if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
  let identity=null;
  let activeTask=null;
  try{
    const body=await request.json();
    const message=String(body?.message||'').trim();
    if(!message)return json({ok:false,error:'message required'},400,origin);
    if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
    identity=await makeIdentity(message,body||{});
    await createBranch(env,{branch:identity.branch,base:'main'});
    let prior=await loadTask(env,identity.task_id,identity.branch);
    if(prior && prior.state==='HANDOFF_COMPLETE'){
      return json({ok:true,duplicate:true,resumed:false,answer:'এই কাজটি ইতিমধ্যে সম্পন্ন হয়েছে; একই Task আবার প্রয়োগ করা হয়নি।',provider:'task-registry',agent_version:env.AGENT_VERSION||'1.1.0',isolated:true,merge:false,deploy:false,identity:{...identity,task_state:'DUPLICATE',resume_count:Number(prior.resume_count||0),last_commit:prior.last_commit||null}},200,origin);
    }
    const resumeCount=Number(prior?.resume_count||0)+(prior?1:0);
    const window=newActiveWindow(env);
    await persistTask(env,identity,{state:prior?'RESUMING':'RECEIVED',resume_count:resumeCount,last_commit:prior?.last_commit||null,started_at:window.started_at,deadline_at:window.deadline_at,max_active_ms:maxActiveMs(env),max_same_failures:maxSameFailures(env),timeout_policy:'TIME_LIMIT_REACHED -> CHECKPOINTED -> WAITING_FOR_RECOVERY'});
    const context='TASK CONTEXT\\n'+JSON.stringify({identity,previous_state:prior||null,rule:'If previous state is incomplete, resume from last verified step. Do not repeat already committed changes.'})+'\\nUSER COMMAND\\n'+message;
    let result;
    try{
      result=await gemini(env,[{role:'user',parts:[{text:message}]}],context,Date.parse(window.deadline_at),maxSameFailures(env));
    }catch(e){
      if(e?.code==='ACTIVE_TIME_LIMIT_REACHED'){
        await persistTask(env,identity,{state:'WAITING_FOR_RECOVERY',timeout_state:'TIME_LIMIT_REACHED',resume_count:resumeCount,last_commit:prior?.last_commit||null,started_at:window.started_at,deadline_at:window.deadline_at,error:'Active execution window exceeded; checkpoint preserved for a later resume.',resumable:true});
      }else{
        await persistTask(env,identity,{state:'BLOCKED',error:String(e?.message||e).slice(0,600),resume_count:resumeCount});
      }
      throw e;
    }
    checkTimeLimit(Date.parse(window.deadline_at));
    ensureActiveWindow(task);
    const verification=await independentVerify(env,identity,result.answer);
    const verified=verification.status==='VERIFIED';
    const finalState={...task,state:verified?'HANDOFF_COMPLETE':'READY_FOR_REVIEW',verification_status:verification.status,verification_reasons:verification.reasons,resume_count:resumeCount,last_commit:null,answer:result.answer,provider:result.model,notification:verified?'COMPLETED':'READY_FOR_REVIEW',resume_available:!verified};
    const persisted=await persistTask(env,identity,finalState);
    return json({ok:verified,duplicate:false,resumed:Boolean(prior),answer:result.answer,provider:result.model,verification,agent_version:env.AGENT_VERSION||'1.2.0',isolated:true,merge:false,deploy:false,time_policy:{max_active_ms:maxActiveMs(env),max_same_failures:maxSameFailures(env),active_window_started_at:window.started_at,active_window_deadline_at:window.deadline_at},identity:{...identity,task_state:verified?'HANDOFF_COMPLETE':'READY_FOR_REVIEW',resume_count:resumeCount,persisted:Boolean(persisted?.commit_sha),last_commit:persisted?.commit_sha||null},notification:verified?'COMPLETED':'READY_FOR_REVIEW',resume_available:!verified},verified?200:409,origin);
  }catch(e){
    const timedOut=e?.code==='ACTIVE_TIME_LIMIT_REACHED';
    return json({ok:false,error:timedOut?'TIME_LIMIT_REACHED':'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600),resumable:timedOut,identity:identity?{...identity,task_state:timedOut?'WAITING_FOR_RECOVERY':'BLOCKED'}:null},timedOut?408:500,origin);
  }
}};
