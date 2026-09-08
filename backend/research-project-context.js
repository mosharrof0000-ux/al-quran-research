/* আল-কুরআন গবেষণা — Read-only Project Context Loader v1
   Loads the project's public governance/research documents for the AI at runtime.
   This does not modify project files or research data.
*/

const BASE='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/';
const FILES=[
  ['MASTER_PROJECT.md','প্রকল্পের মূল নীতি'],
  ['README.md','প্রকল্পের স্থাপত্য ও Data flow'],
  ['BACKUP_SYSTEM.md','Backup ও change discipline'],
  ['docs/AI_RESEARCH_AGENT_SYSTEM_V1.md','AI Research Agent rules'],
  ['docs/AI_RESEARCH_BRAIN_V1.md','AI Research Brain specification'],
  ['docs/RESEARCH_CHAIN_OF_COMMAND.md','গবেষণা audit chain'],
  ['docs/PROJECT_COMMENTS.md','প্রস্তাব ও সিদ্ধান্ত রেজিস্টার'],
  ['docs/OUR_THINKING_AND_VISION.md','প্রকল্পের vision'],
  ['docs/TECHNOLOGY_WATCH.md','Technology Watch'],
  ['docs/master-architecture-v1.md','Research architecture']
];

function cacheRequest(){return new Request('https://cache.local/al-quran-research:project-context:v1');}

function trimDocument(text,max=6000){
  const value=String(text||'');
  return value.length>max ? value.slice(0,max)+'\n[এই নথির বাকি অংশ সীমিত করা হয়েছে; প্রয়োজন হলে নির্দিষ্ট নথি আলাদাভাবে পড়তে হবে।]' : value;
}

export async function loadProjectContext(){
  const cacheKey=cacheRequest();
  const cached=await caches.default.match(cacheKey);
  if(cached){try{return await cached.text();}catch{}}

  const parts=await Promise.all(FILES.map(async ([path,label])=>{
    try{
      const r=await fetch(BASE+path,{cf:{cacheTtl:600}});
      if(!r.ok)return `### ${label} (${path})\n[নথি পাওয়া যায়নি: HTTP ${r.status}]`;
      return `### ${label} (${path})\n${trimDocument(await r.text())}`;
    }catch(e){
      return `### ${label} (${path})\n[নথি পড়া যায়নি: ${String(e?.message||e).slice(0,160)}]`;
    }
  }));

  const context=`এই অংশটি আল-কুরআন গবেষণা প্রকল্পের সর্বশেষ public GitHub নথি থেকে read-only runtime context হিসেবে আনা হয়েছে। এটি গবেষণার raw data নয়।\n\n${parts.join('\n\n')}`;
  try{await caches.default.put(cacheKey,new Response(context,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=600'}}));}catch{}
  return context;
}
