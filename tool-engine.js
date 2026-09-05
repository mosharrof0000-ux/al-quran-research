/* আল-কুরআন গবেষণা — Universal Tool Engine v1.0
   Chat Box-কে ভবিষ্যৎ Research Laboratory-এর controller হিসেবে প্রস্তুত করার ভিত্তি।
   Tool = capability; Workspace/Data/UI আলাদা থাকবে।
*/
(function(){
'use strict';
const registry=new Map();
function normalize(tool){
  if(!tool||!tool.id) throw new Error('Tool-এর id প্রয়োজন।');
  return Object.assign({version:'1.0',status:'active',capabilities:[],permissions:[],description:'',handler:null},tool);
}
function register(tool){
  const t=normalize(tool);
  registry.set(t.id,t);
  return describe(t.id);
}
function list(){return Array.from(registry.values()).map(publicTool)}
function find(query){
  if(!query)return null;
  const q=String(query).toLowerCase();
  return Array.from(registry.values()).find(t=>t.id.toLowerCase()===q)||Array.from(registry.values()).find(t=>(t.name||'').toLowerCase().includes(q)||(t.capabilities||[]).some(x=>String(x).toLowerCase().includes(q)))||null;
}
function publicTool(t){return {id:t.id,name:t.name,version:t.version,status:t.status,capabilities:t.capabilities,permissions:t.permissions,description:t.description}}
function describe(id){const t=registry.get(id)||find(id);return t?publicTool(t):null}
async function execute(id,input,context){
  const t=registry.get(id)||find(id);
  if(!t) throw new Error('Tool পাওয়া যায়নি: '+id);
  if(t.status!=='active') throw new Error('Tool সক্রিয় নয়: '+t.id);
  if(typeof t.handler!=='function') return {ok:true,tool:t.id,version:t.version,status:'registered',message:'Tool নিবন্ধিত আছে; execution handler এখনো সংযুক্ত হয়নি।'};
  return await t.handler(input,context||{});
}
window.AlQuranToolEngine={register,list,find,describe,execute};
})();
