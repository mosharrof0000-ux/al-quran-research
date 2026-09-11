/* v2.8 timeout hardening — loaded after chatbox-v28-live.html initializes. */
(function(){
  const nativeSetTimeout=window.setTimeout.bind(window);
  const nativeClearTimeout=window.clearTimeout.bind(window);
  window.setTimeout=function(fn,delay,...args){
    // The v2.8 chat request used a 30s watchdog. Long Quran research answers
    // can legitimately exceed that time, so extend only that watchdog to 90s.
    if(delay===30000) delay=90000;
    return nativeSetTimeout(fn,delay,...args);
  };
  window.clearTimeout=function(id){ return nativeClearTimeout(id); };
  window.__chatboxTimeoutFix='90s';
})();
