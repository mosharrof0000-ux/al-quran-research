/* Al-Quran Research — Project Agent Engine v2
   Isolated engineering agent. Reads project context, creates isolated agent/* work,
   records task identity, and writes only to safe agent branches.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000, MAX_TURNS=10, MAX_MESSAGE=10000;
const NAME_MAP=[
  ['icon','শাহীন'],['আইকন','শাহীন'],['reader','সুমন'],['কুরআন','সুমন'],
  ['chat','শামীম'],['চ্যাট','শামীম'],['ui','শামীম'],['interface','শামীম'],
  ['browser','নাঈম'],['test','নাঈম'],['verification','নাঈম'],
  ['notification','রাকিব'],['নোটিফিকেশন','রাকিব'],['data','তানভীর'],['ডেটা','তানভীর'],
  ['research','আরিফ'],['research','আরিফ'],['backend','নাবিল'],['agent','নাবিল']
];
function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function clean(v,n){return String(v||'').trim().slice(0,n);}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+/,'');
 if(!p||p.includes('..')||p.startsWith('.git/'))return false;
 if(write){
  const blocked=['.github/','database/','migrations/','validation/'];
  if(blocked.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
 }
 return true;
}
function identityFor(workType,taskId){
 const w=String(workType||'').toLowerCase();
 const found=NAME_MAP.find(([k])=>w.includes(k));
 const name=found?found[1]:'নাবিল';
 return {agent_name:name,agent_id:(name+'-'+clean(taskId,40)).replace(/[^\u0980-\u09FFA-Za-z0-9_-]/g,'-')};
}
async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
 const text=await r.text(); let data; try{data=JSON.parse(text)}catch{data={raw:text}}
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||text).slice(0,500));
 return data;
}
async function readFile(env,args){
 const path=clean(args.path,300), branch=clean(args.branch||'main',200);
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(data.type!=='file')throw new Error('এটি file নয়।');
 if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 const bin=atob(String(data.content||'').replace(/\n/g,'')); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:data.sha,size:data.size,content:new TextDecoder().decode(bytes)};
}
async function listDirectory(env,args){
 const path=clean(args.path||'',300), branch=clean(args.branch||'main',200);
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
 return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
 const q=clean(args.query,300); if(!q)throw new Error('search query প্রয়োজন।');
 const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (data.items||[]).slice(0,30).map(x=>({path:x.path,html_url:x.html_url}));
}
async function recentCommits(env,args){
 const branch=clean(args.branch||'main',200);
 const data=await gh(env,'/repos/'+repo(env)+'/commits?sha='+encodeURIComponent(branch)+'&per_page=15');
 return (data||[]).map(x=>({sha:x.sha,message:x.commit?.message||'',author:x.commit?.author?.name||'',date:x.commit?.author?.date||'',html_url:x.html_url}));
}
async function compareRefs(env,args){
 const base=clean(args.base||'main',200), head=clean(args.head,200);
 if(!head)throw new Error('head প্রয়োজন।');
 const data=await gh(env,'/repos/'+repo(env)+'/compare/'+encodeURIComponent(base)+'...'+encodeURIComponent(head));
 return {status:data.status,ahead_by:data.ahead_by,behind_by:data.behind_by,total_commits:data.total_commits,files:(data.files||[]).map(x=>({filename:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes}))};
}
async function createBranch(env,args){
 const branch=clean(args.branch,200), base=clean(args.base||'main',200);
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
 try{
  const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha}),headers:{'Content-Type':'application/json'}});
  return {branch,base,sha:created.object.sha,created:true};
 }catch(e){
  if(String(e).includes('422'))return {branch,base,sha:ref.object.sha,created:false,existing:true};
  throw e;
 }
}
async function writeFile(env,args){
 const path=clean(args.path,400), branch=clean(args.branch,200);
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক।');
 if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
 const content=String(args.content||''); if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null; try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:clean(args.message||'AI agent change',200),content:btoa(unescape(encodeURIComponent(content))),branch}; if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
async function writeTaskRecord(env,args){
 const task=clean(args.task_id,100).replace(/[^A-Za-z0-9_-]/g,'-'); if(!task)throw new Error('task_id প্রয়োজন।');
 return writeFile(env,{path:'docs/agent-ledger/TASK-'+task+'.md',branch:args.branch,content:String(args.content||''),message:'Record agent task '+task});
}
const TOOLS=[
{name:'project_read_file',description:'Read a project text file before editing.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
{name:'project_list_directory',description:'List a project directory to understand structure.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
{name:'project_search_code',description:'Search repository code for a term, identifier, error, or filename.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
{name:'project_recent_commits',description:'Read recent commit history for a branch to understand prior work and ownership.',parameters:{type:'object',properties:{branch:{type:'string'}},required:[]}},
{name:'project_compare_refs',description:'Compare an isolated branch against main or another approved ref before review.',parameters:{type:'object',properties:{base:{type:'string'},head:{type:'string'}},required:['head']}},
{name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
{name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}},
{name:'project_write_task_record',description:'Persist a task/handoff record under docs/agent-ledger on an agent branch.',parameters:{type:'object',properties:{task_id:{type:'string'},branch:{type:'string'},content:{type:'string'}},required:['task_id','branch','content']}}
];
async function executeTool(env,name,args){
 if(name==='project_read_file')return readFile(env,args); if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args); if(name==='project_recent_commits')return recentCommits(env,args);
 if(name==='project_compare_refs')return compareRefs(env,args); if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args); if(name==='project_write_task_record')return writeTaskRecord(env,args);
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,message,meta){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent v2। প্রথমে project context inspect করবে, তারপর safest isolated plan করবে। কখনো main-এ লিখবে না। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql agent write থেকে protected। কাজের শুরুতে Task ID/Agent identity বজায় রাখবে; identity না থাকলে work_type দেখে নির্ধারিত বাংলা human-like নাম ব্যবহার করবে। নতুন কাজ হলে নতুন Task ID/Agent ID/branch হবে। পুরনো অসম্পূর্ণ কাজ নিলে Parent Task ও successor history রাখবে। নতুন non-instruction file তৈরি করলে একই পরিবর্তনে sibling .instruction.md তৈরি করবে। কাজের শেষে changed files, commits, tests, blockers, remaining work এবং handoff task record সংরক্ষণ করবে। merge/deploy করতে পারো না এবং এমন দাবি করবে না। current task metadata: '+JSON.stringify(meta);
 let contents=[{role:'user',parts:[{text:message}]}];
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:5000,temperature:0.1}})});
  const data=await r.json(); if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,500));
  const mc=data?.candidates?.[0]?.content; if(!mc)throw new Error('Gemini response missing content.');
  const calls=(mc.parts||[]).filter(p=>p.functionCall); if(!calls.length)return {answer:(mc.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  contents.push(mc); const responses=[];
  for(const part of calls){let result; try{result=await executeTool(env,part.functionCall.name,part.functionCall.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}} responses.push({functionResponse:{name:part.functionCall.name,response:{result}});}
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false,capabilities:['inspect','history','compare','isolated-write','task-ledger','handoff']},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||''; if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json(); const message=String(body?.message||'').trim(); if(!message)return json({ok:false,error:'message required'},400,origin); if(message.length>MAX_MESSAGE)return json({ok:false,error:'message too large'},413,origin);
  const taskId=clean(body?.task_id,80)||('TASK-'+Date.now()); const meta={task_id:taskId,work_type:clean(body?.work_type,80)||'agent-core',...identityFor(body?.work_type,taskId),session_id:clean(body?.session_id,80)||('SESSION-'+Date.now()),parent_task_id:clean(body?.parent_task_id,80)||null,branch:clean(body?.branch,180)||null};
  const result=await gemini(env,message,meta);
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'2.0.0',isolated:true,merge:false,deploy:false,task:meta},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800)},500,origin);}
}};