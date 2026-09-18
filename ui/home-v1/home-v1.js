const CHAT_ENDPOINT='https://al-quran-research.mosharrof0000.workers.dev';
const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const drawer=document.getElementById('drawer');
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
