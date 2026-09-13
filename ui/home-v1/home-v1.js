const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const drawer=document.getElementById('drawer');
document.getElementById('menuBtn').onclick=()=>drawer.classList.add('open');
document.getElementById('closeDrawer').onclick=()=>drawer.classList.remove('open');
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('light');toast('থিম পরিবর্তনের জায়গা প্রস্তুত')};
document.getElementById('bellBtn').onclick=()=>toast('নতুন গবেষণা নোটিফিকেশন নেই');
document.getElementById('profileBtn').onclick=()=>toast('প্রোফাইল প্যানেল');
document.getElementById('moreBtn').onclick=()=>drawer.classList.add('open');
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast(`${b.textContent.trim()} মোড সক্রিয়`)});
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>toast(`${b.dataset.tool} গবেষণা টুল`));
document.querySelectorAll('.example').forEach(b=>b.onclick=()=>{document.getElementById('prompt').value=b.dataset.q;document.getElementById('prompt').focus()});
document.querySelectorAll('.bottom button').forEach(b=>b.onclick=()=>{const map={file:'ফাইল',image:'ছবি',copy:'কপি',bookmark:'বুকমার্ক',note:'নোট',ai:'AI সহায়ক'};toast(`${map[b.dataset.tab]} খুলবে`)});
document.getElementById('plusBtn').onclick=()=>toast('সংযুক্তি ও গবেষণা অপশন');
document.getElementById('micBtn').onclick=()=>{if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){toast('এই ব্রাউজারে voice input নেই');return}const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang='bn-BD';r.onresult=e=>document.getElementById('prompt').value=e.results[0][0].transcript;r.start();toast('শুনছি…')};
document.getElementById('sendBtn').onclick=()=>{const q=document.getElementById('prompt').value.trim();if(!q){toast('প্রশ্ন লিখুন বা বলুন');return}sessionStorage.setItem('aqr:lastQuestion',q);window.location.href='../../dynamic-reader.html?question='+encodeURIComponent(q)};
document.getElementById('prompt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();document.getElementById('sendBtn').click()}});
