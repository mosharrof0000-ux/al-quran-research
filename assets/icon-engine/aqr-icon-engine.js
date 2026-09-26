/**
 * Al-Quran Research Project — Dynamic Icon Engine v1.0
 * Zero external dependencies.
 */
(function(global){
  "use strict";
  const DEFAULTS={color:"#123A63",size:32,strokeWidth:2.4,title:"",className:""};
  const ICONS={
    quran:`<path d="M13 17c8-4 14-2 19 2v32c-5-4-11-6-19-2z"/><path d="M51 17c-8-4-14-2-19 2v32c5-4 11-6 19-2z"/>`,
    ayah:`<path d="M18 12h28v40H18z"/><path d="M24 22h16M24 30h16M24 38h11"/>`,
    research:`<circle cx="28" cy="28" r="11"/><path d="M36 36l11 11"/><path d="M25 28h6M28 25v6"/>`,
    analysis:`<circle cx="32" cy="32" r="16"/><path d="M23 36l6-7 5 4 8-11"/>`,
    translation:`<path d="M15 16h34v32H15z"/><path d="M21 25h9M34 25h9M21 34h22M21 42h14"/>`,
    tafsir:`<path d="M16 14h32v36H16z"/><path d="M22 22h20M22 30h20M22 38h13"/>`,
    document:`<path d="M19 10h19l8 8v36H19z"/><path d="M38 10v10h8M25 29h15M25 37h15M25 45h10"/>`,
    info:`<circle cx="32" cy="32" r="19"/><path d="M32 28v13M32 21h.01"/>`,
    verified:`<path d="M32 10l6 5 8-1 1 8 6 5-5 6 1 8-8 1-5 6-6-5-8 1-1-8-6-5 5-6-1-8 8-1z"/><path d="M23 32l6 6 12-13"/>`,
    success:`<circle cx="32" cy="32" r="20"/><path d="M22 32l7 7 13-15"/>`,
    user:`<circle cx="32" cy="23" r="8"/><path d="M17 51c1-10 7-15 15-15s14 5 15 15"/>`,
    settings:`<circle cx="32" cy="32" r="7"/><path d="M32 12v7M32 45v7M12 32h7M45 32h7M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5"/>`,
    bookmark:`<path d="M19 12h26v40l-13-8-13 8z"/>`,
    reference:`<path d="M20 32a12 12 0 0 1 20-9l4 4"/><path d="M44 23v8h-8"/><path d="M44 32a12 12 0 0 1-20 9l-4-4"/><path d="M20 41v-8h8"/>`,
    warning:`<path d="M32 11l22 40H10z"/><path d="M32 25v12M32 43h.01"/>`
  };
  function create(name,opts){
    opts=Object.assign({},DEFAULTS,opts||{});if(!ICONS[name])throw new Error("Unknown AQR icon: "+name);
    const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 64 64");svg.setAttribute("width",opts.size);svg.setAttribute("height",opts.size);
    svg.setAttribute("fill","none");svg.setAttribute("stroke",opts.color);svg.setAttribute("stroke-width",opts.strokeWidth);
    svg.setAttribute("stroke-linecap","round");svg.setAttribute("stroke-linejoin","round");svg.setAttribute("aria-hidden",opts.title?"false":"true");
    if(opts.title){const t=document.createElementNS("http://www.w3.org/2000/svg","title");t.textContent=opts.title;svg.appendChild(t)}
    if(opts.className)svg.setAttribute("class",opts.className);svg.innerHTML+=ICONS[name];return svg;
  }
  function renderAll(root=document){root.querySelectorAll("aqr-icon").forEach(el=>{const name=el.getAttribute("name");el.replaceWith(create(name,{color:el.getAttribute("color")||DEFAULTS.color,size:el.getAttribute("size")||DEFAULTS.size,strokeWidth:el.getAttribute("stroke-width")||DEFAULTS.strokeWidth,title:el.getAttribute("title")||""}))})}
  global.AQRIcon={create,renderAll,icons:Object.keys(ICONS)};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>renderAll());else renderAll();
})(window);