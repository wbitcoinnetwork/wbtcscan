const API_KEY = "HT2NCFEWJXC42RTVSZ514Z6KARCC147PCB";
const TOKEN = "0x4FA2e41D58eCcEf2b2559E120b866252ce8263eF";
const API = "https://api.etherscan.io/v2/api";

function route(page,arg){ 
 document.getElementById("app").innerHTML = `<div class='card'>Loading ${page}...</div>`;
 if(page==='token') loadToken();
 if(page==='address') loadAddress(arg);
 if(page==='tx') loadTx(arg);
 if(page==='home') loadHome();
}

document.getElementById("search").addEventListener("keypress",e=>{
 if(e.key==="Enter"){
   const v=e.target.value.trim();
   if(v.length===42) route('address',v);
   else if(v.length===66) route('tx',v);
 }
});

function loadHome(){
 document.getElementById("app").innerHTML = `
 <div class='card'><h2>Wbitcoin Explorer</h2>
 <p>Single‑Page Blockchain Scan</p>
 </div>`;
}

async function loadToken(){
 document.getElementById("app").innerHTML = `<div class='card'>Token: ${TOKEN}</div>`;
}

async function fetchAPI(params){
 const url = new URL(API);
 Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));
 const r = await fetch(url);
 return r.json();
}

async function loadAddress(addr){
 const bal = await fetchAPI({
  chain:"base",module:"account",action:"tokenbalance",
  contractaddress:TOKEN,address:addr,apikey:API_KEY
 });
 document.getElementById("app").innerHTML =
 `<div class='card'><h3>Address</h3>${addr}<br>Balance: ${bal.result}</div>`;
}

async function loadTx(hash){
 document.getElementById("app").innerHTML =
 `<div class='card'><h3>Tx Detail</h3>${hash}</div>`;
}

route('home');
