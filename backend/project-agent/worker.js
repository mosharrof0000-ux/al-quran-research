/* Al-Quran Research — Isolated Project Agent Engine v1
   Separate Worker. It can read project files and write only to agent/* branches.
   It cannot merge or deploy.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=8;
const MAX_TASK_ID=80;
const MAX_AGENT_NAME=80;
const TASK_DIR='docs/agent-tasks/';
const TASK_STATES=['RECEIVED','INSPECTING','PLANNED','WORKING','TESTING','REPAIRING','VALIDATED','READY_FOR_REVIEW','APPROVED','DEPLOYING','LIVE_VERIFIED','NOTIFIED','HANDOFF_COMPLETE','BLOCKED','ROLLED_BACK'];

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
function cleanMeta(value,max){return String(value||'').trim().slice(0,max);}
function taskMeta(body){return {task_id:cleanMeta(body?.task_id,MAX_TASK_ID)||null,agent_name:cleanMeta(body?.agent_name,MAX_AGENT_NAME)||null,agent_id:cleanMeta(body?.agent_id,MAX_TASK_ID)||null,session_id:cleanMeta(body?.session_id,MAX_TASK_ID)||null,parent_task_id:cleanMeta(body?.parent_task_id,MAX_TASK_ID)||null,work_type:cleanMeta(body?.work_type,MAX_AGENT_NAME)||null};}
function taskPath(taskId){
 const id=cleanMeta(taskId,MAX_TASK_ID); if(!/^[A-Za-z0-9_-]+$/.test(id)) throw new Error('Invalid Task ID.');
 return TASK_DIR+id+'.md';
}
function taskRecord(meta,state,request,extra=''){
 const s=String(state||'RECEIVED').toUpperCase(); if(!TASK_STATES.includes(s)) throw new Error('Invalid task state: '+s);
 return '# Agent Task Record — '+meta.task_id+'\\n\\n'+
 '## Identity\\n- Agent Name: '+(meta.agent_name||'অজানা')+'\\n- Agent ID: '+(meta.agent_id||'অজানা')+'\\n- Session ID: '+(meta.session_id||'অজানা')+'\\n- Parent Task: '+(meta.parent_task_id||'none')+'\\n- Work Type: '+(meta.work_type||'unspecified')+'\\n- Status: '+s+'\\n\\n'+
 '## Request\\n'+String(request||'').slice(0,8000)+'\\n\\n## Update\\n'+String(extra||'').slice(0,8000)+'\\n';
}
async function createTaskRecord(env,meta,args){
 if(!meta.task_id)throw new Error('Task ID required.');
 const branch=String(args.branch||''); if(!isAgentBranch(branch))throw new Error('Task record requires agent/* branch.');
 const path=taskPath(meta.task_id); const content=taskRecord(meta,args.state,args.request,args.update);
 return writeFile(env,{path,branch,content,message:'agent task '+meta.task_id+' — '+String(args.state||'RECEIVED')});
}

const TOOLS=[
 {name:'project_read_file',description:'Read a text file from the Quran Research repository before analyzing or editing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'List files in a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for a term or identifier.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}},
 {name:'project_create_task_record',description:'Create or update a persistent task record under docs/agent-tasks for this Agent task. Use it at start, state changes, blockers, and handoff.',parameters:{type:'object',properties:{branch:{type:'string'},state:{type:'string',enum:TASK_STATES},request:{type:'string'},update:{type:'string'}},required:['branch','state','request','update']}}
];
async function executeTool(env,name,args){
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 if(name==='project_create_task_record')return createTaskRecord(env,meta,args);
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,history,meta){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const identity=JSON.stringify(meta||{});
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Project Agent। তুমি প্রকল্পের ফাইল পড়তে, বিশ্লেষণ করতে এবং নিরাপদ agent/* branch-এ text file তৈরি/সংশোধন করতে পারো। কখনো main-এ লিখবে না। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql পরিবর্তন করবে না। প্রথমে প্রয়োজনীয় ফাইল পড়বে; অনুমান করে code rewrite করবে না। পরিবর্তনের আগে বর্তমান content ও প্রকল্পের নিয়ম বুঝবে। প্রতিটি কাজের Task ID, Agent Name/ID, Session ID, Work Type এবং Parent Task থাকলে তা বজায় রাখবে। কাজ শুরুতে প্রয়োজন হলে একটি agent/* branch তৈরি করবে এবং কাজের ইতিহাস project documentation-এ রাখবে। কাজ থামলে বা অসম্পূর্ণ থাকলে handoff record তৈরি করবে। প্রতিটি task-এর জন্য docs/agent-tasks/<TaskID>.md record তৈরি/আপডেট করবে এবং state lifecycle বজায় রাখবে। বর্তমান task metadata: '+identity+'. কাজ শেষে কী পড়েছ, কী পরিবর্তন করেছ, কোন branch-এ করেছ এবং কী user approval/deployment-এর অপেক্ষায় আছে তা বাংলায় বলবে। তুমি merge বা production deploy করতে পারো না এবং এমন দাবি করবে না।';
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
  const meta=taskMeta(body);
  const result=await gemini(env,[{role:'user',parts:[{text:message}]}],meta);
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'1.0.0',isolated:true,merge:false,deploy:false,task:meta},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600)},500,origin);}
}};
