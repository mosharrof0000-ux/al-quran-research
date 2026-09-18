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
function sendQuestion(){const q=document.getElementById('prompt').value.trim();if(!q){toast('প্রশ্ন লিখুন বা বলুন');return}sessionStorage.setItem('aqr:lastQuestion',q);window.location.href='../../dynamic-reader.html?question='+encodeURIComponent(q)}
document.getElementById('sendBtn').onclick=sendQuestion;
document.getElementById('prompt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendQuestion()}});
