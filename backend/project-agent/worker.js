/* Al-Quran Research — Autonomous Project Agent Engine v2
   Isolated by design. No merge. No production deploy. Agent work is auditable.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_MESSAGE=12000;
const MAX_TURNS=12;
const MAX_HISTORY=24;

const IDENTITY_MAP=[
 {name:'শাহীন',role:'system/architecture',keys:['system','architecture','agent','ai','engine','core','security']},
 {name:'শামীম',role:'chat/interface',keys:['chat','ui','interface','button','header','menu','icon']},
 {name:'সুমন',role:'reader/data',keys:['quran','reader','ayah','data','translation','pronunciation']},
 {name:'রাকিব',role:'automation/notification',keys:['notification','update','automation','workflow']},
 {name:'নাঈম',role:'testing/verification',keys:['test','verify','browser','console','network','visual']}
];

function now(){return new Date().toISOString();}
function stamp(){return now().replace(/[-:TZ.]/g,'').slice(0,14);}
function slug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48)||'task';}
function chooseIdentity(message){
 const s=String(message||'').toLowerCase();
 let best=IDENTITY_MAP[0],score=-1;
 for(const x of IDENTITY_MAP){const n=x.keys.reduce((a,k)=>a+(s.includes(k)?1:0),0);if(n>score){score=n;best=x;}}
 return best;
}
function makeIdentity(message){
 const x=chooseIdentity(message), ts=stamp(), taskId='TASK-'+ts+'-'+slug(x.role).toUpperCase();
 return {agent_name:x.name,agent_role:x.role,agent_id:x.name+'-'+ts,task_id:taskId,session_id:'SESSION-'+ts,created_at:now()};
}
function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+/,'');
 if(!p||p.includes('..')||p.startsWith('.git/'))return false;
 if(write){
  const blocked=['.github/workflows/','database/','migrations/','validation/'];
  if(blocked.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
 }
 return true;
}
async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent-v2',...(init.headers||{})}});
 const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={raw:t}};
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(d?.message||t).slice(0,600));
 return d;
}
async function readFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||'main');
 if(!safePath(path))throw new Error('অনুমোদিত নয় এমন path।');
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(d.type!=='file')throw new Error('এটি file নয়।');
 if(Number(d.size||0)>MAX_FILE)throw new Error('ফাইলটি সীমার চেয়ে বড়।');
 const bin=atob(String(d.content||'').replace(/\n/g,''));const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:d.sha,size:d.size,content:new TextDecoder().decode(bytes)};
}
async function listDirectory(env,args){
 const path=String(args.path||''),branch=String(args.branch||'main');
 if(!safePath(path))throw new Error('অনুমোদিত নয় এমন path।');
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(d))throw new Error('Directory পাওয়া যায়নি।');
 return d.slice(0,200).map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
 const q=String(args.query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const d=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (d.items||[]).slice(0,30).map(x=>({path:x.path,html_url:x.html_url}));
}
async function branches(env,args){
 const q=String(args.query||'agent'),d=await gh(env,'/repos/'+repo(env)+'/branches?per_page=100');
 return d.filter(x=>String(x.name).includes(q)).map(x=>x.name).slice(0,100);
}
async function compare(env,args){
 const base=String(args.base||'main'),head=String(args.head||'');
 if(!head)throw new Error('head branch/ref প্রয়োজন।');
 const d=await gh(env,'/repos/'+repo(env)+'/compare/'+encodeURIComponent(base)+'...'+encodeURIComponent(head));
 return {status:d.status,ahead_by:d.ahead_by,behind_by:d.behind_by,total_commits:d.total_commits,files:(d.files||[]).map(x=>({filename:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes})).slice(0,100)};
}
async function commitInfo(env,args){
 const ref=String(args.ref||'main');
 const d=await gh(env,'/repos/'+repo(env)+'/commits/'+encodeURIComponent(ref));
 return {sha:d.sha,message:d.commit?.message||'',author:d.commit?.author||null,html_url:d.html_url};
}
async function createBranch(env,args){
 const branch=String(args.branch||''),base=String(args.base||'main');
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
 const d=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha})});
 return {branch,base,sha:d.object.sha};
}
async function writeFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||''),content=String(args.content||'');
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক।');
 if(!safePath(path,true))throw new Error('protected path।');
 if(content.length>MAX_FILE)throw new Error('ফাইলটি সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(args.message||'Agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 return {path,branch,created:!existing?.sha,commit_sha:d.commit?.sha||null,blob_sha:d.content?.sha||null};
}
const TOOLS=[
 {name:'project_read_file',description:'Read the exact current file before changing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'Inspect a project directory before deciding scope.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:[]}},
 {name:'project_search_code',description:'Search code/config/docs for identifiers, behavior or errors.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_list_agent_branches',description:'Inspect prior agent branches and avoid duplicating/inheriting work silently.',parameters:{type:'object',properties:{query:{type:'string'}},required:[]}},
 {name:'project_compare_refs',description:'Compare a branch/ref with main to understand exact changes and staleness.',parameters:{type:'object',properties:{base:{type:'string'},head:{type:'string'}},required:['head']}},
 {name:'project_get_commit',description:'Read commit metadata before relying on history.',parameters:{type:'object',properties:{ref:{type:'string'}},required:['ref']}},
 {name:'project_create_branch',description:'Create an isolated agent/* task branch from main or an agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function executeTool(env,name,args){
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_list_agent_branches')return branches(env,args);
 if(name==='project_compare_refs')return compare(env,args);
 if(name==='project_get_commit')return commitInfo(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
async function runGemini(env,history,id){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system=`তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent। বর্তমান identity: ${id.agent_name}; Agent ID: ${id.agent_id}; Task ID: ${id.task_id}; Session ID: ${id.session_id}.
প্রথমে governance/context পড়বে এবং আগের agent work inspect করবে। তারপর root cause ভিত্তিক পরিকল্পনা করবে। অনুমান করে rewrite করবে না। নতুন কাজের জন্য isolated agent/* branch তৈরি/ব্যবহার করবে। main-এ write, merge বা production deploy করা নিষিদ্ধ।
প্রতিটি task-এ audit trail রাখবে: requester command, identity, parent/inherited task, inspected files/branches, changed files, commit(s), tests, failures, repairs, current status, remaining work, successor/handoff।
নতুন non-instruction file হলে applicable instruction artifact-এর নিয়ম মানবে। Production/live claim কেবল বাস্তব verification-এর পরে। কাজ অসম্পূর্ণ হলে HANDOFF_REQUIRED সহ স্পষ্ট next action দেবে।
তুমি মানুষের মতো সিদ্ধান্ত চাপিয়ে দেবে না; project safety ও user instruction-এর মধ্যে থেকে factual engineering action নেবে।`;
 let contents=history.slice(-MAX_HISTORY), last=[];
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const d=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(d?.error?.message||'').slice(0,500));
  const mc=d?.candidates?.[0]?.content;if(!mc)throw new Error('Gemini response missing content.');
  const calls=(mc.parts||[]).filter(p=>p.functionCall);
  contents.push(mc);
  if(!calls.length)return {answer:(mc.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  const responses=[];
  for(const p of calls){
   let result;try{result=await executeTool(env,p.functionCall.name,p.functionCall.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}}
   last.push({tool:p.functionCall.name,ok:result?.ok!==false});
   responses.push({functionResponse:{name:p.functionCall.name,response:{result}}});
  }
  contents.push({role:'user',parts:responses});
 }
 return {answer:'TOOL_LOOP_LIMIT: কাজটি নিরাপদভাবে শেষ করার জন্য আরও একটি session প্রয়োজন। HANDOFF_REQUIRED.',model,turns:MAX_TURNS,tool_trace:last};
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',capabilities:['identity','task-tracking','history-inspection','safe-branch-write','bounded-tool-loop'],write_scope:'agent/* only',merge:false,deploy:false},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>MAX_MESSAGE)return json({ok:false,error:'message too large'},413,origin);
  const id=makeIdentity(message);
  const parent_task_id=String(body?.parent_task_id||'');
  const result=await runGemini(env,[{role:'user',parts:[{text:JSON.stringify({command:message,task_identity:id,parent_task_id,required:'Inspect → plan → safe branch → minimal change → verify → report/handoff'})}]}],id);
  return json({ok:true,answer:result.answer,agent_identity:id,parent_task_id:parent_task_id||null,agent_version:env.AGENT_VERSION||'2.0.0',isolated:true,merge:false,deploy:false,turns:result.turns,tool_trace:result.tool_trace||[]},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800),isolated:true,merge:false,deploy:false},500,origin);}
}};
