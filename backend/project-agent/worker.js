/* Al-Quran Research — Project Agent Engine
   Agent: সুমন
   Task: TASK-2026-09-21-SUMAN-AI-001
   Isolated worker: read/inspect/modify only agent/* branches.
   Never merges or deploys production.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_FILES_PER_READ=8;
const MAX_TURNS=14;
const AGENT_NAME='সুমন';
const AGENT_ID='suman-ai-core-strengthening-001';
const TASK_PREFIX='TASK-2026-09-21-SUMAN-AI-';

function cors(origin){return {'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json; charset=utf-8','Vary':'Origin'};}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:cors(origin)});}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){return /^agent\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+?/,'');
 if(!p||p.includes('..')||p.startsWith('.git/'))return false;
 const blocked=['.env','.env.','.dev.vars','credentials','secret','private-key','id_rsa'];
 if(blocked.some(x=>p.toLowerCase().includes(x)))return false;
 if(write){
  const protectedPrefixes=['.github/','database/','migrations/','validation/'];
  if(protectedPrefixes.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
 }
 return true;
}
function encPath(path){return path.split('/').map(encodeURIComponent).join('/');}
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
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch));
 if(data.type!=='file')throw new Error('এটি file নয়।');
 if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 const bin=atob(String(data.content||'').replace(/\n/g,'')); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:data.sha,size:data.size,content:new TextDecoder().decode(bytes)};
}
async function readMany(env,args){
 const paths=Array.isArray(args.paths)?args.paths:[]; if(!paths.length)throw new Error('paths প্রয়োজন।');
 if(paths.length>MAX_FILES_PER_READ)throw new Error('একবারে সর্বোচ্চ '+MAX_FILES_PER_READ+'টি file পড়া যাবে।');
 const results=[];
 for(const path of paths){try{results.push(await readFile(env,{path,branch:args.branch||'main'}));}catch(e){results.push({path,error:String(e?.message||e)})}}
 return results;
}
async function listDirectory(env,args){
 const path=String(args.path||''),branch=String(args.branch||'main');
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
 return data.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function projectTree(env,args){
 const branch=String(args.branch||'main');
 const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(branch));
 const tree=await gh(env,'/repos/'+repo(env)+'/git/trees/'+encodeURIComponent(ref.object.sha)+'?recursive=1');
 const items=(tree.tree||[]).filter(x=>x.type==='blob'&&safePath(x.path)).slice(0,500);
 return {branch,sha:ref.object.sha,truncated:Boolean(tree.truncated),files:items.map(x=>({path:x.path,size:x.size||0}))};
}
async function searchCode(env,args){
 const q=String(args.query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (data.items||[]).slice(0,30).map(x=>({path:x.path,html_url:x.html_url}));
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
 const path=String(args.path||''),branch=String(args.branch||''),expected=String(args.expected_sha||'');
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক। main-এ লেখা নিষিদ্ধ।');
 if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
 const content=String(args.content||'');if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path)+'?ref='+encodeURIComponent(branch))}catch{}
 if(existing?.sha && !expected)throw new Error('বিদ্যমান file update করতে expected_sha দিতে হবে; এটি overwrite-race প্রতিরোধ করে।');
 if(existing?.sha && expected!==existing.sha)throw new Error('STALE_FILE: expected_sha বর্তমান SHA-এর সঙ্গে মেলেনি। আগে file আবার পড়ুন।');
 if(!existing?.sha && expected)throw new Error('FILE_STATE_CHANGED: file নতুন/অনুপস্থিত নয়।');
 const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+encPath(path),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
const TOOLS=[
 {name:'project_inspect_tree',description:'Inspect the repository file tree before making architectural decisions.',parameters:{type:'object',properties:{branch:{type:'string'}},required:[]}},
 {name:'project_read_file',description:'Read one project text file. Always read before editing.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_read_many',description:'Read a small set of related project files in one tool call.',parameters:{type:'object',properties:{paths:{type:'array',items:{type:'string'}},branch:{type:'string'}},required:['paths']}},
 {name:'project_list_directory',description:'List files in a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for a term or identifier.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. For an existing file, expected_sha from a fresh read is mandatory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'},expected_sha:{type:'string'}},required:['path','branch','content','message']}}
];
async function executeTool(env,name,args){
 if(name==='project_inspect_tree')return projectTree(env,args);
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_read_many')return readMany(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,history,meta){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system=`তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent।
তোমার পরিচয়: Agent Name=${AGENT_NAME}, Agent ID=${AGENT_ID}, Task ID=${meta.taskId}.
তুমি প্রকল্পের বাস্তব code/context বুঝে নিরাপদ agent/* branch-এ কাজ করবে।
কঠোর নিয়ম:
1) প্রথমে inspect tree এবং প্রয়োজনীয় source/docs পড়বে; অনুমান করে rewrite করবে না।
2) পরিবর্তনের আগে বিদ্যমান file-এর SHA সংগ্রহ করবে এবং update-এ expected_sha দেবে।
3) নতুন স্বতন্ত্র কাজ হলে নতুন task identity/branch ব্যবহারের কথা রিপোর্ট করবে; উত্তরাধিকারী কাজ হলে parent task উল্লেখ করবে।
4) .github/workflows, database, migrations, validation, quran_research.db, schema.sql এবং secrets/credential-like paths পরিবর্তন করবে না।
5) main-এ কখনো write/merge/deploy করবে না।
6) কাজ শেষে Changed Files, branch, commit, tests/verification, remaining work এবং handoff status স্পষ্টভাবে বাংলায় রিপোর্ট করবে।
7) কোনো deployment/লাইভ প্রকাশ হয়েছে বলে দাবি করবে না যদি তা বাস্তবে যাচাই না করা হয়।
8) সমস্যা পেলে root cause আলাদা করবে; safe minimal fix করবে; তারপর পুনরায় inspect/test করবে।
9) কাজ অসম্পূর্ণ হলে INCOMPLETE_HANDOFF হিসেবে remaining steps লিখবে।
10) উৎপাদন পরিবর্তনের আগে explicit review/approval gate বজায় থাকবে।
`;
 let contents=history.slice();
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:5000,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,500));
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
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',agent_name:AGENT_NAME,agent_id:AGENT_ID,capabilities:['tree-inspection','multi-file-read','safe-write-with-sha','root-cause-loop'],isolated:true,write_scope:'agent/* only',merge:false,deploy:false},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  const taskId=String(body?.task_id||TASK_PREFIX+crypto.randomUUID().slice(0,8)).slice(0,120);
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
  const result=await gemini(env,[{role:'user',parts:[{text:message}]}],{taskId});
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'2.0.0',agent_name:AGENT_NAME,agent_id:AGENT_ID,task_id:taskId,isolated:true,merge:false,deploy:false,status:'REPORTED'},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,700)},500,origin);}
}};