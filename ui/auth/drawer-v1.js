"use strict";

function openDrawer(){
  const menu=document.getElementById("drawerMenu");
  const overlay=document.getElementById("drawerOverlay");
  if(!menu||!overlay)return;
  menu.classList.add("active");
  overlay.classList.add("active");
  menu.setAttribute("aria-hidden","false");
  overlay.setAttribute("aria-hidden","false");
  document.body.classList.add("drawer-open");
  const close=menu.querySelector(".drawer-close-btn");
  if(close)close.focus();
}

function closeDrawer(){
  const menu=document.getElementById("drawerMenu");
  const overlay=document.getElementById("drawerOverlay");
  if(!menu||!overlay)return;
  menu.classList.remove("active");
  overlay.classList.remove("active");
  menu.setAttribute("aria-hidden","true");
  overlay.setAttribute("aria-hidden","true");
  document.body.classList.remove("drawer-open");
}

function handleLogout(event){
  if(event)event.preventDefault();
  localStorage.removeItem("authUser");
  closeDrawer();
}

document.addEventListener("keydown",function(event){
  if(event.key==="Escape")closeDrawer();
});