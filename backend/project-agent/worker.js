/* Al-Quran Research — Autonomous Project Agent Engine v2
   Safe-by-default agent identity, task ledger, handoff, inspection and repair loop.
   Production/main/deploy remain outside this engine.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_TURNS=12;
const MAX_MESSAGE=12000;

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
function taskType(message){
 const m=String(message||'').toLowerCase();
 if(/icon|আইকন/.test(m))return 'icon';
 if(/reader|কুরআন পাঠ|রিডার|আয়াত|আয়াত/.test(m))return 'reader';
 if(/chat|চ্যাট|ai|এআই|agent|এজেন্ট/.test(m))return 'ai';
 if(/data|ডেটা|database|ডাটাবেজ|উচ্চারণ|অনুবাদ/.test(m))return 'data';
 if(/test|browser|visual|স্ক্রিন|পরীক্ষা|যাচাই/.test(m))return 'verification';
 if(/header|হেডার|ui|interface|ইন্টারফেস/.test(m))return 'ui';
 if(/notification|নোটিফিকেশন|update|আপডেট/.test(m))return 'notification';
 return 'research';
}
const AGENT_NAMES={icon:'শাহীন',reader:'সুমন',ai:'শামীম',data:'রাকিব',verification:'নাঈম',ui:'আরিফ',notification:'তানভীর',research:'ইমরান'};
function makeIdentity(message){
 const type=taskType(message);
 const id='AQT-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomUUID().slice(0,6).toUpperCase();
 return {task_id:id,task_type:type,agent_name:AGENT_NAMES[type],agent_id:id+'-'+type,session_id:crypto.randomUUID()};
}
async function gh(env,path,init={}){
 if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
 const r=await fetch(API+path,{...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+env.GITHUB_TOKEN,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'al-quran-research-project-agent',...(init.headers||{})}});
 const raw=await r.text();let data;try{data=JSON.parse(raw)}catch{data={raw}};
 if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||raw).slice(0,500));
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
 const path=String(args.path||''),branch=String(args.branch||''),content=String(args.content||'');
 if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক।');
 if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
 if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(args.message||'AI agent change'),content:btoa(unescape(encodeURIComponent(content))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
 return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
function taskRecord(identity,request,status,extra={}){
 return '# Agent Task Record — '+identity.task_id+'\\n\\n'+
 '## Identity\\n- Agent Name: '+identity.agent_name+'\\n- Agent ID: '+identity.agent_id+'\\n- Session ID: '+identity.session_id+'\\n- Task Type: '+identity.task_type+'\\n'+
 '## Request\\n'+request+'\\n\\n## Status\\n'+status+'\\n\\n## Work Ledger\\n- Created: '+new Date().toISOString()+'\\n- Branch: '+(extra.branch||'pending')+'\\n- Parent Task: '+(extra.parent_task_id||'none')+'\\n- Completed: '+(extra.completed||'pending')+'\\n- Remaining: '+(extra.remaining||'pending')+'\\n- Changed Files: '+(extra.changed_files||'pending')+'\\n- Verification: '+(extra.verification||'pending')+'\\n- Handoff: '+(extra.handoff||'required before closure')+'\\n';
}
const TOOLS=[
 {name:'project_read_file',description:'Read a project text file before analysis or editing.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'List a project directory. Use this for broad inspection.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for terms, identifiers, routes, selectors, or errors.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}},
 {name:'project_record_task',description:'Write the persistent Bengali Agent Task/Handoff record to the current agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},status:{type:'string'},completed:{type:'string'},remaining:{type:'string'},changed_files:{type:'string'},verification:{type:'string'},handoff:{type:'string'},parent_task_id:{type:'string'}},required:['branch','status','completed','remaining','changed_files','verification','handoff']}}
];
async function executeTool(env,name,args,identity,request){
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDirectory(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 if(name==='project_record_task'){
  const branch=String(args.branch||'');
  if(!isAgentBranch(branch))throw new Error('Task record-ও agent/* branch-এ হতে হবে।');
  const path='docs/agent-ledger/tasks/'+identity.task_id+'.md';
  return writeFile(env,{path,branch,content:taskRecord(identity,request,String(args.status||'WORKING'),args),message:'Record agent task '+identity.task_id});
 }
 throw new Error('Unknown tool: '+name);
}
async function gemini(env,history,identity,request,preflight){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের Autonomous Project Agent।\\n'+
 'তোমার পরিচয়: Agent Name='+identity.agent_name+', Agent ID='+identity.agent_id+', Task ID='+identity.task_id+', Session ID='+identity.session_id+'.\\n'+
 'তুমি আগে project context inspect করবে, তারপর পরিকল্পনা করবে, তারপর minimal safe change করবে, তারপর verification করবে এবং ব্যর্থ হলে self-repair করবে।\\n'+
 'কখনো main-এ লিখবে না। শুধু agent/* branch। .github/workflows, database, migrations, validation, quran_research.db, schema.sql protected। Merge/deploy করতে পারবে না।\\n'+
 'প্রতিটি নতুন কাজের জন্য নতুন Task ID/Agent identity ব্যবহার করতে হবে। অন্যের অসম্পূর্ণ কাজ নিলে parent task উল্লেখ করে successor হিসেবে handoff record লিখবে।\\n'+
 'কাজ শেষে অবশ্যই persistent task record লিখবে: completed, remaining, changed files, branch, commit/result, verification, handoff এবং next-agent instructions।\\n'+
 'অনুমান করে rewrite নয়; প্রথমে পড়ো। Production-এ কাজ হয়েছে দাবি করবে না।\\n'+
 'প্রথম verification: source/project structure. দ্বিতীয়: runtime-relevant configuration. তৃতীয়: independent final check.\\n'+
 'User-facing report বাংলায় হবে এবং স্পষ্টভাবে বলবে: কী পড়া হয়েছে, কী বদলেছে, কোন branch, কী পরীক্ষা হয়েছে, কী বাকি।\\n'+
 'Preflight project root summary: '+JSON.stringify(preflight);
 let contents=history.slice();
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:5000,temperature:0.1}})});
  const data=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,500));
  const modelContent=data?.candidates?.[0]?.content;if(!modelContent)throw new Error('Gemini response missing content.');
  const calls=(modelContent.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(modelContent.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  contents.push(modelContent);
  const responses=[];
  for(const part of calls){
   const fc=part.functionCall;let result;
   try{result=await executeTool(env,fc.name,fc.args||{},identity,request)}catch(e){result={ok:false,error:String(e?.message||e)}}
   responses.push({functionResponse:{name:fc.name,response:{result}}});
  }
  contents.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'2.0.0',isolated:true,write_scope:'agent/* only',merge:false,deploy:false,identity_registry:true,task_ledger:true,handoff:true,self_repair:true},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 try{
  const body=await request.json();const message=String(body?.message||'').trim();
  if(!message)return json({ok:false,error:'message required'},400,origin);
  if(message.length>MAX_MESSAGE)return json({ok:false,error:'message too large'},413,origin);
  const identity=makeIdentity(message);
  let preflight=[];try{preflight=await listDirectory(env,{path:'',branch:'main'})}catch(e){preflight=[{error:String(e?.message||e)}]}
  const result=await gemini(env,[{role:'user',parts:[{text:message}]}],identity,message,preflight);
  return json({ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'2.0.0',identity,isolated:true,merge:false,deploy:false},200,origin);
 }catch(e){return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800)},500,origin);}
}};
