/* Al-Quran Research — Project Agent Engine v3
   Governed autonomous engineering agent.
   Safe order: inspect -> understand -> isolate -> edit -> verify -> handoff.
   Never writes main, never merges, never deploys.
*/
const ALLOWED_ORIGINS=['https://mosharrof0000-ux.github.io'];
const API='https://api.github.com';
const DEFAULT_REPO='mosharrof0000-ux/al-quran-research';
const MAX_FILE=120000, MAX_TURNS=12, MAX_CONTEXT=60000, MAX_MESSAGE=12000;
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
function slug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48)||'task';}
function chooseName(m){const s=String(m||'').toLowerCase();for(const [k,n] of NAME_MAP)if(s.includes(k))return n;return 'শামীম';}
function taskIdentity(body){
 const message=String(body?.message||'').trim();
 const taskId=String(body?.task_id||('TASK-'+new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14)));
 const sessionId=String(body?.session_id||('SESSION-'+crypto.randomUUID()));
 const agentName=String(body?.agent_name||chooseName(message));
 const agentId=String(body?.agent_id||('AGENT-'+slug(agentName)+'-'+taskId.slice(-8)));
 const workType=String(body?.work_type||'general-project-work');
 const parentTaskId=String(body?.parent_task_id||'');
 const requestedBranch=String(body?.branch||'');
 return {message,taskId,sessionId,agentName,agentId,workType,parentTaskId,requestedBranch};
}
function safePath(path,write=false){
 const p=String(path||'').replace(/^\/+/, '');
 if(!p||p.includes('..')||p.startsWith('.git/')||p.includes('\\'))return false;
 if(write){
  const blocked=['.github/','database/','migrations/','validation/'];
  if(blocked.some(x=>p.startsWith(x))||['quran_research.db','schema.sql'].includes(p))return false;
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
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(d.type!=='file')throw new Error('এটি file নয়।');
 if(Number(d.size||0)>MAX_FILE)throw new Error('ফাইলটি engine limit-এর চেয়ে বড়।');
 const bin=atob(String(d.content||'').replace(/\n/g,''));
 const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
 return {path,branch,sha:d.sha,size:d.size,content:new TextDecoder().decode(bytes)};
}
async function listDir(env,{path='',branch='main'}){
 if(!safePath(path))throw new Error('এই path অনুমোদিত নয়।');
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch));
 if(!Array.isArray(d))throw new Error('Directory পাওয়া যায়নি।');
 return d.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size||0}));
}
async function searchCode(env,{query}){
 const q=String(query||'').trim();if(!q)throw new Error('search query প্রয়োজন।');
 const d=await gh(env,'/search/code?q='+encodeURIComponent(q+' repo:'+repo(env)));
 return (d.items||[]).slice(0,30).map(x=>({path:x.path,url:x.html_url}));
}
async function branchStatus(env,{branch='main'}){
 if(branch!=='main'&&!isAgentBranch(branch))throw new Error('branch অনুমোদিত নয়।');
 const d=await gh(env,'/repos/'+repo(env)+'/git/ref/heads/'+encodeURIComponent(branch));
 return {branch,sha:d.object.sha};
}
async function recentCommits(env,{branch='main',limit=15}){
 const n=Math.min(Math.max(Number(limit)||15,1),30);
 const d=await gh(env,'/repos/'+repo(env)+'/commits?sha='+encodeURIComponent(branch)+'&per_page='+n);
 return (d||[]).map(x=>({sha:x.sha,message:x.commit?.message||'',date:x.commit?.committer?.date||'',url:x.html_url}));
}
async function compareRefs(env,{base='main',head}){
 if(!head||!isAgentBranch(head))throw new Error('head agent/* branch প্রয়োজন।');
 const d=await gh(env,'/repos/'+repo(env)+'/compare/'+encodeURIComponent(base)+'...'+encodeURIComponent(head));
 return {status:d.status,ahead_by:d.ahead_by,behind_by:d.behind_by,total_commits:d.total_commits,files:(d.files||[]).map(x=>({path:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes}))};
}
async function workHistory(env,{branch='main'}){
 try{return await listDir(env,{path:'docs/agent-work',branch})}catch{return []}
}
async function createBranch(env,{branch,base='main'}){
 if(!isAgentBranch(branch))throw new Error('শুধু agent/* branch তৈরি করা যাবে।');
 if(base!=='main'&&!isAgentBranch(base))throw new Error('base branch অনুমোদিত নয়।');
 try{return {branch,base,existing:true,sha:(await branchStatus(env,{branch})).sha}}catch{}
 const ref=await branchStatus(env,{branch:base});
 const d=await gh(env,'/repos/'+repo(env)+'/git/refs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ref:'refs/heads/'+branch,sha:ref.sha})});
 return {branch,base,existing:false,sha:d.object.sha};
}
async function writeFile(env,{path,branch,content,message}){
 if(!isAgentBranch(branch))throw new Error('main-এ write নিষিদ্ধ; agent/* branch প্রয়োজন।');
 if(!safePath(path,true))throw new Error('protected path-এ agent write করতে পারবে না।');
 const text=String(content||'');if(text.length>MAX_FILE)throw new Error('ফাইলটি engine limit-এর চেয়ে বড়।');
 let existing=null;try{existing=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref='+encodeURIComponent(branch))}catch{}
 const payload={message:String(message||'AI agent change'),content:btoa(unescape(encodeURIComponent(text))),branch};
 if(existing?.sha)payload.sha=existing.sha;
 const d=await gh(env,'/repos/'+repo(env)+'/contents/'+path.split('/').map(encodeURIComponent).join('/'),{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 return {path,branch,created:!existing?.sha,commit_sha:d.commit?.sha||null};
}
const TOOLS=[
 {name:'project_get_branch_status',description:'Inspect branch and latest commit.',parameters:{type:'object',properties:{branch:{type:'string'}},required:['branch']}},
 {name:'project_recent_commits',description:'Inspect recent project commits before changing related work.',parameters:{type:'object',properties:{branch:{type:'string'},limit:{type:'integer'}},required:['branch']}},
 {name:'project_compare_refs',description:'Compare an agent branch with main to understand existing work and drift.',parameters:{type:'object',properties:{base:{type:'string'},head:{type:'string'}},required:['head']}},
 {name:'project_search_work_history',description:'Inspect persistent agent work records under docs/agent-work.',parameters:{type:'object',properties:{branch:{type:'string'}},required:['branch']}},
 {name:'project_read_file',description:'Read a repository file before making decisions.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_list_directory',description:'Inspect a project directory.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'}},required:['path']}},
 {name:'project_search_code',description:'Search repository code for identifiers or terms.',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}},
 {name:'project_create_branch',description:'Create an isolated agent/* branch from main or another agent branch.',parameters:{type:'object',properties:{branch:{type:'string'},base:{type:'string'}},required:['branch']}},
 {name:'project_write_file',description:'Create or replace a text file only on an agent/* branch. Never write protected paths.',parameters:{type:'object',properties:{path:{type:'string'},branch:{type:'string'},content:{type:'string'},message:{type:'string'}},required:['path','branch','content','message']}}
];
async function execute(env,name,args){
 if(name==='project_get_branch_status')return branchStatus(env,args);
 if(name==='project_recent_commits')return recentCommits(env,args);
 if(name==='project_compare_refs')return compareRefs(env,args);
 if(name==='project_search_work_history')return workHistory(env,args.branch);
 if(name==='project_read_file')return readFile(env,args);
 if(name==='project_list_directory')return listDir(env,args);
 if(name==='project_search_code')return searchCode(env,args);
 if(name==='project_create_branch')return createBranch(env,args);
 if(name==='project_write_file')return writeFile(env,args);
 throw new Error('Unknown tool: '+name);
}
function compact(c){let total=0,out=[];for(let i=c.length-1;i>=0;i--){const n=JSON.stringify(c[i]).length;if(total+n>MAX_CONTEXT)break;out.unshift(c[i]);total+=n;}return out;}
function taskRecord(task,status,report,extra=''){
 return ['# Agent Work Record — '+task.taskId,'','- Agent Name: '+task.agentName,'- Agent ID: '+task.agentId,'- Session ID: '+task.sessionId,'- Work Type: '+task.workType,'- Branch: '+task.branch,'- Parent Task ID: '+(task.parentTaskId||'NONE'),'- Status: '+status,'','## Request',task.message,'','## Agent Report',report||'(no report)','', '## Verification Boundary','This task is isolated. Merge/deploy/live success are not claimed.','', '## Handoff',extra||'If incomplete, create a new Agent ID and Task ID; preserve this record.'].join('\\n');
}
async function gemini(env,task){
 if(!env.GEMINI_API_KEY)throw new Error('GEMINI_API_KEY is not configured.');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const system='তুমি আল-কুরআন গবেষণা প্রকল্পের governed Project Agent। পরিচয়: '+task.agentName+' / '+task.agentId+'; Task: '+task.taskId+'; Session: '+task.sessionId+'; Work Type: '+task.workType+'; Branch: '+task.branch+'. প্রথমে বর্তমান main/target context এবং prior work/history inspect করবে। তারপর root cause ও minimal safe plan নির্ধারণ করবে। প্রয়োজন হলে নতুন agent branch ব্যবহার করবে। অনুমান করে rewrite করবে না। শুধুই agent/* branch-এ write করবে। .github/workflows, database, migrations, validation, quran_research.db, schema.sql protected। কাজ শেষে completed, changed files, commits, verification, remaining, blockers এবং handoff state স্পষ্ট করবে। merge/deploy/live success দাবি করবে না।';
 let c=[{role:'user',parts:[{text:task.message}]}];
 for(let turn=0;turn<MAX_TURNS;turn++){
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:compact(c),tools:[{functionDeclarations:TOOLS}],generationConfig:{maxOutputTokens:4096,temperature:0.1}})});
  const d=await r.json();if(!r.ok)throw new Error('Gemini HTTP '+r.status+': '+String(d?.error?.message||'').slice(0,500));
  const mc=d?.candidates?.[0]?.content;if(!mc)throw new Error('Gemini response missing content.');
  const calls=(mc.parts||[]).filter(p=>p.functionCall);
  if(!calls.length)return {answer:(mc.parts||[]).map(p=>p.text||'').join('').trim(),model,turns:turn+1};
  c.push(mc);
  const responses=[];
  for(const p of calls){let result;try{result=await execute(env,p.functionCall.name,p.functionCall.args||{})}catch(e){result={ok:false,error:String(e?.message||e)}}responses.push({functionResponse:{name:p.functionCall.name,response:{result}}});}
  c.push({role:'user',parts:responses});
 }
 throw new Error('Agent tool loop limit reached.');
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin')||'';
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
 if(request.method==='GET')return json({ok:true,service:'al-quran-research-project-agent',version:env.AGENT_VERSION||'3.0.0',capabilities:['identity','history','inspection','comparison','isolated-write','handoff'],write_scope:'agent/* only',merge:false,deploy:false},200,origin);
 if(request.method!=='POST')return json({ok:false,error:'POST/GET only'},405,origin);
 const auth=request.headers.get('Authorization')||'';
 if(!env.AGENT_ACCESS_TOKEN||auth!=='Bearer '+env.AGENT_ACCESS_TOKEN)return json({ok:false,error:'Unauthorized'},401,origin);
 let task=null;
 try{
  const body=await request.json();task=taskIdentity(body);
  if(!task.message)return json({ok:false,error:'message required'},400,origin);
  if(task.message.length>MAX_MESSAGE)return json({ok:false,error:'message too large'},413,origin);
  let branch=task.requestedBranch;
  if(!isAgentBranch(branch))branch='agent/'+slug(task.agentName)+'-'+slug(task.taskId);
  task.branch=branch;
  await createBranch(env,{branch,base:'main'});
  const result=await gemini(env,task);
  const record=taskRecord(task,'COMPLETED',result.answer,'No merge/deploy performed. If more work remains, successor must use a new identity.');
  let saved=null;try{saved=await writeFile(env,{path:'docs/agent-work/'+slug(task.taskId)+'.md',branch,content:record,message:'Record '+task.taskId})}catch(e){saved={error:String(e?.message||e)}}
  return json({ok:true,status:'COMPLETED',answer:result.answer,provider:result.model,agent_version:env.AGENT_VERSION||'3.0.0',task:{task_id:task.taskId,agent_name:task.agentName,agent_id:task.agentId,session_id:task.sessionId,work_type:task.workType,branch,parent_task_id:task.parentTaskId},turns:result.turns,record:saved,merge:false,deploy:false},200,origin);
 }catch(e){
  if(task){
   const branch=task.branch;let handoff=null;
   if(isAgentBranch(branch))try{handoff=await writeFile(env,{path:'docs/agent-work/'+slug(task.taskId)+'.md',branch,content:taskRecord(task,'BLOCKED','Agent failed: '+String(e?.message||e),'HANDOFF REQUIRED — successor must inspect this record and continue with a new Agent ID/Task ID.'),message:'Record blocked handoff '+task.taskId})}catch{}
   return json({ok:false,status:'BLOCKED',error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800),handoff_required:true,handoff},500,origin);
  }
  return json({ok:false,status:'BLOCKED',error:'PROJECT_AGENT_FAILED',detail:String(e?.message||e).slice(0,800),handoff_required:true},500,origin);
 }
}};