/* Al-Quran Research — Project Agent Engine v2
   Agent identity, task ledger, isolated branch, tool audit and handoff aware.
   Production merge/deploy remains outside this Worker.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_MESSAGE=10000;
const MAX_TURNS=12;
const MODEL_DEFAULT='gemini-2.5-flash';
const NAMES=[
  {keys:['icon','আইকন','icon system'],name:'শাহীন'},
  {keys:['chat','চ্যাট','ui','interface','header'],name:'শামীম'},
  {keys:['reader','কুরআন','সূরা','আয়াত','ayah','quran'],name:'সুমন'},
  {keys:['notification','নোটিফিকেশন','update','version'],name:'রাকিব'},
  {keys:['test','browser','visual','console','network','পরীক্ষা'],name:'নাঈম'},
  {keys:['data','database','ডেটা','dataset'],name:'রিফাত'},
  {keys:['security','নিরাপত্তা','auth','token'],name:'তানভীর'},
  {keys:['documentation','docs','নির্দেশিকা','handoff'],name:'আরিফ'}
];

function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
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
function now(){return new Date().toISOString();}
function slug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,36)||'task';}
function chooseAgent(message){
 const m=String(message||'').toLowerCase();
 for(const x of NAMES)if(x.keys.some(k=>m.includes(k.toLowerCase())))return x.name;
 return 'আরিফ';
}
function taskId(){return 'TASK-'+now().replace(/\D/g,'').slice(0,14)+'-'+crypto.randomUUID().slice(0,8);}
function agentId(name,id){return 'AG-'+name+'-'+id.replace(/^TASK-/,'');}
function branchName(name,id,message){return 'agent/'+slug(name)+'-'+slug(message).slice(0,28)+'-'+id.slice(-8).toLowerCase();}

async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
 const text=await r.text();let data;try{data=JSON.parse(text)}catch{data={raw:text}}
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||text).slice(0,500));
 return data;
}
async function readFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||'main');
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(data.type!=='file')throw new Error('এটি file নয়।');
 if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 const bin=atob(String(data.content||'').replace(/\n/g,''));
 const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:data.sha,size:data.size,content:new TextDecoder().decode(bytes)};
}
async function listDirectory(env,args){
 const path=String(args.path||''),branch=String(args.branch||'main');
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
 return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
 const q=String(args.query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (data.items||[]).slice(0,20).map(x=>({path:x.path,html_url:x.html_url}));
}
async function createBranch(env,args){
 const branch=String(args.branch||''),base=String(args.base||'main');
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
 const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha}),headers:{'Content-Type':'application/json'}});
 return {branch,base,sha:created.object.sha};
}
async function writeFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||'');
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক। main-এ লেখা নিষিদ্ধ।');
 if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
 const content=String(args.content||'');if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
async function writeLedger(env,task,extra){
 const path='docs/agent-tasks/'+task.task_id+'.md';
 const content=`# ${task.task_id} — ${task.agent_name}

- Agent ID: ${task.agent_id}
- Session ID: ${task.session_id}
- Task Type: ${task.task_type}
- Requester: ${task.requester}
- Status: ${extra.status}
- Created: ${task.created_at}
- Updated: ${now()}
- Branch: ${task.branch}
- Parent Task: ${task.parent_task_id||'NONE'}

## Request
${task.request}

## Work record
${extra.work||'Agent work started.'}

## Changed files
${(extra.files||[]).length?(extra.files||[]).map(x=>'- '+x).join('\\n'):'- none recorded'}

## Commits
${(extra.commits||[]).length?(extra.commits||[]).map(x=>'- '+x).join('\\n'):'- none recorded'}

## Verification
${extra.verification||'Not yet completed.'}

## Remaining / Handoff
${extra.remaining||'Not yet determined.'}

## Successor
${extra.successor||'Not assigned.'}
`;
 return writeFile(env,{path,branch:task.branch,content,message:'Record '+task.task_id+' agent work'});
}
const TOOLS=[
 {name:'project_read_file',description:'Read a text file before analyzing or editing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
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
async function gemini(env,history){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||MODEL_DEFAULT;
 const system=`তুমি আল-কুরআন গবেষণা প্রকল্পের Project Agent। তোমার পরিচয়, Task ID, branch এবং work history-কে সম্মান করবে।
প্রথমে প্রকল্পের প্রয়োজনীয় ফাইল/structure পড়বে; অনুমান করে rewrite করবে না। পরিবর্তনের আগে existing implementation, docs এবং constraints বুঝবে।
শুধু agent/* branch-এ লিখবে; main-এ কখনো নয়। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql protected।
প্রতিটি পরিবর্তনের পর কী বদলেছে তা audit হিসেবে মনে রাখবে। অসম্পূর্ণ হলে remaining work স্পষ্ট করবে।
তুমি merge বা production deploy করতে পারো না এবং এমন দাবি করবে না। কাজ শেষে: কী পড়েছ, কী বদলেছ, branch, commit, পরীক্ষা, remaining এবং approval/deployment status বাংলায় জানাবে।`;
 let contents=history.slice(),audit=[];
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
  const modelContent=data?.candidates?.[0]?.content;if(!modelContent)throw new Error('Gemini response missing content.');
  const calls=(modelContent.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(modelContent.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1,audit};
  contents.push(modelContent);
  const responses=[];
  for(const part of calls){
   const fc=part.functionCall;let result;
   try{result=await executeTool(env,fc.name,fc.args||{});}catch(e){result={ok:false,error:String(e?.message||e)}}
   audit.push({tool:fc.name,args:fc.args||{},result});
   responses.push({functionResponse:{name:fc.name,response:{result}}});
  }
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false,identity_registry:true,work_ledger:true,handoff:true},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>MAX_MESSAGE)return json({ok:false,error:'message too large'},413,origin);
  const task_id=String(body?.task_id||taskId());
  const session_id=String(body?.session_id||crypto.randomUUID());
  const agent_name=String(body?.agent_name||chooseAgent(message));
  const agent_id=String(body?.agent_id||agentId(agent_name,task_id));
  const task_type=String(body?.task_type||'general-project-work');
  const requester=String(body?.requester||'user');
  const parent_task_id=String(body?.parent_task_id||'');
  const branch=String(body?.branch||branchName(agent_name,task_id,message));
  if(!isAgentBranch(branch))return json({ok:false,error:'invalid agent branch'},400,origin);
  const existing=await gh(env,'/repos/'+repo(env)+'/git/branches/'+encodeURIComponent(branch)).catch(()=>null);
  if(!existing)await createBranch(env,{branch,base:'main'});
  const task={task_id,session_id,agent_name,agent_id,task_type,requester,parent_task_id,branch,request:message,created_at:now()};
  await writeLedger(env,task,{status:'RECEIVED',work:'Task accepted; isolated branch created or reused.'});
  const result=await gemini(env,[{role:'user',parts:[{text:message+'\\n\\nTASK CONTEXT: '+JSON.stringify(task)}]}]);
  const files=[...new Set(result.audit.flatMap(a=>a.tool==='project_write_file'?[a.args?.path]:[]).filter(Boolean))];
  const commits=[...new Set(result.audit.flatMap(a=>a.tool==='project_write_file'?[a.result?.commit_sha]:[]).filter(Boolean))];
  const toolSummary=result.audit.map(a=>a.tool).join(', ')||'none';
  await writeLedger(env,task,{status:'WORKING/REVIEW_REQUIRED',work:'Tools used: '+toolSummary+'\\n\\nAgent report:\\n'+result.answer,files,commits,verification:'Agent self-report only. Independent review/browser/live verification still required.',remaining:'Review, validation and any authorized promotion/deployment remain pending.'});
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'2.0.0',task_id,session_id,agent_name,agent_id,branch,files_changed:files,commits,isolated:true,merge:false,deploy:false},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800)},500,origin);}
}};