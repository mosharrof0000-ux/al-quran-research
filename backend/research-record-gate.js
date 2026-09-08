/* Approval-gated research record helper.
   It never writes to GitHub or the master dataset.
   It creates a saveable proposal only; persistent save remains a separate approved operation. */

export function buildResearchRecordProposal({message='', answer='', researchProvenance=null, memoryRecords=[]}={}){
 const sourceRefs=[];
 if(researchProvenance?.source_file){
  sourceRefs.push({source_file:researchProvenance.source_file,dataset_version:researchProvenance.dataset_version||null,ayah_id:researchProvenance.ayah_id||null,token_ids:researchProvenance.token_ids||[]});
 }
 for(const r of memoryRecords||[]){
  if(r?.record_id)sourceRefs.push({record_id:r.record_id,version:r.version||null,status:r.status||null,ayah_id:r.scope?.ayah_id||null});
 }
 return {
  record_id_proposal:'NEW-RESEARCH-RECORD',
  version:1,
  status:'PENDING_REVIEW',
  question:String(message).trim(),
  objective:'এই AI গবেষণা-উত্তরের সংরক্ষণযোগ্য ফল আলাদা versioned research record হিসেবে রাখার প্রস্তাব।',
  scope:{ayah_id:researchProvenance?.ayah_id||null},
  source_refs:sourceRefs,
  evidence_refs:researchProvenance?.evidence_records||[],
  findings:answer?[{text:String(answer).trim(),status:'PENDING_REVIEW'}]:[],
  uncertainties:['AI-generated output নিজে থেকে VERIFIED নয়।','মানব অনুমোদন ছাড়া persistent save করা যাবে না।'],
  created_at:new Date().toISOString(),
  supersedes:null,
  save_policy:'APPROVAL_REQUIRED_NO_MASTER_OVERWRITE'
 };
}
