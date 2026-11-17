import { handlePrivateResearch } from './private-research.js';

const SOURCE_ID_PATTERN=/^SRC-[A-Za-z0-9_-]+$/;
const AYAH_ID_PATTERN=/^S\d{3}-A\d{3}$/;
const MAX_CONTEXT_CHARS=16_000;

export async function getPrivateResearchContextForChat({request,body,env,sources}={}){
  if(body?.private_research_use!==true)return {ok:true,used:false,context:''};
  const sourceId=String(body?.private_research_source_id||'');
  if(!SOURCE_ID_PATTERN.test(sourceId))return {ok:false,used:false,status:400,error:'PRIVATE_SOURCE_ID_REQUIRED'};
  const message=String(body?.message||'').trim();
  if(!message)return {ok:false,used:false,status:400,error:'PRIVATE_RESEARCH_MESSAGE_REQUIRED'};
  const ayahId=message.match(/\bS\d{3}-A\d{3}\b/)?.[0]||'';
  if(!AYAH_ID_PATTERN.test(ayahId))return {ok:false,used:false,status:400,error:'CANONICAL_AYAH_SCOPE_REQUIRED'};
  const authorization=request?.headers?.get('Authorization')||'';
  if(!authorization.startsWith('Bearer '))return {ok:false,used:false,status:401,error:'PRIVATE_SESSION_REQUIRED'};

  const internalRequest=new Request(`https://private-research.internal/private-research/sources/${encodeURIComponent(sourceId)}/content?ayah_id=${encodeURIComponent(ayahId)}`,{
    method:'GET',
    headers:{Authorization:authorization}
  });
  let response;
  try{response=await handlePrivateResearch(internalRequest,env,sources);}
  catch{return {ok:false,used:false,status:503,error:'PRIVATE_SOURCE_RETRIEVAL_FAILED'};}
  if(!response?.ok){
    let payload={};try{payload=await response.json();}catch{}
    return {ok:false,used:false,status:response?.status||503,error:payload.error||'PRIVATE_SOURCE_UNAVAILABLE'};
  }
  let payload;
  try{payload=await response.json();}catch{return {ok:false,used:false,status:502,error:'PRIVATE_SOURCE_RESPONSE_INVALID'};}
  if(payload?.ok!==true||!Array.isArray(payload.chunks)||payload.chunks.length<1||payload.chunks.length>3)return {ok:false,used:false,status:422,error:'PRIVATE_SOURCE_CHUNKS_INVALID'};
  const content=payload.chunks.map(chunk=>String(chunk?.content||'').trim()).filter(Boolean).join('\n\n');
  if(!content)return {ok:false,used:false,status:404,error:'PRIVATE_SOURCE_CONTENT_EMPTY'};
  if(content.length>MAX_CONTEXT_CHARS)return {ok:false,used:false,status:413,error:'PRIVATE_SOURCE_CONTEXT_TOO_LARGE'};
  return {
    ok:true,
    used:true,
    source_id:sourceId,
    edition_id:String(payload.edition_id||''),
    ayah_id:ayahId,
    chunk_ids:payload.chunks.map(chunk=>String(chunk.chunk_id||'')),
    context:content
  };
}
