/**
 * Al-Quran Research Project — Dynamic Icon Engine v1.0
 * Zero external dependencies.
 */
(function(global){
"use strict";
const DEFAULTS={color:"#123A63",size:32,strokeWidth:2.4,title:"",className:""};
const ICONS={
quran:`<path d="M13 17c8-4 14-2 19 2v32c-5-4-11-6-19-2z"/><path d="M51 17c-8-4-14-2-19 2v32c5-4 11-6 19-2z"/>`,
research:`<circle cx="28" cy="28" r="11"/><path d="M36 36l11 11"/><path d="M25 28h6M28 25v6"/>`,
settings:`<circle cx="32" cy="32" r="7"/><path d="M32 12v7M32 45v7M12 32h7M45 32h7M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5"/>`,
user:`<circle cx="32" cy="23" r="8"/><path d="M17 51c1-10 7-15 15-15s14 5 15 15"/>`,
info:`<circle cx="32" cy="32" r="19"/><path d="M32 28v13M32 21h.01"/>`,
bookmark:`<path d="M19 12h26v40l-13-8-13 8z"/>`,
verified:`<path d="M32 10l6 5 8-1 1 8 6 5-5 6 1 8-8 1-5 6-6-5-8 1-1-8-6-5 5-6-1-8 8-1z"/><path d="M23 32l6 6 12-13"/>`
};
function create(name,opts){opts=Object.assign({},DEFAULTS,opts||{});if(!ICONS[name])throw new Error("Unknown AQR icon: "+name);const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("viewBox","0 0 64 64");s.setAttribute("width",opts.size);s.setAttribute("height",opts.size);s.setAttribute("fill","none");s.setAttribute("stroke",opts.color);s.setAttribute("stroke-width",opts.strokeWidth);s.setAttribute("stroke-linecap","round");s.setAttribute("stroke-linejoin","round");s.setAttribute("aria-hidden",opts.title?"false":"true");if(opts.title){const t=document.createElementNS("http://www.w3.org/2000/svg","title");t.textContent=opts.title;s.appendChild(t)}if(opts.className)s.setAttribute("class",opts.className);s.innerHTML+=ICONS[name];return s}
function renderAll(root=document){root.querySelectorAll("aqr-icon").forEach(el=>{const name=el.getAttribute("name"),opts={color:el.getAttribute("color")||DEFAULTS.color,size:el.getAttribute("size")||DEFAULTS.size,strokeWidth:el.getAttribute("stroke-width")||DEFAULTS.strokeWidth,title:el.getAttribute("title")||""};el.replaceWith(create(name,opts))})}
global.AQRIcon={create,renderAll,icons:Object.keys(ICONS)};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>renderAll());else renderAll();
})(window);
