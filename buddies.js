/* Floating anime-style buddies (SVG, no images needed) */
(()=>{
const rn=n=>Math.floor(Math.random()*n),pk=a=>a[rn(a.length)];
const face=(h,e,ears)=>`<svg viewBox="0 0 100 110" aria-hidden="true">${ears?`<path d="M20 34L18 2L44 18Z" fill="${h}"/><path d="M80 34L82 2L56 18Z" fill="${h}"/>`:""}
<path d="M12 60C3 95 16 106 25 100L27 62Z" fill="${h}"/><path d="M88 60C97 95 84 106 75 100L73 62Z" fill="${h}"/>
<circle cx="50" cy="58" r="34" fill="#ffe6d5"/>
<path d="M14 58C9 20 36 11 50 11C64 11 91 20 86 58C80 40 70 34 62 34L57 45L50 32L43 45L38 34C30 34 20 40 14 58Z" fill="${h}"/>
<ellipse cx="36" cy="63" rx="7.5" ry="10" fill="${e}"/><ellipse cx="64" cy="63" rx="7.5" ry="10" fill="${e}"/>
<circle cx="38.5" cy="59" r="3.2" fill="#fff"/><circle cx="66.5" cy="59" r="3.2" fill="#fff"/><circle cx="34" cy="67" r="1.6" fill="#fff"/><circle cx="62" cy="67" r="1.6" fill="#fff"/>
<ellipse cx="25" cy="77" rx="6" ry="3.5" fill="#ff9db4" opacity=".75"/><ellipse cx="75" cy="77" rx="6" ry="3.5" fill="#ff9db4" opacity=".75"/>
<path d="M44 80Q50 86 56 80" stroke="#a3475c" fill="none" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const cast=[
 ["#ff6fae","#6a5cff",0,["Konnichiwa! ✨","Sakura here~ 🌸","Play a game with me!"]],
 ["#5ec8ff","#ff5fa8",1,["Nya~ 🐾","Try the KnightOS terminal!","Meow-velous site!"]],
 ["#b58cff","#22c7a9",0,["Ganbatte! 💪","You can do it!","Sugoi score!"]],
 ["#ffb347","#3b82f6",1,["Snacks? 🍡","Click me again! 😆","Yatta~!"]],
 ["#52e5a3","#ff6f61",0,["Kawaii! 💖","Change the theme! 🎨","Senpai noticed you!"]]
];
const box=document.createElement("div");box.id="buddies";
cast.forEach((c,i)=>{
  const d=document.createElement("div");d.className="buddy";d.innerHTML=face(c[0],c[1],c[2]);
  d.style.cssText=`left:${8+i*19}%;top:${18+rn(55)}%;--t:${16+rn(12)}s;--dx:${rn(160)-80}px;--dy:${rn(160)-80}px`;
  d.onclick=()=>{const old=d.querySelector(".say");if(old)old.remove();const s=document.createElement("div");s.className="say";s.textContent=pk(c[3]);d.append(s);setTimeout(()=>s.remove(),2200);
    if(window.boom)boom();if(window.addClick)addClick()};
  box.append(d)});
for(let i=0;i<9;i++){const p=document.createElement("div");p.className="petal";p.textContent="🌸";p.style.cssText=`left:${rn(100)}%;--t:${9+rn(9)}s;--dx:${rn(200)-100}px;animation-delay:-${rn(12)}s`;box.append(p)}
document.body.append(box);
const btn=document.getElementById("buddyBtn");
function sync(){const off=document.body.classList.contains("nobuddy");if(btn){btn.textContent=off?"🌸 Off":"🌸 On";btn.style.opacity=off?.6:1}}
window.toggleBuddies=()=>{document.body.classList.toggle("nobuddy");try{localStorage.setItem("knightBuddies",document.body.classList.contains("nobuddy")?"0":"1")}catch(e){}sync();if(window.showToast)showToast(document.body.classList.contains("nobuddy")?"Buddies hidden":"Buddies are back 🌸")};
try{if(localStorage.getItem("knightBuddies")==="0")document.body.classList.add("nobuddy")}catch(e){}
sync();
})();
