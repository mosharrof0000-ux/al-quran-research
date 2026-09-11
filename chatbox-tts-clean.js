/* v2.8 TTS cleanup — keeps the on-screen AI answer unchanged, but removes Markdown/UI punctuation before speech. */
(function(){
  function cleanForSpeech(input){
    let s=String(input??'');
    // Remove Markdown headings, bold/italic markers, code fences and list markers.
    s=s.replace(/```[\s\S]*?```/g,' ')
      .replace(/`([^`]+)`/g,'$1')
      .replace(/^\s{0,3}#{1,6}\s*/gm,'')
      .replace(/\*{1,3}|_{1,3}/g,'')
      .replace(/^\s*[-*•]\s+/gm,'')
      .replace(/^\s*\d+[.)]\s+/gm,'')
      .replace(/\[([^\]]+)\]\([^)]*\)/g,'$1')
      .replace(/\|/g,' ')
      .replace(/---+/g,' ')
      .replace(/___+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
    // Remove decorative UI symbols that should never be spoken.
    s=s.replace(/[🔎🧩📊🔗📝💬🔊🔇⏹️🎤↻☰⋮⌂📖🗑️]/gu,' ')
      .replace(/\s+/g,' ')
      .trim();
    return s;
  }
  window.cleanForSpeech=cleanForSpeech;
  window.__chatboxTtsClean='markdown-v1';
  // Override the existing global speak() without changing the visible answer.
  window.speak=function(text){
    if(!window.speakerOn || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean=cleanForSpeech(text);
    if(!clean) return;
    const u=new SpeechSynthesisUtterance(clean);
    u.lang='bn-BD';
    u.rate=.92;
    window.speechSynthesis.speak(u);
  };
})();
