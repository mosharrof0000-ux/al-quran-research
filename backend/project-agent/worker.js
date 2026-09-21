/* Al-Quran Research — Isolated Project Agent Engine v1
   Separate Worker. It can read project files and write only to agent/* branches.
   It cannot merge or deploy.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=8;

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
 const bin=atob(String(data.content||'').replace(/\n/g,''));\n const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));\n const decoded=new TextDecoder().decode(bytes);
 return {path,branch,sha:data.sha,size:data.size,content:decoded};
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
async function persistTask(env,task,patch={}){
  const path='docs/agent-work/runtime/'+task.task_id+'.json';
  const branch=task.branch||task.branch_name||'';
  if(!isAgentBranch(branch))return {persisted:false,error:'task branch missing'};
  const record={...task,...patch,updated_at:new Date().toISOString()};
  return writeFile(env,{path,branch,content:JSON.stringify(record,null,2)+'\\n',message:'Persist Project Agent task state '+task.task_id});
}
async function loadTask(env,task_id,branch){
  if(!task_id||!isAgentBranch(branch))return null;
  try{return JSON.parse((await readFile(env,{path:'docs/agent-work/runtime/'+task_id+'.json',branch})).content)}catch{return null}
}
const AGENT_NAMES={
  chat_ui:['শামীম','রাকিব'], icon_visual:['শাহীন','তানভীর'], reader_data:['সুমন','মাহিন'], notification:['রাকিব','নাঈম'], browser_qa:['নাঈম','আরিফ'], architecture_security:['আরিফ','সাইফ'], data_mapping:['মাহিন','সুমন'], general:['শামীম','সুমন','শাহীন','নাঈম','আরিফ']
};
function slug(s){return String(s||'general').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'general';}
function classifyWork(message){const m=String(message||'').toLowerCase(); if(/আইকন|icon|visual|css|style/.test(m))return 'icon_visual'; if(/reader|কুরআন পাঠ|আয়াত|ডেটা|data/.test(m))return 'reader_data'; if(/notification|নোটিফিকেশন|update|আপডেট/.test(m))return 'notification'; if(/browser|test|পরীক্ষা|qa/.test(m))return 'browser_qa'; if(/security|নিরাপত্তা|architecture|স্থাপত্য/.test(m))return 'architecture_security'; if(/mapping|ম্যাপিং/.test(m))return 'data_mapping'; if(/chat|চ্যাট|ui|interface/.test(m))return 'chat_ui'; return 'general';}
function identityFor(message){const work=classifyWork(message),names=AGENT_NAMES[work]||AGENT_NAMES.general; const n=names[0]; const id='AG-'+slug(n)+'-'+work+'-'+Date.now().toString(36); const task='TASK-'+new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14)+'-'+Math.random().toString(36).slice(2,7).toUpperCase(); return {task_id:task,agent_name_bn:n,agent_id:id,work_type:work,session_id:'SESSION-'+crypto.randomUUID()};}
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
async function gemini(env,history){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Project Agent। তুমি প্রকল্পের ফাইল পড়তে, বিশ্লেষণ করতে এবং নিরাপদ agent/* branch-এ text file তৈরি/সংশোধন করতে পারো। কখনো main-এ লিখবে না। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql পরিবর্তন করবে না। প্রথমে প্রয়োজনীয় ফাইল পড়বে; অনুমান করে code rewrite করবে না। পরিবর্তনের আগে বর্তমান content ও প্রকল্পের নিয়ম বুঝবে। কাজ শেষে কী পড়েছ, কী পরিবর্তন করেছ, কোন branch-এ করেছ এবং কী user approval/deployment-এর অপেক্ষায় আছে তা বাংলায় বলবে। তুমি merge বা production deploy করতে পারো না এবং এমন দাবি করবে না।';
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
   try{result=await executeTool(env,fc.name,fc.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}}
   responses.push({functionResponse:{name:fc.name,response:{result}}});
  }
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'1.0.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
  const identity=identityFor(message);
  const enriched='Task identity: '+JSON.stringify(identity)+'\nUser command: '+message;
  const result=await gemini(env,[{role:'user',parts:[{text:enriched}]}]);
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'1.0.0',isolated:true,merge:false,deploy:false,identity},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600)},500,origin);}
}};
