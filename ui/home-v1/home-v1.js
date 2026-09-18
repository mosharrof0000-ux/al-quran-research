const CHAT_ENDPOINT='https://al-quran-research.mosharrof0000.workers.dev';
const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const drawer=document.getElementById('drawer');
const quranHome=document.getElementById('quranHome');
const sourceList=document.getElementById('sourceList');
const SOURCES=[{id:'language-quran',name:'ভাষাভিত্তিক কুরআন',meta:'আমাদের তৈরি প্রধান কুরআন • স্থায়ী ১ নম্বর',status:'প্রধান'},{id:'tanzil-uthmani',name:'Tanzil Uthmani',meta:'আরবি কুরআন • বর্তমান ইনস্টল করা Reader Source',status:'Source ২'}];
function renderSources(){sourceList.innerHTML='';SOURCES.forEach((s,i)=>{const b=document.createElement('button');b.className='source-card';b.type='button';b.dataset.source=s.id;b.innerHTML='<div class="source-top"><span class="source-number">'+(i+1)+'</span><span class="source-name">'+s.name+'</span><span class="source-badge">'+s.status+'</span></div><div class="source-meta">'+s.meta+'</div>';b.onclick=()=>selectSource(s.id);sourceList.appendChild(b)})}
function openQuranHome(){quranHome.classList.add('open');renderSources();drawer.classList.remove('open')}
function closeQuranHome(){quranHome.classList.remove('open')}
function selectSource(id){if(id==='tanzil-uthmani'){closeQuranHome();reader.classList.add('open');showSura(Number(select.value||1));return}toast('ভাষাভিত্তিক কুরআন তৈরির ধাপ পরবর্তী পর্যায়ে শুরু হবে')}
document.getElementById('openQuranHome').onclick=openQuranHome;
document.getElementById('closeQuranHome').onclick=closeQuranHome;
document.getElementById('menuBtn').onclick=()=>drawer.classList.add('open');
document.getElementById('closeDrawer').onclick=()=>drawer.classList.remove('open');
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('light');toast('থিম পরিবর্তনের জায়গা প্রস্তুত')};
document.getElementById('profileBtn').onclick=()=>toast('প্রোফাইল প্যানেল');
document.getElementById('searchBtn').onclick=()=>document.getElementById('prompt').focus();
document.getElementById('plusBtn').onclick=()=>toast('গবেষণা অপশন');
document.getElementById('micBtn').onclick=()=>{if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){toast('এই ব্রাউজারে voice input নেই');return}const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang='bn-BD';r.onresult=e=>document.getElementById('prompt').value=e.results[0][0].transcript;r.start();toast('শুনছি…')};
function addMessage(text,type){const box=document.getElementById('messages');const el=document.createElement('div');el.className='chat-message '+type;el.textContent=text;box.appendChild(el);box.scrollTop=box.scrollHeight;return el}
function setBusy(busy){document.getElementById('sendBtn').disabled=busy;document.getElementById('sendBtn').textContent=busy?'…':'↑'}
async function sendQuestion(){const prompt=document.getElementById('prompt');const q=prompt.value.trim();if(!q){toast('প্রশ্ন লিখুন বা বলুন');return}sessionStorage.setItem('aqr:lastQuestion',q);document.getElementById('welcome').style.display='none';addMessage(q,'user');prompt.value='';setBusy(true);const pending=addMessage('উত্তর তৈরি হচ্ছে…','ai pending');try{const response=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,mode:'general'})});let data={};try{data=await response.json()}catch{}if(!response.ok)throw new Error(data.error||'AI সংযোগে সমস্যা হয়েছে।');pending.textContent=data.answer||'AI কোনো উত্তর দেয়নি।';if(data.provider)pending.dataset.provider=data.provider}catch(error){pending.textContent='দুঃখিত, AI সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।';toast(String(error.message||error))}finally{pending.classList.remove('pending');setBusy(false)}}
document.getElementById('sendBtn').onclick=sendQuestion;
document.getElementById('prompt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendQuestion()}});

const SURA_NAMES=["আল-ফাতিহা","আল-বাকারা","আলে ইমরান","আন-নিসা","আল-মায়িদা","আল-আনআম","আল-আরাফ","আল-আনফাল","আত-তাওবা","ইউনুস","হুদ","ইউসুফ","আর-রাদ","ইবরাহিম","আল-হিজর","আন-নাহল","আল-ইসরা","আল-কাহফ","মারইয়াম","ত্ব-হা","আল-আম্বিয়া","আল-হাজ্জ","আল-মুমিনুন","আন-নূর","আল-ফুরকান","আশ-শুআরা","আন-নামল","আল-কাসাস","আল-আনকাবুত","আর-রূম","লুকমান","আস-সাজদাহ","আল-আহযাব","সাবা","ফাতির","ইয়াসিন","আস-সাফফাত","সাদ","আয-যুমার","গাফির","ফুসসিলাত","আশ-শূরা","আয-যুখরুফ","আদ-দুখান","আল-জাসিয়া","আল-আহকাফ","মুহাম্মাদ","আল-ফাতহ","আল-হুজুরাত","কাফ","আয-যারিয়াত","আত-তূর","আন-নাজম","আল-কামার","আর-রহমান","আল-ওয়াকিয়া","আল-হাদিদ","আল-মুজাদিলা","আল-হাশর","আল-মুমতাহিনা","আস-সাফ","আল-জুমুআ","আল-মুনাফিকুন","আত-তাগাবুন","আত-তালাক","আত-তাহরিম","আল-মুলক","আল-কলম","আল-হাক্কাহ","আল-মাআরিজ","নূহ","আল-জিন্ন","আল-মুযযাম্মিল","আল-মুদ্দাসসির","আল-কিয়ামাহ","আল-ইনসান","আল-মুরসালাত","আন-নাবা","আন-নাযিআত","আবাসা","আত-তাকভীর","আল-ইনফিতার","আল-মুতাফফিফিন","আল-ইনশিকাক","আল-বুরুজ","আত-তারিক","আল-আলা","আল-গাশিয়াহ","আল-ফজর","আল-বালাদ","আশ-শামস","আল-লাইল","আদ-দুহা","আশ-শারহ","আত-তিন","আল-আলাক","আল-কদর","আল-বাইয়্যিনাহ","আয-যিলযাল","আল-আদিয়াত","আল-কারিয়াহ","আত-তাকাসুর","আল-আসর","আল-হুমাযাহ","আল-ফিল","কুরাইশ","আল-মাউন","আল-কাওসার","আল-কাফিরুন","আন-নাসর","আল-মাসাদ","আল-ইখলাস","আল-ফালাক","আন-নাস"];
const QURAN_API='https://quranonlineread.com/api/surah/';
const reader=document.getElementById('quranReader'),select=document.getElementById('suraSelect'),qtext=document.getElementById('quranText'),qstatus=document.getElementById('quranStatus');
SURA_NAMES.forEach((n,i)=>{const o=document.createElement('option');o.value=i+1;o.textContent=(i+1)+' — '+n;select.appendChild(o)});
async function showSura(n){try{qstatus.textContent='সূরা লোড হচ্ছে…';qtext.innerHTML='';const r=await fetch(QURAN_API+n+'.json',{cache:'force-cache'});if(!r.ok)throw new Error('উৎস থেকে ডেটা পাওয়া যায়নি');const d=await r.json();const verses=d.verses||d.ayahs||[];verses.forEach((v,i)=>{const el=document.createElement('div');el.className='ayah';el.innerHTML='<span class="ayah-no">'+(v.numberInSurah||i+1)+'</span><span class="ayah-ar">'+(v.arabic||v.text||'')+'</span>';qtext.appendChild(el)});qstatus.textContent='সূরা '+n+' — '+SURA_NAMES[n-1]+' | '+verses.length+' আয়াত';select.value=n}catch(e){qstatus.textContent='সমস্যা: '+e.message}}
document.getElementById('openReader').onclick=()=>{reader.classList.add('open');showSura(Number(select.value||1))};
document.getElementById('closeReader').onclick=()=>reader.classList.remove('open');
select.onchange=()=>showSura(Number(select.value));
document.getElementById('prevSura').onclick=()=>showSura(Math.max(1,Number(select.value)-1));
document.getElementById('nextSura').onclick=()=>showSura(Math.min(114,Number(select.value)+1));
