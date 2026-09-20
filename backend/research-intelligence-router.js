/* Al-Quran Research — Research Intelligence Router v1.0
   Query understanding only. It does not create or verify research facts.
*/
export const RESEARCH_ROUTER_VERSION='1.0';

const patterns=[
  {type:'ayah',keys:['আয়াত','আয়াত','সূরা','সুরা','verse','ayat']},
  {type:'word',keys:['শব্দ','word','মূল শব্দ','lemma']},
  {type:'root',keys:['root','ধাতু','রুট']},
  {type:'grammar',keys:['ব্যাকরণ','grammar','syntax','নাহু','ইরাব']},
  {type:'morphology',keys:['morphology','রূপতত্ত্ব','সরফ']},
  {type:'concordance',keys:['একই শব্দ','concordance','কোথায় কোথায়','frequency']},
  {type:'translation_comparison',keys:['অনুবাদ তুলনা','তুলনা','translation comparison']},
  {type:'math',keys:['গাণিতিক','গণনা','সংখ্যা','পরিসংখ্যান','statistics','math']},
  {type:'topic',keys:['বিষয়','থিম','topic','theme']},
  {type:'research',keys:['গবেষণা','research','evidence','প্রমাণ']}
];

export function classifyResearchQuery(message){
  const text=String(message||'').toLowerCase().trim();
  const types=[];
  for(const p of patterns) if(p.keys.some(k=>text.includes(k.toLowerCase()))) types.push(p.type);
  const privateRequested=/private|ব্যক্তিগত|প্রাইভেট|লক|locked|ইসলামিক ফাউন্ডেশন/i.test(text);
  return {
    router_version:RESEARCH_ROUTER_VERSION,
    intent:types[0]||'general',
    intents:[...new Set(types)],
    private_source_requested:privateRequested,
    research_mode:types.length>0||privateRequested
  };
}
