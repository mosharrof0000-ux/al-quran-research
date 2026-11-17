/* Read-only versioned Research Memory.
   The manifest is updated by the human-approved record workflow.
   AI retrieval never writes records or changes their verification status.
*/
const INDEX_URL='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/research-records/index.json';
const RECORDS_BASE='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/research-records/';
const MAX_RECORDS=8;
const FILE_PATTERN=/^[A-Za-z0-9_-]+\.json$/;
const RECORD_STATUSES=new Set(['DRAFT','PENDING_REVIEW','VERIFIED','DISPUTED','SUPERSEDED']);
function isResearchQuery(text){
 return /গবেষণা|আগের গবেষণা|পূর্ববর্তী গবেষণা|source|উৎস|প্রমাণ|রেকর্ড|record|Q\d{6}|S\d{3}-A\d{3}|ফাতিহা|fatiha/i.test(text);
}
function selectEntries(entries,text){
 const id=(text.match(/S\d{3}-A\d{3}/i)||[])[0]?.toUpperCase()||null;
 const fatiha=/Q001001|ফাতিহা|fatiha/i.test(text);
 let selected=entries.filter(x=>x&&typeof x.file==='string'&&FILE_PATTERN.test(x.file)&&x.file!=='index.json'&&x.file!=='RR-Q001001-V1.schema.json');
 if(id)selected=selected.filter(x=>String(x.ayah_id||'').toUpperCase()===id);
 else if(fatiha)selected=selected.filter(x=>String(x.ayah_id||'').toUpperCase()==='S001-A001'||String(x.record_id||'').includes('Q001001'));
 selected.sort((a,b)=>Number(b.version||0)-Number(a.version||0)||String(b.updated_at||'').localeCompare(String(a.updated_at||'')));
 return selected.slice(0,MAX_RECORDS);
}
export async function loadResearchMemory(message=''){
 const query=String(message||'');
 if(!isResearchQuery(query))return {context:'',records:[],used:false};
 try{
  const indexResponse=await fetch(INDEX_URL,{cache:'no-store'});
  if(!indexResponse.ok)return {context:'',records:[],used:false};
  const index=await indexResponse.json();
  if(index?.schema_version!==1||!Array.isArray(index.records))return {context:'',records:[],used:false};
  const entries=selectEntries(index.records,query);
  const records=[];
  for(const entry of entries){
   try{
    const response=await fetch(RECORDS_BASE+entry.file,{cache:'no-store'});
    if(!response.ok)continue;
    const data=await response.json();
    if(!data||typeof data.record_id!=='string'||!Number.isInteger(data.version)||data.version<1)continue;
    if(data.record_id!==entry.record_id||data.version!==Number(entry.version))continue;
    if(!RECORD_STATUSES.has(data.status)||data.status!==entry.status)continue;
    if(entry.ayah_id&&data.scope?.ayah_id!==entry.ayah_id)continue;
    records.push(data);
   }catch{}
  }
  if(!records.length)return {context:'',records:[],used:false};
  return {context:JSON.stringify({memory_type:'READ_ONLY_VERSIONED_RESEARCH_MEMORY',index_version:index.schema_version,records},null,2).slice(0,16000),records,used:true};
 }catch{return {context:'',records:[],used:false};}
}
