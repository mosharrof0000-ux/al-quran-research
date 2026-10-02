const CHAT_ENDPOINT='https://al-quran-research.mosharrof0000.workers.dev';
const PRIVATE_RESEARCH_ENDPOINT=CHAT_ENDPOINT+'/private-research';
const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const AQR_AI_ICON_NAMES=new Set(['quran','ayah','research','analysis','translation','tafsir','document','info','verified','success','user','settings','bookmark','reference','warning']);
const AQR_AI_ICON_FALLBACKS=[['গবেষণা','research'],['বিশ্লেষণ','analysis'],['অনুবাদ','translation'],['তাফসির','tafsir'],['আয়াত','ayah'],['আয়াত','ayah'],['কুরআন','quran'],['সূরা','quran'],['যাচাই','verified'],['তথ্য','info']];
function iconNameFromQuestion(q){for(const [word,name] of AQR_AI_ICON_FALLBACKS)if(String(q||'').includes(word))return name;return 'quran'}
function renderAiIcon(body,iconName){
  const name=AQR_AI_ICON_NAMES.has(iconName)?iconName:'quran';
  const holder=document.createElement('div');holder.className='ai-semantic-icon';holder.setAttribute('aria-label','AI নির্বাচিত আইকন');
  holder.appendChild(AQRIcon.create(name,{color:'#123A63',size:24,strokeWidth:2.4,title:name}));
  body.prepend(holder);
}
/* SCROLL FIX injected - free up/down */
function aqrScrollMessages(force){
  const box=document.getElementById('messages');
  if(!box)return;
  box.classList.add('has-messages');
  const nearBottom=box.scrollHeight-box.scrollTop-box.clientHeight<140;
  if(force||nearBottom)requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight});
}
function boxScrollForStreaming(){aqrScrollMessages(false)}
console.log('[AQR] scroll fix active');
// Load rest of app from previous known-good commit via dynamic import workaround
(async function(){
  try{
    const url='https://cdn.jsdelivr.net/gh/mosharrof0000-ux/al-quran-research@272a7d0d285d5942ca83ccd0a1751bc7a2921d7e/ui/home-v1/home-v1.js';
    const r=await fetch(url);
    let code=await r.text();
    // Patch scroll blocks in loaded code
    code=code.replace(
      /if\(type\.includes\('user'\)\)\{[\s\S]*?box\.scrollTop=box\.scrollHeight;\s*\}\s*return el\s*\}/,
      "if(box){box.classList.add('has-messages');const nearBottom=box.scrollHeight-box.scrollTop-box.clientHeight<120;if(type.includes('user')||nearBottom||type.includes('pending')){requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});}return el}"
    );
    code=code.replace(
      /function boxScrollForStreaming\(body\)\{const box=document\.getElementById\('messages'\);if\(box\)box\.scrollTop=box\.scrollHeight\}/,
      "function boxScrollForStreaming(body){const box=document.getElementById('messages');if(!box)return;const nearBottom=box.scrollHeight-box.scrollTop-box.clientHeight<160;if(nearBottom)box.scrollTop=box.scrollHeight;}"
    );
    // Avoid redefining constants that already ran
    const s=document.createElement('script');
    s.textContent=code;
    document.head.appendChild(s);
  }catch(e){
    console.error('AQR load failed',e);
    toast&&toast('স্ক্রিপ্ট লোড সমস্যা');
  }
})();
