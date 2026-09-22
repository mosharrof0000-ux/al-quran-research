"use strict";

function submitLogin(event){
  event.preventDefault();

  const form=document.getElementById("quranLoginForm");
  const email=document.getElementById("userEmail");
  const password=document.getElementById("userPassword");
  const error=document.getElementById("loginError");

  error.textContent="";
  error.style.display="none";

  const emailValue=email.value.trim();
  const passwordValue=password.value;

  if(!emailValue){
    showLoginError("ইমেইল লিখুন।");
    email.focus();
    return;
  }

  if(!email.validity.valid){
    showLoginError("সঠিক ইমেইল ঠিকানা লিখুন।");
    email.focus();
    return;
  }

  if(!passwordValue){
    showLoginError("পাসওয়ার্ড লিখুন।");
    password.focus();
    return;
  }

  if(passwordValue.length<6){
    showLoginError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
    password.focus();
    return;
  }

  const button=form.querySelector(".login-btn");
  button.disabled=true;

  Promise.resolve().then(function(){
    localStorage.setItem("authUser",JSON.stringify({email:emailValue}));
    return true;
  }).then(function(){
    button.disabled=false;
    form.reset();
  }).catch(function(){
    button.disabled=false;
    showLoginError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
  });
}

function showLoginError(message){
  const error=document.getElementById("loginError");
  error.textContent=message;
  error.style.display="block";
}
