(()=>{"use strict";
const form=document.getElementById("loginForm");
const identity=document.getElementById("identity");
const password=document.getElementById("password");
const errorBox=document.getElementById("loginError");
const statusBox=document.getElementById("loginStatus");
const submit=document.getElementById("loginSubmit");

function showError(message){errorBox.textContent=message;errorBox.hidden=false;statusBox.hidden=true}
function showStatus(message){statusBox.textContent=message;statusBox.hidden=false;errorBox.hidden=true}
function clearMessages(){errorBox.hidden=true;statusBox.hidden=true;errorBox.textContent="";statusBox.textContent=""}
function setLoading(loading){submit.disabled=loading;submit.classList.toggle("is-loading",loading)}

function validate(){
  const user=identity.value.trim();
  const pass=password.value;
  if(!user)return"Email / Username দিন।";
  if(!pass)return"Password দিন।";
  if(pass.length<6)return"Password কমপক্ষে ৬ অক্ষরের হতে হবে।";
  return null;
}

function saveSession(result){
  const token=result && (result.token||result.access_token||result.sessionToken);
  if(token)localStorage.setItem("authToken",token);
  if(result && result.user)localStorage.setItem("authUser",JSON.stringify(result.user));
}

async function mockLogin(payload){
  await new Promise(resolve=>setTimeout(resolve,350));
  return{
    ok:true,
    mock:true,
    token:"mock-session-"+Date.now(),
    user:{identity:payload.identity}
  };
}

async function authenticate(payload){
  const endpoint=form.dataset.apiEndpoint || window.ALQURAN_LOGIN_API || "";
  if(!endpoint)return mockLogin(payload);

  try{
    const response=await fetch(endpoint,{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(payload)
    });
    let data={};
    try{data=await response.json()}catch(_){}
    if(!response.ok)throw new Error(data.message||data.error||("Authentication failed ("+response.status+")"));
    return data;
  }catch(error){
    if(error instanceof TypeError)return mockLogin(payload);
    throw error;
  }
}

form.addEventListener("submit",async event=>{
  event.preventDefault();
  clearMessages();

  const validationError=validate();
  if(validationError){showError(validationError);return}

  setLoading(true);
  showStatus("লগইন যাচাই করা হচ্ছে…");

  try{
    const result=await authenticate({
      identity:identity.value.trim(),
      password:password.value
    });
    saveSession(result);
    showStatus(result.mock?"পরীক্ষামূলক লগইন সফল।":"লগইন সফল।");
    window.setTimeout(()=>window.location.assign(form.dataset.successRedirect||"../home-v1/home-v1.html"),250);
  }catch(error){
    showError(error.message||"লগইন করা যায়নি। আবার চেষ্টা করুন।");
    setLoading(false);
  }
});
})();
