/* Al-Quran Research — Project Agent Engine v1.1
   Agent: শাহীন
   Role: Project-system hardening / agent safety
   Isolation: agent/* only; merge/deploy disabled
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000;
const MAX_BODY=20000;
const MAX_TURNS=10;
const MAX_SEARCH=30;
const AGENT_NAME='শাহীন';
const AGENT_ROLE='Project Agent Hardening';

function cors(origin){
  return {
    'Access-Control-Allow-Origin':ALLOWED_ORIGINS.includes(origin)?origin:ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Authorization',
    'Content-Type':'application/json; charset=utf-8',
    'Vary':'Origin'
  };
}
function json(data,status,origin){
  return new Response(JSON.stringify(data),{status,headers:cors(origin)});
}
function repo(env){return env.PROJECT_REPO||DEFAULT_REPO;}
function isAgentBranch(b){
  return /^agent\\/[A-Za-z0-9._/-]+$/.test(String(b||''))&&!String(b).includes('..');
}
function safePath(path,write=false){
  const p=String(path||'').replace(/^\\/+?/,'');
  if(!p||p.includes('..')||p.startsWith('.git/')||p.startsWith('.env'))return false;
  if(write){
    const blocked=['.github/','database/','migrations/','validation/'];
    if(blocked.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
  }
  return true;
}
function taskId(){
  const d=new Date();
  const s=d.toISOString().replace(/[-:TZ.]/g,'').slice(0,14);
  const r=Math.random().toString(36).slice(2,7).toUpperCase();
  return 'TASK-'+s+'-'+r;
}
function inferWorkType(message){
  const m=String(message||'').toLowerCase();
  if(/আইকন|icon/.test(m))return 'icon';
  if(/রিডার|reader|কুরআন পাঠ/.test(m))return 'reader';
  if(/চ্যাট|chat/.test(m))return 'chat';
  if(/ডেটা|database|data/.test(m))return 'data';
  if(/টেস্ট|test|যাচাই|verify/.test(m))return 'test';
  if(/নোটিফিকেশন|notification/.test(m))return 'notification';
  return 'system';
}
function agentNameFor(type){
  return {icon:'শাহীন',reader:'সুমন',chat:'শামীম',data:'রাকিব',test:'নাঈম',notification:'তানভীর',system:'আরিফ'}[type]||'আরিফ';
}
function branchSlug(name,type,id){
  const map={শাহীন:'shaheen',সুমন:'sumon',শামীম:'shamim',রাকিব:'rakib',নাঈম:'naim',তানভীর:'tanvir',আরিফ:'arif'};
  return 'agent/'+(map[name]||'arif')+'-'+type+'-'+id.toLowerCase().replace(/[^a-z0-9-]/g,'').slice(-12);
}
async function gh(env,path,init={}){
  if(!env.GITHUB_TOKEN)throw new Error('GITHUB_TOKEN is not configured.');
  const r=await fetch(API+path,{...init,headers:{
    'Accept':'application/vnd.github+json',
    'Authorization':'Bearer '+env.GITHUB_TOKEN,
    'X-GitHub-Api-Version':'2026-03-10',
    'User-Agent':'al-quran-research-project-agent',
    ...(init.headers||{})
  }});
  const text=await r.text();
  let data;try{data=JSON.parse(text)}catch{data={raw:text}}
  if(!r.ok)throw new Error('GitHub HTTP '+r.status+': '+String(data?.message||text).slice(0,500));
  return data;
}
async function readFile(env,args){
  const path=String(args.path||''),branch=String(args.branch||'main');
  if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
  if(data.type!=='file')throw new Error('এটি file নয়।');
  if(Number(data.size||0)>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
  const bin=atob(String(data.content||'').replace(/\\n/g,''));
  const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
  const decoded=new TextDecoder().decode(bytes);
  return {path,branch,sha:data.sha,size:data.size,content:decoded};
}
async function listDirectory(env,args){
  const path=String(args.path||''),branch=String(args.branch||'main');
  if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
  if(!Array.isArray(data))throw new Error('Directory পাওয়া যায়নি।');
  return data.slice(0,200).map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,args){
  const q=String(args.query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
  const data=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
  return (data.items||[]).slice(0,MAX_SEARCH).map(x=>({path:x.path,html_url:x.html_url}));
}
async function createBranch(env,args){
  const branch=String(args.branch||''),base=String(args.base||'main');
  if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
  if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
  const ref=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(base));
  const created=await gh(env,'/repos/'+repo(env)+'/git/refs',{
    method:'POST',
    body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.object.sha}),
    headers:{'Content-Type':'application/json'}
  });
  return {branch,base,sha:created.object.sha};
}
async function writeFile(env,args){
  const path=String(args.path||''),branch=String(args.branch||'');
  if(!isAgentBranch(branch))throw new Error('Write করতে agent/* branch বাধ্যতামূলক। main-এ লেখা নিষিদ্ধ।');
  if(!safePath(path,true))throw new Error('এই protected path-এ agent write করতে পারবে না।');
  const content=String(args.content||'');if(content.length>MAX_FILE)throw new Error('ফাইলটি engine-এর সীমার চেয়ে বড়।');
  let existing=null;
  try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));}catch{}
  const payload={
    message:String(args.message||'AI agent change'),
    content:btoa(unescape(encodeURIComponent(content))),
    branch
  };
  if(existing?.sha)payload.sha=existing.sha;
  const data=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{
    method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}
  });
  return {path,branch,created:!existing?.sha,commit_sha:data.commit?.sha||null,blob_sha:data.content?.sha||null};
}
const TOOLS=[
  {name:'project_read_file',description:'Read a project file before analyzing or editing it.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
  {name:'project_list_directory',description:'List project files/directories.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
  {name:'project_search_code',description:'Search repository code for a term, identifier, class, selector, route or error.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
  {name:'project_create_branch',description:'Create an isolated agent/* branch. Use the assigned agent name and task id in the branch name.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
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
async function gemini(env,history,meta){
  if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
  const model=env.GEMINI_MODEL||'gemini-2.5-flash';
  const system='তুমি আল-কুরআন গবেষণা প্রকল্পের নিরাপদ Autonomous Project Agent। প্রথমে প্রয়োজনীয় প্রকল্প ফাইল/ডিরেক্টরি পড়বে, তারপর code/context বুঝবে, তারপর ন্যূনতম পরিবর্তন করবে। অনুমান করে rewrite করবে না। বর্তমান production/main কখনো লিখবে না। শুধু agent/* branch ব্যবহার করবে। .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql protected। merge/deploy তোমার ক্ষমতার বাইরে। প্রতিটি কাজের Task ID, Agent Name, Work Type, Branch, পড়া ফাইল, পরিবর্তিত ফাইল, commit, completed/remaining, test status এবং handoff তথ্য রিপোর্ট করবে। কোনো কাজ অসম্পূর্ণ হলে পরবর্তী agent-এর জন্য স্পষ্ট handoff তৈরি করবে।';
  let contents=history.slice();
  for(let turn=0;turn<MAX_TURNS;turn++){
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
      body:JSON.stringify({
        systemInstruction:{parts:[{text:system}]},
        contents,
        tools:[{functionDeclarations:TOOLS}],
        generationConfig:{maxOutputTokens:4096,temperature:0.1}
      })
    });
    const data=await r.json();
    if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(data?.error?.message||'').slice(0,400));
    const modelContent=data?.candidates?.[0]?.content;
    if(!modelContent)throw new Error('Gemini response missing content.');
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
  if(request.method==='GET')return json({
    ok:true,service:'al-quran-research-project-agent',
    version:env.AGENT_VERSION||'1.1.0',isolated:true,
    agent_name:AGENT_NAME,agent_role:AGENT_ROLE,
    write_scope:'agent/* only',merge:false,deploy:false
  },200,origin);
  if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
  const auth=request.headers.get('Authorization')||'';
  if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
  try{
    const raw=await request.text();
    if(raw.length>MAX_BODY)return json({ok:false,error:'request too large'},413,origin);
    const body=JSON.parse(raw);
    const message=String(body?.message||'').trim();
    if(!message)return json({ok:false,error:'message required'},400,origin);
    if(message.length>10000)return json({ok:false,error:'message too large'},413,origin);
    const id=String(body?.task_id||taskId());
    const workType=String(body?.work_type||inferWorkType(message));
    const assignedAgent=agentNameFor(workType);
    const suggestedBranch=String(body?.branch||branchSlug(assignedAgent,workType,id));
    const meta={task_id:id,work_type:workType,agent_name:assignedAgent,suggested_branch:suggestedBranch,requested_at:new Date().toISOString()};
    const result=await gemini(env,[{role:'user',parts:[{text:JSON.stringify(meta)+'\\n\\nUSER COMMAND:\\n'+message}]}],meta);
    return json({
      ok:true,answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'1.1.0',
      task:meta,isolated:true,merge:false,deploy:false
    },200,origin);
  }catch(e){
    return json({ok:false,error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,600)},500,origin);
  }
}};