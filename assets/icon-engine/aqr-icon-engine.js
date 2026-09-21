/**
 * Al-Quran Research Project — Dynamic Icon Engine v1.0
 * Zero external dependencies.
 *
 * Usage:
 *   const icon = AQRIcon.create("fajr", {color:"#C58B18", size:32});
 *   document.querySelector("#target").appendChild(icon);
 *
 * Or:
 *   <aqr-icon name="fajr" color="#1D63D8" size="32"></aqr-icon>
 */
(function(global){
  "use strict";

  const DEFAULTS = {
    color: "#123A63",
    size: 32,
    strokeWidth: 2.4,
    title: "",
    className: ""
  };

  const ICONS = {
    fajr: `<path d="M16 38h32"/><path d="M20 34a12 12 0 0 1 24 0"/><path d="M32 10v7M18 16l4 4M46 16l-4 4"/><path d="M25 45h14"/>`,
    sunrise: `<circle cx="32" cy="34" r="9"/><path d="M32 12v7M32 49v7M10 34h7M47 34h7M17 19l5 5M47 19l-5 5M17 49l5-5M47 49l-5-5"/>`,
    asr: `<circle cx="32" cy="32" r="10"/><path d="M32 9v7M32 48v7M9 32h7M48 32h7M16 16l5 5M48 16l-5 5M16 48l5-5M48 48l-5-5"/>`,
    maghrib: `<path d="M14 40h36"/><path d="M20 35a12 12 0 0 1 24 0"/><path d="M32 12v8M18 20l5 5M46 20l-5 5"/>`,
    isha: `<path d="M41 14a17 17 0 1 0 6 30A18 18 0 0 1 41 14z"/><path d="M18 45h28"/>`,
    qibla: `<path d="M18 24h28v25H18z"/><path d="M32 24v25"/><path d="M24 31h16"/>`,
    quran: `<path d="M13 17c8-4 14-2 19 2v32c-5-4-11-6-19-2z"/><path d="M51 17c-8-4-14-2-19 2v32c5-4 11-6 19-2z"/>`,
    ayah: `<path d="M18 12h28v40H18z"/><path d="M24 22h16M24 30h16M24 38h11"/>`,
    tafsir: `<path d="M16 14h32v36H16z"/><path d="M22 22h20M22 30h20M22 38h13"/>`,
    translation: `<path d="M15 16h34v32H15z"/><path d="M21 25h9M34 25h9M21 34h22M21 42h14"/>`,
    surah: `<path d="M19 13h26v38H19z"/><path d="M25 22h14M25 30h14M25 38h14"/>`,
    research: `<circle cx="28" cy="28" r="11"/><path d="M36 36l11 11"/><path d="M25 28h6M28 25v6"/>`,
    analysis: `<circle cx="32" cy="32" r="16"/><path d="M23 36l6-7 5 4 8-11"/>`,
    info: `<circle cx="32" cy="32" r="19"/><path d="M32 28v13M32 21h.01"/>`,
    document: `<path d="M19 10h19l8 8v36H19z"/><path d="M38 10v10h8M25 29h15M25 37h15M25 45h10"/>`,
    library: `<path d="M13 17h38M16 17v31M27 17v31M38 17v31M49 17v31M12 50h40"/>`,
    reference: `<path d="M20 32a12 12 0 0 1 20-9l4 4"/><path d="M44 23v8h-8"/><path d="M44 32a12 12 0 0 1-20 9l-4-4"/><path d="M20 41v-8h8"/>`,
    note: `<path d="M16 12h32v40H16z"/><path d="M23 24h18M23 32h18M23 40h12"/>`,
    bookmark: `<path d="M19 12h26v40l-13-8-13 8z"/>`,
    folder: `<path d="M10 20h18l5 5h21v23H10z"/>`,
    download: `<path d="M32 10v29"/><path d="M22 30l10 10 10-10"/><path d="M14 49h36"/>`,
    upload: `<path d="M32 42V13"/><path d="M22 23l10-10 10 10"/><path d="M14 49h36"/>`,
    verified: `<path d="M32 10l6 5 8-1 1 8 6 5-5 6 1 8-8 1-5 6-6-5-8 1-1-8-6-5 5-6-1-8 8-1z"/><path d="M23 32l6 6 12-13"/>`,
    success: `<circle cx="32" cy="32" r="20"/><path d="M22 32l7 7 13-15"/>`,
    warning: `<path d="M32 11l22 40H10z"/><path d="M32 25v12M32 43h.01"/>`,
    important: `<path d="M32 10l6 14 15 1-12 10 4 15-13-8-13 8 4-15-12-10 15-1z"/>`,
    calendar: `<rect x="13" y="15" width="38" height="36" rx="3"/><path d="M13 25h38M22 10v10M42 10v10M22 33h.01M32 33h.01M42 33h.01M22 42h.01M32 42h.01M42 42h.01"/>`,
    clock: `<circle cx="32" cy="32" r="20"/><path d="M32 20v13l8 5"/>`,
    timer: `<path d="M27 10h10M32 15v6M22 23a16 16 0 1 0 20 0"/><path d="M32 27v8l6 4"/>`,
    user: `<circle cx="32" cy="23" r="8"/><path d="M17 51c1-10 7-15 15-15s14 5 15 15"/>`,
    settings: `<circle cx="32" cy="32" r="7"/><path d="M32 12v7M32 45v7M12 32h7M45 32h7M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5"/>`,
    language: `<circle cx="32" cy="32" r="20"/><path d="M12 32h40M32 12c7 7 7 33 0 40M32 12c-7 7-7 33 0 40"/>`,
    login: `<path d="M36 15h13v34H36"/><path d="M29 32h20M35 26l6 6-6 6"/>`,
    logout: `<path d="M28 15H15v34h13"/><path d="M35 32H15M29 26l-6 6 6 6"/>`,
    mobile: `<rect x="20" y="9" width="24" height="46" rx="4"/><path d="M28 49h8"/>`,
    cloud: `<path d="M19 46h28a9 9 0 0 0 0-18 15 15 0 0 0-29-2 10 10 0 0 0 1 20z"/>`,
    wifi: `<path d="M14 26a28 28 0 0 1 36 0M20 33a19 19 0 0 1 24 0M27 40a9 9 0 0 1 10 0M32 48h.01"/>`,
    share: `<circle cx="20" cy="32" r="5"/><circle cx="45" cy="18" r="5"/><circle cx="45" cy="46" r="5"/><path d="M24 30l16-9M24 34l16 9"/>`,
    help: `<circle cx="32" cy="32" r="20"/><path d="M26 26a7 7 0 0 1 13 4c0 5-7 5-7 10M32 46h.01"/>`,
    heart: `<path d="M32 49S12 37 12 24a10 10 0 0 1 20-4 10 10 0 0 1 20 4c0 13-20 25-20 25z"/>`
  };

  function create(name, opts){
    opts = Object.assign({}, DEFAULTS, opts || {});
    if(!ICONS[name]) throw new Error("Unknown AQR icon: " + name);
    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 64 64");
    svg.setAttribute("width", opts.size);
    svg.setAttribute("height", opts.size);
    svg.setAttribute("fill","none");
    svg.setAttribute("stroke", opts.color);
    svg.setAttribute("stroke-width", opts.strokeWidth);
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("aria-hidden", opts.title ? "false" : "true");
    if(opts.title){
      const t=document.createElementNS("http://www.w3.org/2000/svg","title");
      t.textContent=opts.title; svg.appendChild(t);
    }
    if(opts.className) svg.setAttribute("class", opts.className);
    svg.innerHTML += ICONS[name];
    return svg;
  }

  function renderAll(root=document){
    root.querySelectorAll("aqr-icon").forEach(el=>{
      const name=el.getAttribute("name");
      const opts={
        color: el.getAttribute("color") || DEFAULTS.color,
        size: el.getAttribute("size") || DEFAULTS.size,
        strokeWidth: el.getAttribute("stroke-width") || DEFAULTS.strokeWidth,
        title: el.getAttribute("title") || ""
      };
      el.replaceWith(create(name, opts));
    });
  }

  global.AQRIcon = {create, renderAll, icons:Object.keys(ICONS)};
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",()=>renderAll());
  else renderAll();

})(window);
