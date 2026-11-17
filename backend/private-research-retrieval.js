/* Private Research — scoped, integrity-checked R2 chunk retrieval v1
   Retrieves only a canonical ayah chunk from a rights-verified manifest.
   Never returns a full-book object and never calls an external provider.
*/
const AYAH_PATTERN=/^S\d{3}-A\d{3}$/;
const MAX_MANIFEST_BYTES=2_000_000;
const MAX_CHUNK_BYTES=64_000;
const MAX_CONTENT_CHARS=16_000;

export async function sha256Hex(value){
  const bytes=new TextEncoder().encode(String(value));
  const digest=await crypto.subtle.digest('SHA-256',bytes);
  return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}

function safeKey(key,sourceId){
  if(typeof key!=='string'||!key.startsWith(`private-sources/${sourceId}/`))return false;
  const parts=key.split('/');
  return parts.length>=3&&parts.every(part=>part&&part!=='.'&&part!=='..'&&!part.includes('\\'));
}

async function readObjectText(bucket,key,maxBytes){
  const object=await bucket.get(key);
  if(!object)return {ok:false,error:'PRIVATE_OBJECT_NOT_FOUND',status:404};
  if(Number.isFinite(Number(object.size))&&Number(object.size)>maxBytes)return {ok:false,error:'PRIVATE_OBJECT_TOO_LARGE',status:413};
  const text=await object.text();
  if(new TextEncoder().encode(text).byteLength>maxBytes)return {ok:false,error:'PRIVATE_OBJECT_TOO_LARGE',status:413};
  return {ok:true,text};
}

export async function retrievePrivateResearchContext({bucket,sourceId,manifestKey,manifestSha256,ayahId}={}){
  if(!bucket||typeof bucket.get!=='function')return {ok:false,error:'PRIVATE_SOURCE_STORAGE_NOT_CONFIGURED',status:503};
  if(typeof sourceId!=='string'||!/^SRC-[A-Za-z0-9_-]+$/.test(sourceId))return {ok:false,error:'INVALID_PRIVATE_SOURCE_ID',status:400};
  if(typeof ayahId!=='string'||!AYAH_PATTERN.test(ayahId))return {ok:false,error:'CANONICAL_AYAH_SCOPE_REQUIRED',status:400};
  if(!safeKey(manifestKey,sourceId)||typeof manifestSha256!=='string'||!/^[a-f0-9]{64}$/.test(manifestSha256))return {ok:false,error:'PRIVATE_SOURCE_MANIFEST_NOT_CONFIGURED',status:503};

  let manifestObject;
  try{manifestObject=await readObjectText(bucket,manifestKey,MAX_MANIFEST_BYTES);}
  catch{return {ok:false,error:'PRIVATE_SOURCE_MANIFEST_READ_FAILED',status:503};}
  if(!manifestObject.ok)return manifestObject;
  if(await sha256Hex(manifestObject.text)!==manifestSha256)return {ok:false,error:'PRIVATE_SOURCE_MANIFEST_INTEGRITY_FAILED',status:422};

  let manifest;
  try{manifest=JSON.parse(manifestObject.text);}catch{return {ok:false,error:'PRIVATE_SOURCE_MANIFEST_INVALID',status:422};}
  if(manifest?.schema_version!==1||manifest?.source_id!==sourceId||typeof manifest?.edition_id!=='string'||!manifest.edition_id||!Array.isArray(manifest.chunks)||manifest.chunks.length>50000)return {ok:false,error:'PRIVATE_SOURCE_MANIFEST_INVALID',status:422};
  if(manifest.rights_status!=='VERIFIED')return {ok:false,error:'PRIVATE_SOURCE_RIGHTS_NOT_VERIFIED',status:403};

  const entries=manifest.chunks.filter(item=>item&&item.ayah_id===ayahId);
  if(!entries.length)return {ok:false,error:'PRIVATE_SOURCE_AYAH_NOT_FOUND',status:404};
  if(entries.length>3)return {ok:false,error:'PRIVATE_SOURCE_DUPLICATE_AYAH_ENTRIES',status:422};

  const chunks=[];
  for(const entry of entries){
    if(typeof entry.chunk_id!=='string'||!entry.chunk_id||!safeKey(entry.storage_key,sourceId)||typeof entry.content_sha256!=='string'||!/^[a-f0-9]{64}$/.test(entry.content_sha256))return {ok:false,error:'PRIVATE_SOURCE_CHUNK_REFERENCE_INVALID',status:422};
    let chunkObject;
    try{chunkObject=await readObjectText(bucket,entry.storage_key,MAX_CHUNK_BYTES);}
    catch{return {ok:false,error:'PRIVATE_SOURCE_CHUNK_READ_FAILED',status:503};}
    if(!chunkObject.ok)return chunkObject;
    let chunk;
    try{chunk=JSON.parse(chunkObject.text);}catch{return {ok:false,error:'PRIVATE_SOURCE_CHUNK_INVALID',status:422};}
    if(chunk?.schema_version!==1||chunk?.source_id!==sourceId||chunk?.edition_id!==manifest.edition_id||chunk?.chunk_id!==entry.chunk_id||chunk?.ayah_id!==ayahId||typeof chunk?.content!=='string'||!chunk.content.trim())return {ok:false,error:'PRIVATE_SOURCE_CHUNK_METADATA_MISMATCH',status:422};
    if(chunk.content.length>MAX_CONTENT_CHARS)return {ok:false,error:'PRIVATE_SOURCE_CONTENT_TOO_LARGE',status:413};
    const actual=await sha256Hex(chunk.content);
    if(actual!==entry.content_sha256||actual!==chunk.content_sha256)return {ok:false,error:'PRIVATE_SOURCE_CHUNK_INTEGRITY_FAILED',status:422};
    chunks.push({chunk_id:chunk.chunk_id,ayah_id:chunk.ayah_id,content:chunk.content,content_sha256:actual,page_ref:chunk.page_ref||null});
  }

  return {ok:true,source_id:sourceId,edition_id:manifest.edition_id,ayah_id:ayahId,chunks};
}
