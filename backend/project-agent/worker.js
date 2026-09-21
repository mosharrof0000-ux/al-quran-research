/* Al-Quran Research — Autonomous Project Agent Engine v1.1
   Identity, task tracking, safe isolation and handoff aware.
   Never merges or deploys production.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=10;

const AGENT_PROFILES=[
  ['reader',['reader','কুরআন','আয়াত','আয়াত','তাফসির','translation','অনুবাদ'],'সুমন','reader'],
  ['icon',['icon','আইকন','font','ফন্ট','logo','লোগো'],'শাহীন','icon'],
  ['ui',['ui','chat','header','button','layout','interface','চ্যাট','হেডার','বাটন'],'শামীম','ui'],
  ['test',['test','browser','visual','console','network','পরীক্ষা','যাচাই'],'নাঈম','test'],
  ['data',['data','database','dataset','schema','ডেটা','ডাটাবেজ'],'রাকিব','data'],
  ['agent',['agent','ai','automation','workflow','এআই','এজেন্ট','অটোমেশন'],'আরিফ','agent']
];
function pickIdentity(message){
  const s=String(message||'').toLowerCase();
  for(const [,keys,name,code] of AGENT_PROFILES) if(keys.some(k=>s.includes(k))) return {name,code};
  return {name:'শাহীন',code:'general'};
}
function taskId(identity){return 'TASK-'+new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14)+'-'+identity.code.toUpperCase()+'-'+crypto.randomUUID().slice(0,8);}
function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+,'');
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
 const bin=atob(String(data.content||'').replace(/\n/g,'')); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0)); const decoded=new TextDecoder().decode(bytes);
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
 return (data.items||[]).slice(0,30).map(x=>({path:x.path,html_url:x.html_url}));
}
async function fetchPullRequest(env,args){
 const n=Number(args.number);if(!Number.isInteger(n)||n<1)throw new Error('PR number প্রয়োজন।');
 const data=await gh(env,'/repos/'+repo(env)+'/pulls/'+n);
 return {number:data.number,state:data.state,draft:data.draft,merged:data.merged,mergeable:data.mergeable,base:data.base?.ref,head:data.head?.ref,head_sha:data.head?.sha,title:data.title,url:data.html_url};
}
async function searchPullRequests(env,args){
 const q=String(args.query||'').trim();if(!q)throw new Error('PR search query প্রয়োজন।');
 const data=await gh(env,'/search/issues?q='+encodeURIComponent(q+' repo:'+repo(env)+' is:pr'));
 return (data.items||[]).slice(0,20).map(x=>({number:x.number,title:x.title,state:x.state,draft:x.draft||false,url:x.html_url}));
}
async function fetchCommit(env,args){
 const sha=String(args.sha||'').trim();if(!sha)throw new Error('commit SHA প্রয়োজন।');
 const data=await gh(env,'/repos/'+repo(env)+'/commits/'+encodeURIComponent(sha));
 return {sha:data.sha,message:data.commit?.message,author:data.commit?.author,html_url:data.html_url,files:(data.files||[]).map(x=>({filename:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes}))};
}
async function compareRefs(env,args){
 const base=String(args.base||'').trim(),head=String(args.head||'').trim();
 if(!base||!head)throw new Error('base এবং head প্রয়োজন।');
 const data=await gh(env,'/repos/'+repo(env)+'/compare/'+encodeURIComponent(base)+'...'+encodeURIComponent(head));
 return {status:data.status,ahead_by:data.ahead_by,behind_by:data.behind_by,total_commits:data.total_commits,files:(data.files||[]).map(x=>({filename:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes}))};
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
 const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch}; if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
const TOOLS=[
 {name:'project_read_file',description:'Read a project file before analyzing or editing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'List a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code and documentation.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_fetch_pull_request',description:'Inspect a pull request before taking over or reviewing work.',parameters:{type:'object',properties:{number:{type:'integer'}},required:['number']}},
 {name:'project_search_pull_requests',description:'Find related pull requests and prior agent work.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_fetch_commit',description:'Inspect a commit, changed files and author metadata.',parameters:{type:'object',properties:{sha:{type:'string'}},required:['sha']}},
 {name:'project_compare_refs',description:'Compare a work branch against main or another approved ref before review.',parameters:{type:'object',properties:{base:{type:'string'},head:{type:'string'}},required:['base','head']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch. Use the assigned agent identity in the branch name.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function executeTool(env,name,args){
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_fetch_pull_request')return fetchPullRequest(env,args);
 if(name==='project_search_pull_requests')return searchPullRequests(env,args);
 if(name==='project_fetch_commit')return fetchCommit(env,args);
 if(name==='project_compare_refs')return compareRefs(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,history,identity,task){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system=`তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent।
এই কাজের Agent Name: ${identity.name}
Agent Role: ${identity.code}
Task ID: ${task}
নিয়ম:
1) প্রথমে প্রকল্পের প্রাসঙ্গিক docs/code/runtime context পড়বে; অনুমান করে rewrite করবে না।
2) কাজের জন্য নতুন agent/* branch ব্যবহার করবে; main-এ কখনো write করবে না।
3) .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql protected।
4) পরিবর্তনের আগে বর্তমান implementation, dependency ও related files যাচাই করবে।
5) minimal safe change করবে এবং সম্ভব হলে browser/runtime verification-এর জন্য স্পষ্ট test plan রাখবে।
6) কাজ অসম্পূর্ণ হলে অবশ্যই handoff record লিখবে: Agent Name, Task ID, completed, remaining, changed files, branch, commits, blockers, next-agent instructions।
7) কাজ সম্পন্ন হলে handoff/completion record লিখবে এবং পরবর্তী agent যেন বুঝতে পারে কে কী করেছে তা সংরক্ষণ করবে।
8) একই কাজ অন্য agent নিলে original Agent Name ও successor Agent Name আলাদা থাকবে।
9) merge বা production deploy করতে পারো না; এমন দাবি করবে না।
10) শেষে বাংলায় সংক্ষেপে পড়া ফাইল, পরিবর্তন, branch, commit, test status, remaining work এবং approval/deployment status জানাবে।`;
 let contents=history.slice();
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
  const modelContent=data?.candidates?.[0]?.content;if(!modelContent)throw new Error('Gemini response missing content.');
  const calls=(modelContent.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(modelContent.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  contents.push(modelContent);
  const responses=[];
  for(const part of calls){const fc=part.functionCall;let result;try{result=await executeTool(env,fc.name,fc.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}}responses.push({functionResponse:{name:fc.name,response:{result}}});}
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'1.2.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false,identity_registry:true,task_handoff:true},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
  const identity=pickIdentity(message), task=taskId(identity), session=String(body?.session_id||'SESSION-'+crypto.randomUUID().slice(0,8)), parent_task=String(body?.parent_task_id||'');
  const result=await gemini(env,[{role:'user',parts:[{text:message}]}],identity.name,task);
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'1.2.0',task_id:task,agent_name:identity.name,agent_role:identity.code,session_id:session,parent_task_id:parent_task||null,branch_hint:'agent/'+identity.code+'-'+task.toLowerCase(),isolated:true,merge:false,deploy:false},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600)},500,origin);}
}};
