import assert from 'node:assert/strict';
import { loadResearchMemory } from '../backend/research-memory.js';

const originalFetch=globalThis.fetch;
const indexUrl='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/research-records/index.json';
const recordUrl='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/research-records/RR-Q001001-V1.json';
const fixture={
  record_id:'RR-Q001001',version:1,status:'PENDING_REVIEW',
  scope:{ayah_id:'S001-A001'},source_refs:[{source_file:'data/fatiha-master-v1.json'}],
  findings:[],uncertainties:['not verified']
};
const index={schema_version:1,records:[
  {file:'RR-Q001001-V1.json',record_id:'RR-Q001001',version:1,status:'PENDING_REVIEW',ayah_id:'S001-A001',updated_at:'2026-09-08'},
  {file:'../outside.json',record_id:'bad',version:99,ayah_id:'S001-A001'},
  {file:'RR-Q001001-V2.json',record_id:'RR-Q001001-V2',version:2,ayah_id:'S001-A001'}
]};
let calls=[];
globalThis.fetch=async url=>{
  const target=String(url);calls.push(target);
  if(target===indexUrl)return new Response(JSON.stringify(index),{status:200});
  if(target===recordUrl)return new Response(JSON.stringify(fixture),{status:200});
  if(target.endsWith('/RR-Q001001-V2.json'))return new Response(JSON.stringify({...fixture,record_id:'RR-Q001001-V2',version:2}),{status:200});
  throw new Error('unexpected URL');
};
try{
  const ordinary=await loadResearchMemory('কেমন আছেন?');
  assert.equal(ordinary.used,false);
  assert.equal(calls.length,0,'ordinary chat must not fetch research memory');
  const result=await loadResearchMemory('আগের গবেষণা সূরা ফাতিহা');
  assert.equal(result.used,true);
  assert.equal(result.records.length,2);
  assert.equal(result.records[0].version,2);
  assert.equal(result.records[1].status,'PENDING_REVIEW');
  assert.match(result.context,/READ_ONLY_VERSIONED_RESEARCH_MEMORY/);
  assert.ok(!calls.some(x=>x.includes('..')),'manifest traversal entry must be ignored');
  calls=[];
  const scoped=await loadResearchMemory('S001-A001 গবেষণা');
  assert.equal(scoped.records.length,2);
  const brokenFetch=globalThis.fetch;
  globalThis.fetch=async()=>new Response('{}',{status:200});
  const invalid=await loadResearchMemory('গবেষণা');
  assert.equal(invalid.used,false,'invalid index schema must fail closed');
  globalThis.fetch=brokenFetch;
  console.log('PASS: index-driven version discovery, scope filtering, immutable status preservation, path allow-list, and fail-closed behavior.');
} finally {
  globalThis.fetch=originalFetch;
}
