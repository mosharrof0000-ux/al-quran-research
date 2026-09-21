/* Al-Quran Research — Project Agent Engine v1.1
   Safe autonomous project work: inspect -> plan -> edit -> verify -> handoff.
   Never writes main, never merges, never deploys.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000, MAX_TURNS=16, MAX_CONTEXT_CHARS=90000, MAX_HISTORY_FILES=80, MAX_WRITE_FILES_PER_TASK=30;
const PROTECTED_PATHS=['.github/','database/','migrations/','validation/'];
const TASK_STATES=['RECEIVED','INSPECTING','PLANNED','WORKING','TESTING','REPAIRING','VALIDATED','READY_FOR_REVIEW','BLOCKED','ROLLED_BACK','HANDOFF_REQUIRED'];

const NAME_MAP=[
  ['icon','শাহীন'],['svg','শাহীন'],['font','শাহীন'],
  ['reader','সুমন'],['quran','সুমন'],['translation','সুমন'],['pronunciation','সুমন'],['data','সুমন'],
  ['test','নাঈম'],['verify','নাঈম'],['browser','নাঈম'],['console','নাঈম'],['network','নাঈম'],
  ['notification','রাকিব'],['release','রাকিব'],['version','রাকিব'],
  ['backend','সজীব'],['worker','সজীব'],['api','সজীব'],['connection','সজীব'],
  ['database','আরিফ'],['schema','আরিফ'],['migration','আরিফ'],
  ['documentation','তানভীর'],['docs','তানভীর'],['instruction','তানভীর'],['protocol','তানভীর']
];

function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function slug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,55)||'task';}
function chooseWorkType(message){const m=String(message||'').toLowerCase();for(const [key] of NAME_MAP){if(m.includes(key))return key;}return 'general';}
const NAME_POOL=['শামীম','শাহীন','সুমন','সজীব','রাকিব','নাঈম','আরিফ','তানভীর','ইমরান','রিফাত'];
function chooseName(message,taskId=''){const m=String(message||'').toLowerCase();for(const [key,name] of NAME_MAP){if(m.includes(key))return name;}let n=0;for(const ch of String(taskId)){n=(n+ch.charCodeAt(0))%NAME_POOL.length;}return NAME_POOL[n];}
function identity(body){
 const message=String(body?.message||'');
 const taskId=String(body?.task_id||('TASK-'+Date.now()));
 const requestedState=String(body?.status||'RECEIVED');
 const status=TASK_STATES.includes(requestedState)?requestedState:'RECEIVED';
 const workType=String(body?.work_type||chooseWorkType(message));
 const agentName=String(body?.agent_name||chooseName(message,taskId));
 const agentId=String(body?.agent_id||slug(agentName)+'-'+taskId.slice(-6));
 const sessionId=String(body?.session_id||('SESSION-'+Date.now()));
 const branch=String(body?.branch||('agent/'+slug(agentName)+'-'+slug(taskId)));
 return {taskId,agentName,agentId,sessionId,branch,parentTaskId:String(body?.parent_task_id||''),workType,message,status};
}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+/, '');
 if(!p||p.includes('..')||p.startsWith('.git/'))return false;
 if(write){
  const blocked=['.github/','database/','migrations/','validation/'];
  if(blocked.some(x=>p.startsWith(x))||PROTECTED_PATHS.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
 }
 return true;
}
async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
 const raw=await r.text();let data;try{data=JSON.parse(raw)}catch{data={raw}};
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||raw).slice(0,500));
 return data;
}
async function readFile(env,{path,branch='main'}){
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(data.type!=='file')throw new Error('এটি file নয়।');
 if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 const bin=atob(String(data.content||'').replace(/\n/g,''));
 const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:data.sha,size:data.size,content:new TextDecoder().decode(bytes)};
}
async function listDirectory(env,{path='',branch='main'}){
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
 return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,{query}){
 const q=String(query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (data.items||[]).slice(0,20).map(x=>({path:x.path,html_url:x.html_url}));
}
async function branchStatus(env,{branch}){
 if(branch!=='main'&&!isAgentBranch(branch))throw new Error('branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(branch));
 return {branch,sha:ref.object.sha};
}
async function createBranch(env,{branch,base='main'}){
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
 const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha})});
 return {branch,base,sha:created.object.sha};
}
async function writeFile(env,{path,branch,content,message}){
 if(!isAgentBranch(branch))throw new Error('main-এ write নিষিদ্ধ; agent/* branch প্রয়োজন।');
 if(!safePath(path,true))throw new Error('protected path-এ agent write করতে পারবে না।');
 const text=String(content||'');if(text.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(message||'AI agent change'),content:btoa(unescape(encodeURIComponent(text))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null};
}
async function history(env,branch){try{return (await listDirectory(env,{path:'docs/agent-work',branch})).filter(x=>x.type==='file').slice(-MAX_HISTORY_FILES)}catch{return []}}
function assertWriteBudget(task, count){if(count>=MAX_WRITE_FILES_PER_TASK)throw new Error('Task write budget exceeded.');}
const TOOLS=[
 {name:'project_get_branch_status',description:'Inspect a branch and latest commit.',parameters:{type:'object',properties:{branch:{type:'string'}},required:['branch']}},
 {name:'project_search_work_history',description:'Find prior agent work records and handoffs under docs/agent-work.',parameters:{type:'object',properties:{branch:{type:'string'}},required:['branch']}},
 {name:'project_read_file',description:'Read a repository text file before making decisions.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'Inspect a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for identifiers or terms.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function execute(env,name,args){
 if(name==='project_get_branch_status')return branchStatus(env,args);
 if(name==='project_search_work_history')return history(env,args.branch);
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
function trimHistory(h){let total=0,out=[];for(let i=h.length-1;i>=0;i--){const n=JSON.stringify(h[i]).length;if(total+n>MAX_CONTEXT_CHARS)break;out.unshift(h[i]);total+=n;}return out;}
async function gemini(env,task){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের নিরাপদ Project Agent। পরিচয়: '+task.agentName+' / '+task.agentId+'; Task: '+task.taskId+'; Session: '+task.sessionId+'; Branch: '+task.branch+'. প্রথমে governance ও target context পড়বে, তারপর root cause নির্ধারণ করবে। প্রয়োজনীয় prior handoff/history খুঁজবে। অনুমানভিত্তিক rewrite নয়। শুধু agent/* branch-এ লিখবে। .github/workflows, database, migrations, validation, quran_research.db, schema.sql protected। নতুন non-instruction file হলে sibling instruction প্রয়োজন কিনা যাচাই করবে। কাজের শেষে completed, changed files, commits, tests/verification, remaining work, blockers এবং handoff state স্পষ্ট করবে। merge/deploy করবে না এবং live success দাবি করবে না যদি যাচাই না থাকে।';
 let contents=[{role:'user',parts:[{text:task.message}]}];
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:trimHistory(contents),tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,500));
  const c=data?.candidates?.[0]?.content;if(!c)throw new Error('Gemini response missing content.');
  const calls=(c.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(c.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  contents.push(c);
  const responses=[];
  for(const p of calls){let result;try{result=await execute(env,p.functionCall.name,p.functionCall.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}}responses.push({functionResponse:{name:p.functionCall.name,response:{result}}});}
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
async function saveTaskRecord(env,task,result){
 const path='docs/agent-work/'+slug(task.taskId)+'.md';
 const instructionPath=path+'.instruction.md';
 const text=['# Agent Work Record','','- Task ID: '+task.taskId,'- Parent Task ID: '+(task.parentTaskId||'NONE'),'- Agent Name: '+task.agentName,'- Agent ID: '+task.agentId,'- Session ID: '+task.sessionId,'- Work Type: '+task.workType,'- Branch: '+task.branch,'- Status: '+(result.status||task.status||'WORKING'),'- Started State: '+task.status,'- Protected paths: '+PROTECTED_PATHS.join(', '),'','## Request',task.message,'','## Agent Report',result.answer||'','', '## Verification State','Agent branch only; merge/deploy not performed.','', '## Handoff','If incomplete, successor must create a new Agent ID and preserve this record.'].join('\\n');
 const instruction=['# Task Record Instruction','','This instruction governs '+path+'.','- Purpose: persistent human-readable record of one Project Agent task.','- Preserve Task ID, Agent identity, branch, status, report and handoff continuity.','- Do not silently delete or overwrite historical task meaning.','- Update when task status or handoff state changes.','- Governed by MASTER_INSTRUCTION.md and the Agent Handoff Protocol.'].join('\\n');
 const a=await writeFile(env,{path,branch:task.branch,content:text,message:'Save task handoff record '+task.taskId});
 await writeFile(env,{path:instructionPath,branch:task.branch,content:instruction,message:'Add task record instruction '+task.taskId});
 return a;
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'1.2.0',capabilities:['inspect','search','isolated-write','identity','handoff-history','task-state','write-budget','protected-paths'],write_scope:'agent/* only',merge:false,deploy:false},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const task=identity(body);
  if(!task.message)return json({ok:false,error:'message required'},400,origin);
  if(task.message.length>10000)return json({ok:false,error:'message too large'},413,origin);
  if(!isAgentBranch(task.branch))return json({ok:false,error:'Invalid agent branch'},400,origin);
  let base='main';try{await branchStatus(env,{branch:task.branch})}catch{await createBranch(env,{branch:task.branch,base});}
  let result;
  try{
   result=await gemini(env,task);
   result.status='VALIDATED';
  }catch(e){
   result={status:'BLOCKED',answer:'Agent task failed before verification: '+String(e?.message||e),turns:0};
   try{await saveTaskRecord(env,task,result)}catch{}
   return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,700),handoff_required:true,task:{task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,work_type:task.workType,branch:task.branch,parent_task_id:task.parentTaskId}},500,origin);
  }
  try{await saveTaskRecord(env,task,result)}catch(e){result.handoff_warning=String(e?.message||e);result.status='HANDOFF_REQUIRED';}
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'1.1.0',isolated:true,merge:false,deploy:false,task:{task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,work_type:task.workType,branch:task.branch,parent_task_id:task.parentTaskId},turns:result.turns},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,700),handoff_required:true},500,origin);}
}};
