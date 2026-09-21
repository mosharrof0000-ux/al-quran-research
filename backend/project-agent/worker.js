/* Al-Quran Research — Autonomous Project Agent Engine v2
   Identity + isolated task branches + auditable work metadata.
   Production merge/deploy remain prohibited.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=10;

const IDENTITY_MAP=[
 {type:'chat-ui',name:'শামীম',slug:'shamim',keys:['চ্যাট','chat','ui','ইন্টারফেস','interface','মকআপ','mockup']},
 {type:'icon-visual',name:'শাহীন',slug:'shaheen',keys:['আইকন','icon','svg','ভিজ্যুয়াল','visual']},
 {type:'quran-reader',name:'সুমন',slug:'sumon',keys:['কুরআন','কোরআন','reader','পাঠ','সূরা','আয়াত','তানজিল','tanzil']},
 {type:'data-research',name:'রাকিব',slug:'rakib',keys:['ডেটা','data','গবেষণা','research','root','morphology','grammar']},
 {type:'backend-api',name:'নাঈম',slug:'naim',keys:['backend','api','worker','cloudflare','সংযোগ','connection','server']},
 {type:'testing',name:'তানভীর',slug:'tanvir',keys:['test','testing','যাচাই','পরীক্ষা','browser','console','network']},
 {type:'governance-docs',name:'ফারহান',slug:'farhan',keys:['নির্দেশ','document','docs','governance','protocol','history']},
 {type:'release',name:'আরিফ',slug:'arif',keys:['deploy','release','live','প্রকাশ','লাইভ']}
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
function classify(message){
 const s=String(message||'').toLowerCase();
 return IDENTITY_MAP.find(x=>x.keys.some(k=>s.includes(k.toLowerCase())))||{type:'general',name:'শামীম',slug:'shamim',keys:[]};
}
function makeTask(message,body){
 const identity=classify(message);
 const uuid=crypto.randomUUID();
 const taskId='TASK-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+uuid.slice(0,8);
 const sessionId=String(body?.session_id||'SESSION-'+crypto.randomUUID());
 const agentId='AGENT-'+uuid;
 const parentTaskId=String(body?.parent_task_id||'');
 const baseBranch=String(body?.base_branch||envBaseBranchPlaceholder);
 const branch='agent/'+identity.slug+'-'+taskId.toLowerCase();
 return {taskId,sessionId,agentId,agentName:identity.name,agentSlug:identity.slug,workType:identity.type,parentTaskId,baseBranch,branch};
}
const envBaseBranchPlaceholder='main';

async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
 const text=await r.text();let data;try{data=JSON.parse(text)}catch{data={raw:text}}
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||text).slice(0,500));
 return data;
}
async function readFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||env.AGENT_TASK_BRANCH||'main');
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(data.type!=='file')throw new Error('এটি file নয়।');
 if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 const bin=atob(String(data.content||'').replace(/\n/g,''));
 const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 const decoded=new TextDecoder().decode(bytes);
 return {path,branch,sha:data.sha,size:data.size,content:decoded};
}
async function listDirectory(env,args){
 const path=String(args.path||''),branch=String(args.branch||env.AGENT_TASK_BRANCH||'main');
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
 return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
 const q=String(args.query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (data.items||[]).slice(0,30).map(x=>({path:x.path,html_url:x.html_url}));
}
async function createBranch(env,args){
 const branch=String(args.branch||''),base=String(args.base||env.AGENT_BASE_BRANCH||'main');
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
 const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha}),headers:{'Content-Type':'application/json'}});
 return {branch,base,sha:created.object.sha};
}
async function writeFile(env,args){
 const path=String(args.path||''),branch=String(args.branch||env.AGENT_TASK_BRANCH||'');
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক। main-এ লেখা নিষিদ্ধ।');
 if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
 const content=String(args.content||'');if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
async function appendLedger(env,task,extra){
 const path='docs/AGENT_WORK_LEDGER.md',branch=task.branch;
 let existing='';
 try{existing=(await readFile(env,{path,branch})).content}catch{}
 if(!existing) existing='# Agent Work Ledger\n\n';
 const now=new Date().toISOString();
 const entry='\n### '+task.taskId+'\n- Agent Name: '+task.agentName+'\n- Agent ID: '+task.agentId+'\n- Session ID: '+task.sessionId+'\n- Work type: '+task.workType+'\n- Request: '+String(task.request||'').replace(/\n/g,' ')+'\n- Parent Task: '+(task.parentTaskId||'none')+'\n- Branch: '+task.branch+'\n- Status: '+(extra.status||'RECEIVED')+'\n- Started: '+now+'\n- Updated: '+now+'\n- Changed files: '+(extra.changedFiles||'pending')+'\n- Commits: '+(extra.commits||'pending')+'\n- Tests/verification: '+(extra.tests||'pending')+'\n- Live verification: '+(extra.live||'NOT RUN')+'\n- Remaining work: '+(extra.remaining||'pending')+'\n- Successor: '+(extra.successor||'none')+'\n- Handoff: '+(extra.handoff||'pending')+'\n';
 const next=existing+entry;
 return writeFile(env,{path,branch,content:next,message:'Record '+task.taskId+' agent work ledger entry'});
}
const TOOLS=[
 {name:'project_read_file',description:'Read a text file before analyzing or editing it. Default branch is the current task branch.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'List project files. Default branch is the current task branch.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for a term or identifier.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch. The engine has already created the current task branch; use this only for a separately justified subtask.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on the current agent branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function executeTool(env,name,args){
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,history,task){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent। বর্তমান পরিচয়: '+task.agentName+'; Agent ID: '+task.agentId+'; Task ID: '+task.taskId+'; Session ID: '+task.sessionId+'; Work type: '+task.workType+'; Task branch: '+task.branch+'. তুমি প্রকল্পের ফাইল পড়তে, বিশ্লেষণ করতে এবং এই isolated agent/* branch-এ text file তৈরি/সংশোধন করতে পারো। কখনো main-এ লিখবে না। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql পরিবর্তন করবে না। প্রথমে প্রয়োজনীয় governance/project files পড়বে; অনুমান করে code rewrite করবে না। কাজের শেষে observable কাজ, পড়া/পরিবর্তিত file, branch, commit, test status, remaining work এবং approval/deployment state জানাবে। অসম্পূর্ণ হলে INCOMPLETE/HANDOFF record করতে হবে। merge বা production deploy করার দাবি করবে না।';
 let contents=history.slice();
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
  const modelContent=data?.candidates?.[0]?.content;if(!modelContent)throw new Error('Gemini response missing content.');
  const calls=(modelContent.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(modelContent.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  contents.push(modelContent);
  const responses=[];
  for(const part of calls){
   const fc=part.functionCall;let result;
   try{result=await executeTool(env,fc.name,{...(fc.args||{}),branch:fc.args?.branch||task.branch})}catch(e){result={ok:false,error:String(e?.message||e)}}
   responses.push({functionResponse:{name:fc.name,response:{result}}});
  }
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false,identity_registry:true,task_branching:true},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 let task;
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
  task=makeTask(message,body);task.request=message;
  const env2={...env,AGENT_BASE_BRANCH:String(body?.base_branch||env.AGENT_BASE_BRANCH||'main')};
  const branchResult=await createBranch(env2,{branch:task.branch,base:env2.AGENT_BASE_BRANCH});
  console.log({event:'agent_task_started',task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,branch:task.branch,base:env2.AGENT_BASE_BRANCH});
  await appendLedger(env2,task,{status:'RECEIVED',remaining:'Agent execution in progress'});
  const result=await gemini(env2,[{role:'user',parts:[{text:message}]}],task);
  console.log({event:'agent_task_finished',task_id:task.taskId,agent_name:task.agentName,branch:task.branch,turns:result.turns});
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'2.0.0',isolated:true,merge:false,deploy:false,task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,work_type:task.workType,branch:task.branch,base_branch:env2.AGENT_BASE_BRANCH,branch_sha:branchResult.sha},200,origin);
 }catch(e){
  if(task)console.error({event:'agent_task_failed',task_id:task.taskId,agent_name:task.agentName,branch:task.branch,error:String(e?.message||e)});
  return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600),task:task?{task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,branch:task.branch,work_type:task.workType}:null},500,origin);
 }
}};
