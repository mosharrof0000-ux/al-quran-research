const ORIGIN="https://mosharrof0000-ux.github.io";
const REPO="mosharrof0000-ux/al-quran-research";
const PROTECTED=[".github/","database/","migrations/","validation/","quran_research.db","schema.sql","wrangler.toml"];
const NAME_MAP=[
 ["icon","শাহীন"],["svg","শাহীন"],["font","শাহীন"],
 ["reader","সুমন"],["quran","সুমন"],["translation","সুমন"],["pronunciation","সুমন"],["data","সুমন"],
 ["test","নাঈম"],["verify","নাঈম"],["browser","নাঈম"],["console","নাঈম"],["network","নাঈম"],
 ["notification","রাকিব"],["release","রাকিব"],
 ["backend","সজীব"],["worker","সজীব"],["api","সজীব"],["connection","সজীব"],
 ["database","আরিফ"],["schema","আরিফ"],["migration","আরিফ"],
 ["documentation","তানভীর"],["docs","তানভীর"],["instruction","তানভীর"],["protocol","তানভীর"]
];
const MAX_FILE=120000, MAX_TURNS=12, MAX_REQUEST=8000;
const headers=o=>({"Access-Control-Allow-Origin":o===ORIGIN?o:ORIGIN,"Access-Control-Allow-Headers":"content-type,x-agent-access-token","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Content-Type":"application/json; charset=utf-8"});
const out=(x,s,o)=>new Response(JSON.stringify(x),{status:s,headers:headers(o)});
const safe=p=>typeof p==="string"&&p.length<500&&!p.includes("..")&&!p.startsWith("/")&&!p.includes("\\");
const writable=p=>safe(p)&&!PROTECTED.some(x=>p===x||p.startsWith(x));
const branchOk=b=>typeof b==="string"&&/^agent\/[a-z0-9][a-z0-9._-]{2,100}$/.test(b);
const slug=s=>String(s||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,50)||"task";
function chooseName(s=""){const m=s.toLowerCase();for(const [k,n] of NAME_MAP)if(m.includes(k))return n;return "রায়হান";}
function identity(request){
 const stamp=new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14);
 const agentName=chooseName(request);
 const taskId="TASK-"+stamp+"-"+crypto.randomUUID().slice(0,6).toUpperCase();
 return {task_id:taskId,session_id:"SESSION-"+crypto.randomUUID().slice(0,8).toUpperCase(),agent_id:"AGENT-"+agentName+"-"+crypto.randomUUID().slice(0,8).toUpperCase(),agent_name:agentName,work_type:"autonomous-project-work"};
}
async function gh(env,path,opt={}){
 if(!env.GITHUB_TOKEN)throw Error("GITHUB_TOKEN missing");
 const r=await fetch("https://api.github.com"+path,{...opt,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+env.GITHUB_TOKEN,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"Al-Quran-Research-Agent/3.0",...(opt.headers||{})}});
 const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={raw:t}} if(!r.ok)throw Error("GitHub "+r.status+": "+(d.message||t.slice(0,300))); return d;
}
async function read(env,a){
 if(!safe(a.path))throw Error("Unsafe path");
 const d=await gh(env,"/repos/"+REPO+"/contents/"+a.path+(a.ref?"?ref="+encodeURIComponent(a.ref):""));
 if(Array.isArray(d)||!d.content)throw Error("Not a file");
 const bin=atob(d.content.replace(/\n/g,"")); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0)); const c=new TextDecoder().decode(bytes);
 if(c.length>MAX_FILE)throw Error("File too large");
 return {path:a.path,ref:a.ref||"main",sha:d.sha,size:c.length,content:c};
}
async function list(env,a){if(a.path&&!safe(a.path))throw Error("Unsafe path");const d=await gh(env,"/repos/"+REPO+"/contents/"+(a.path||"")+(a.ref?"?ref="+encodeURIComponent(a.ref):""));return Array.isArray(d)?d.map(x=>({name:x.name,path:x.path,type:x.type,size:x.size,sha:x.sha})):d;}
async function search(env,a){if(!a.query||a.query.length>200)throw Error("Invalid query");const d=await gh(env,"/search/code?q="+encodeURIComponent(a.query+" repo:"+REPO));return(d.items||[]).slice(0,20).map(x=>({name:x.name,path:x.path,url:x.html_url}));}
async function commits(env){const d=await gh(env,"/repos/"+REPO+"/commits?per_page=15");return d.map(x=>({sha:x.sha,message:x.commit?.message?.split("\n")[0],date:x.commit?.committer?.date,url:x.html_url}));}
async function compare(env,a){const d=await gh(env,"/repos/"+REPO+"/compare/"+encodeURIComponent(a.base)+"..."+encodeURIComponent(a.head));return{status:d.status,ahead_by:d.ahead_by,behind_by:d.behind_by,total_commits:d.total_commits,files:(d.files||[]).slice(0,100).map(x=>({filename:x.filename,status:x.status,additions:x.additions,deletions:x.deletions,changes:x.changes}))};}
async function makeBranch(env,a){if(!branchOk(a.branch)||a.base!=="main")throw Error("Only new agent/* branches from main are allowed");const r=await gh(env,"/repos/"+REPO+"/git/ref/heads/main");await gh(env,"/repos/"+REPO+"/git/refs",{method:"POST",body:JSON.stringify({ref:"refs/heads/"+a.branch,sha:r.object.sha})});return{branch:a.branch,base:"main",sha:r.object.sha};}
async function write(env,a){if(!branchOk(a.branch)||!writable(a.path))throw Error("Write blocked by safety policy");if(typeof a.content!=="string"||a.content.length>MAX_FILE)throw Error("Content too large");const old=await gh(env,"/repos/"+REPO+"/contents/"+a.path+"?ref="+encodeURIComponent(a.branch)).catch(()=>null);const body={message:a.message,content:btoa(unescape(encodeURIComponent(a.content))),branch:a.branch};if(old?.sha)body.sha=old.sha;const d=await gh(env,"/repos/"+REPO+"/contents/"+a.path,{method:"PUT",body:JSON.stringify(body)});return{path:a.path,branch:a.branch,commit:d.commit?.sha,content_sha:d.content?.sha};}
const tools=[
 {name:"project_read_file",description:"Read a project file before editing.",parameters:{type:"OBJECT",properties:{path:{type:"STRING"},ref:{type:"STRING"}},required:["path"]}},
 {name:"project_list_directory",description:"Inspect project tree.",parameters:{type:"OBJECT",properties:{path:{type:"STRING"},ref:{type:"STRING"}}}},
 {name:"project_search_code",description:"Search project code.",parameters:{type:"OBJECT",properties:{query:{type:"STRING"}},required:["query"]}},
 {name:"project_recent_commits",description:"Inspect recent project history.",parameters:{type:"OBJECT",properties:{}}},
 {name:"project_compare_refs",description:"Compare refs before promotion.",parameters:{type:"OBJECT",properties:{base:{type:"STRING"},head:{type:"STRING"}},required:["base","head"]}},
 {name:"project_create_branch",description:"Create an isolated agent branch from main.",parameters:{type:"OBJECT",properties:{branch:{type:"STRING"},base:{type:"STRING"}},required:["branch","base"]}},
 {name:"project_write_file",description:"Write only safe files on agent/* branches; read-back is mandatory.",parameters:{type:"OBJECT",properties:{branch:{type:"STRING"},path:{type:"STRING"},content:{type:"STRING"},message:{type:"STRING"}},required:["branch","path","content","message"]}}
];
async function gemini(env,contents,who){
 if(!env.GEMINI_API_KEY)throw Error("GEMINI_API_KEY missing");
 const model=env.GEMINI_MODEL||"gemini-2.5-flash";
 const u="https://generativelanguage.googleapis.com/v1beta/models/"+model+":generateContent?key="+encodeURIComponent(env.GEMINI_API_KEY);
 const sys=`You are the isolated Al-Quran Research Project Agent. Identity: ${who.agent_name}, Agent ID ${who.agent_id}, Task ${who.task_id}. Inspect first; use project governance; make the smallest safe change; verify every write by reading it back; compare branch with main; never write main; never write protected paths; never merge or deploy; never claim live verification without evidence. If incomplete or blocked, return a precise handoff with completed, remaining, changed files, branch, commits, blocker and next action. Preserve research data and existing UI.`;
 const r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:sys}]},contents,tools:[{function_declarations:tools}],generationConfig:{temperature:.1,maxOutputTokens:6000}})});
 const d=await r.json(); if(!r.ok)throw Error("Gemini "+r.status+": "+(d.error?.message||"request failed")); return d;
}
async function run(env,request,who){
 const c=[{role:"user",parts:[{text:request}]}],events=[];
 for(let turn=1;turn<=MAX_TURNS;turn++){
  const d=await gemini(env,c,who),parts=d.candidates?.[0]?.content?.parts||[],calls=parts.filter(x=>x.functionCall),txt=parts.filter(x=>x.text).map(x=>x.text).join("\n");
  events.push({turn,tool_calls:calls.length});
  if(!calls.length)return{answer:txt||"No textual result.",events};
  c.push({role:"model",parts});const rs=[];
  for(const p of calls){let a=p.functionCall.args||{},v;try{switch(p.functionCall.name){case"project_read_file":v=await read(env,a);break;case"project_list_directory":v=await list(env,a);break;case"project_search_code":v=await search(env,a);break;case"project_recent_commits":v=await commits(env);break;case"project_compare_refs":v=await compare(env,a);break;case"project_create_branch":v=await makeBranch(env,a);break;case"project_write_file":v=await write(env,a);break;default:throw Error("Unknown tool")}}catch(e){v={error:String(e.message||e)}}rs.push({functionResponse:{name:p.functionCall.name,response:v}})}c.push({role:"user",parts:rs});
 }
 return{answer:"Controlled tool-loop limit reached.",events,handoff_required:true};
}
export default{async fetch(req,env){
 const o=req.headers.get("Origin")||"";
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:headers(o)});
 if(new URL(req.url).pathname==="/")return out({service:"al-quran-research-project-agent-v3",version:env.AGENT_VERSION||"3.0.0",isolated:true,write_scope:"agent/* only",merge:false,deploy:false,protected_paths:PROTECTED,verification:"inspect-write-readback-compare"},200,o);
 if(req.method!=="POST")return out({error:"POST required"},405,o);
 if(!env.AGENT_ACCESS_TOKEN||req.headers.get("x-agent-access-token")!==env.AGENT_ACCESS_TOKEN)return out({error:"Unauthorized"},401,o);
 let b;try{b=await req.json()}catch{return out({error:"Invalid JSON"},400,o)}
 const request=String(b.request||"").trim();if(!request||request.length>MAX_REQUEST)return out({error:"request must be 1-8000 chars"},400,o);
 const who=identity(request);
 try{const result=await run(env,request,who);return out({ok:true,identity:who,result,status:result.handoff_required?"HANDOFF_REQUIRED":"RESPONSE_READY"},200,o)}
 catch(e){return out({ok:false,identity:who,status:"BLOCKED",handoff_required:true,error:String(e.message||e)},500,o)}
}};