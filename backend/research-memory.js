/* Read-only Research Memory layer.
   It retrieves versioned records from the project repository and never writes data. */
const MEMORY_BASE='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/research-records/';
const RECORDS=['RR-Q001001-V1.json'];

export async function loadResearchMemory(message=''){
 const text=String(message||'');
 const wantsResearch=/গবেষণা|আগের গবেষণা|পূর্ববর্তী গবেষণা|source|উৎস|প্রমাণ|রেকর্ড|record|Q\d{6}|ফাতিহা/.test(text);
 if(!wantsResearch)return {context:'',records:[],used:false};
 const records=[];
 for(const name of RECORDS){
  try{const r=await fetch(MEMORY_BASE+name);if(!r.ok)continue;const data=await r.json();
   const hay=JSON.stringify(data);
   if(/Q001001|S001-A001|ফাতিহা|RR-Q001001/i.test(text) || /Q001001|S001-A001|ফাতিহা/i.test(hay)) records.push(data);
  }catch{}
 }
 if(!records.length)return {context:'',records:[],used:false};
 return {context:JSON.stringify({memory_type:'READ_ONLY_VERSIONED_RESEARCH_MEMORY',records},null,2).slice(0,12000),records,used:true};
}
