/* KnightOS — a tiny desktop OS simulator */
(()=>{
const $=id=>document.getElementById(id),rn=n=>Math.floor(Math.random()*n);
const DEF=()=>({home:{docs:{"readme.txt":"Welcome to KnightOS!\nEverything you save here stays in your browser.\nTry the Terminal: type help","todo.txt":"- conquer the realm\n- drink tea"},pics:{},games:{"scores.txt":"Play the Arcade to fill me up."}},sys:{"kernel.bin":"01001011 01001110 01001001 01000111 01001000 01010100"}});
let FS;try{FS=JSON.parse(localStorage.getItem("kosfs"))}catch(e){}
FS=FS||DEF();
const save=()=>{try{localStorage.setItem("kosfs",JSON.stringify(FS))}catch(e){}};
const nav=p=>p.reduce((o,k)=>o&&typeof o=="object"?o[k]:undefined,FS);
const toast=m=>window.showToast&&showToast(m);
let z=10,booted=0,ac,wins={},cnt=0;

const os=document.createElement("div");os.id="os";
os.innerHTML=`<div class="desk"><div class="icons"></div></div>
<div class="task"><button class="btn sm primary" id="sbtn">⚔️ Start</button><div class="tw" id="tw"></div><span id="tclock"></span><button class="btn sm" id="xit" title="Back to website">✕ Exit</button></div>
<div class="smenu" id="sm"></div><div class="boot" id="boot"></div>`;
document.body.append(os);
const desk=os.querySelector(".desk");

/* ---------- Apps ---------- */
const A={
term:{t:"Terminal",i:"⌨️",w:540,h:340,mk(b){
  b.classList.add("tm");b.innerHTML='<div class="tout"></div><div class="trow"><span class="tp"></span><input class="tin" spellcheck="false" autocomplete="off"></div>';
  const out=b.querySelector(".tout"),inp=b.querySelector(".tin"),tp=b.querySelector(".tp");let cwd=["home"],hist=[],hi=0;
  const P=()=>tp.textContent=`knight@os:/${cwd.join("/")}$ `;
  const pr=t=>{const d=document.createElement("div");d.textContent=t;out.append(d);b.scrollTop=b.scrollHeight};
  const rs=p=>{const r=p.startsWith("/")?[]:[...cwd];p.split("/").forEach(s=>{if(s=="..")r.pop();else if(s&&s!=".")r.push(s)});return r};
  const C={
   help:()=>pr("help ls cd pwd cat echo mkdir touch rm clear date whoami neofetch theme <name> cowsay fortune open <app> exit\napps: term files notes calc paint piano set"),
   ls:a=>{const n=nav(rs(a[0]||"."));pr(n&&typeof n=="object"?Object.keys(n).map(k=>typeof n[k]=="object"?k+"/":k).join("  ")||"(empty)":"ls: no such folder")},
   cd:a=>{const p=a[0]?rs(a[0]):["home"],n=nav(p);if(n&&typeof n=="object"){cwd=p;P()}else pr("cd: no such folder")},
   pwd:()=>pr("/"+cwd.join("/")),
   cat:a=>{const n=nav(rs(a[0]||""));pr(typeof n=="string"?n:"cat: not a file")},
   echo:a=>pr(a.join(" ")),
   mkdir:a=>{const p=rs(a[0]||""),d=nav(p.slice(0,-1));if(d&&typeof d=="object"&&p.length){d[p.at(-1)]={};save()}else pr("mkdir: failed")},
   touch:a=>{const p=rs(a[0]||""),d=nav(p.slice(0,-1));if(d&&typeof d=="object"&&p.length){if(d[p.at(-1)]===undefined)d[p.at(-1)]="";save()}else pr("touch: failed")},
   rm:a=>{const p=rs(a[0]||""),d=nav(p.slice(0,-1));if(d&&typeof d=="object"&&p.length&&p.at(-1) in d){delete d[p.at(-1)];save()}else pr("rm: not found")},
   clear:()=>out.innerHTML="",
   date:()=>pr(new Date().toString()),
   whoami:()=>pr("knight (level 0020)"),
   neofetch:()=>pr(`   ⚔️  knight@knightos\n   OS: KnightOS 1.0\n   Theme: ${document.documentElement.dataset.theme}\n   Shell: kbash\n   Files: ${JSON.stringify(FS).length} bytes`),
   theme:a=>{const t=themes.find(x=>x[0]==a[0]);if(t){setTheme(t[0],1);pr("theme -> "+t[1])}else pr("themes: "+themes.map(x=>x[0]).join(", "))},
   cowsay:a=>{const m=a.join(" ")||"moo";pr(` ${"_".repeat(m.length+2)}\n< ${m} >\n ${"-".repeat(m.length+2)}\n   \\  ^__^\n    \\ (oo)\\_______\n      (__)\\       )\\/\\\n          ||----w |\n          ||     ||`)},
   fortune:()=>pr(fortunes[rn(fortunes.length)]),
   open:a=>A[a[0]]?open(a[0]):pr("open: unknown app"),
   exit:()=>closeOS(),
   sudo:a=>/rm -rf \/?$/.test(a.join(" "))||a.join(" ").includes("rm -rf /")?bsod():pr("Nice try. You are not in the sudoers file.")
  };
  b.onclick=()=>inp.focus();
  inp.onkeydown=e=>{if(e.key=="Enter"){const l=inp.value.trim();pr(tp.textContent+l);inp.value="";if(l){hist.push(l);hi=hist.length;const[c,...a]=l.split(/\s+/);C[c]?C[c](a):pr(c+": command not found (try help)")}}
    else if(e.key=="ArrowUp"){hi=Math.max(0,hi-1);inp.value=hist[hi]||""}else if(e.key=="ArrowDown"){hi=Math.min(hist.length,hi+1);inp.value=hist[hi]||""}};
  P();pr("KnightOS terminal — type help");setTimeout(()=>inp.focus(),50)}},
files:{t:"Files",i:"📁",w:480,h:340,mk(b){let p=["home"];
  const r=()=>{const n=nav(p);b.innerHTML=`<div class="fbar"><button class="btn sm">⬆️ Up</button><code>/${p.join("/")}</code></div><div class="fl"></div>`;
   b.querySelector("button").onclick=()=>{if(p.length>1){p.pop();r()}};const l=b.querySelector(".fl");
   Object.keys(n).forEach(k=>{const d=typeof n[k]=="object",e=document.createElement("div");e.className="fi";e.innerHTML=`<b>${d?"📁":"📄"}</b>`;e.append(k);e.onclick=()=>d?(p.push(k),r()):open("notes",[...p,k]);l.append(e)});
   if(!Object.keys(n).length)l.textContent="Empty folder."};r()}},
notes:{t:"Notepad",i:"📝",w:440,h:340,mk(b,arg){const path=arg||["home","docs","untitled.txt"];
  b.innerHTML=`<div class="fbar"><input class="in" value="${path.join("/")}"><button class="btn sm">💾 Save</button></div><textarea class="ta" placeholder="Start typing..."></textarea>`;
  const ta=b.querySelector("textarea"),nm=b.querySelector("input"),n=nav(path);ta.value=typeof n=="string"?n:"";
  b.querySelector("button").onclick=()=>{const p=nm.value.split("/").filter(Boolean),d=nav(p.slice(0,-1));if(p.length&&d&&typeof d=="object"){d[p.at(-1)]=ta.value;save();toast("Saved 💾")}else toast("That folder doesn't exist")}}},
calc:{t:"Calculator",i:"🧮",w:270,h:380,mk(b){b.innerHTML='<input class="in cd" value="0" readonly><div class="ck"></div>';const d=b.querySelector(".cd");let s="";
  "C ( ) / 7 8 9 * 4 5 6 - 1 2 3 + 0 . ⌫ =".split(" ").forEach(k=>{const e=document.createElement("button");e.className="btn"+(k=="="?" primary":"");e.textContent=k;
   e.onclick=()=>{if(s=="Error")s="";if(k=="C")s="";else if(k=="⌫")s=s.slice(0,-1);else if(k=="="){try{s=String(Function('"use strict";return ('+s+')')())}catch(x){s="Error"}}else s+=k;d.value=s||"0"};b.querySelector(".ck").append(e)})}},
paint:{t:"Paint",i:"🎨",w:500,h:400,mk(b){b.innerHTML='<div class="fbar"><input type="color" value="#ff4fa0"><input type="range" min="1" max="30" value="6"><button class="btn sm">🧹 Clear</button></div><canvas width="520" height="320" style="width:100%;background:#fff;touch-action:none;display:block"></canvas>';
  const cv=b.querySelector("canvas"),x=cv.getContext("2d"),[col,sz]=b.querySelectorAll("input");let dn=0;x.lineCap="round";
  const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
  cv.onpointerdown=e=>{dn=1;cv.setPointerCapture(e.pointerId);const[a,c]=pos(e);x.beginPath();x.moveTo(a,c)};
  cv.onpointermove=e=>{if(!dn)return;const[a,c]=pos(e);x.strokeStyle=col.value;x.lineWidth=sz.value;x.lineTo(a,c);x.stroke()};
  cv.onpointerup=()=>dn=0;b.querySelector("button").onclick=()=>x.clearRect(0,0,cv.width,cv.height)}},
piano:{t:"Piano",i:"🎹",w:440,h:220,mk(b){const N=[261.6,293.7,329.6,349.2,392,440,493.9,523.3],K="asdfghjk";
  b.innerHTML='<div class="pk">'+N.map((f,i)=>`<button>${K[i].toUpperCase()}</button>`).join("")+"</div>";
  const play=i=>{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.type="triangle";o.frequency.value=N[i];g.gain.setValueAtTime(.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.9);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+.9)};
  b.querySelectorAll("button").forEach((e,i)=>e.onpointerdown=()=>play(i));
  const kd=e=>{if(!document.body.contains(b))return removeEventListener("keydown",kd);const i=K.indexOf(e.key);if(i>=0&&!e.repeat)play(i)};addEventListener("keydown",kd)}},
set:{t:"Settings",i:"⚙️",w:400,h:340,mk(b){b.innerHTML='<div style="padding:14px"><h3>Theme &amp; wallpaper</h3><div class="tg" id="tg"></div><h3 style="margin-top:16px">Extras</h3><div class="tg"><button class="btn sm" id="sb">🌸 Toggle buddies</button><button class="btn sm" id="sr">♻️ Reset files</button></div></div>';
  themes.forEach(t=>{const e=document.createElement("button");e.className="btn sm";e.textContent=t[1];e.style.borderColor=t[2];e.onclick=()=>setTheme(t[0],1);b.querySelector("#tg").append(e)});
  b.querySelector("#sb").onclick=()=>toggleBuddies();b.querySelector("#sr").onclick=()=>{FS=DEF();save();toast("Files reset ♻️")}}},
arcade:{t:"Arcade",i:"🕹️",go:1}
};

/* ---------- Windows ---------- */
function open(id,arg){const a=A[id];if(!a)return;if(a.go){closeOS();location.hash="#arcade";return}
  const w=document.createElement("div"),k="w"+(++cnt);w.className="win";
  const W=Math.min(a.w,innerWidth-16);w.style.cssText=`left:${Math.max(4,Math.min(60+(cnt%6)*30,innerWidth-W-8))}px;top:${30+(cnt%6)*28}px;width:${W}px;height:${Math.min(a.h,innerHeight-110)}px;z-index:${++z}`;
  w.innerHTML=`<div class="tb"><span>${a.i} ${a.t}</span><button style="background:#fbbf24">–</button><button style="background:#4ade80">▢</button><button style="background:#fb7185">✕</button></div><div class="wb"></div>`;
  desk.append(w);a.mk(w.querySelector(".wb"),arg);
  const tb=document.createElement("button");tb.className="btn sm";tb.textContent=a.i+" "+a.t;$("tw").append(tb);wins[k]={w,tb};
  const front=()=>{w.style.zIndex=++z;w.style.display="";tb.classList.remove("min")};
  const [mn,mx,cl]=w.querySelectorAll(".tb button");
  mn.onclick=()=>{w.style.display="none";tb.classList.add("min")};mx.onclick=()=>w.classList.toggle("max");
  cl.onclick=()=>{w.remove();tb.remove();delete wins[k]};
  tb.onclick=()=>w.style.display=="none"?front():mn.onclick();
  w.addEventListener("pointerdown",()=>{w.style.zIndex=++z});
  const bar=w.querySelector(".tb");let ox,oy,dr=0;
  bar.onpointerdown=e=>{if(e.target.tagName=="BUTTON"||w.classList.contains("max"))return;dr=1;ox=e.clientX-w.offsetLeft;oy=e.clientY-w.offsetTop;bar.setPointerCapture(e.pointerId)};
  bar.onpointermove=e=>{if(dr){w.style.left=Math.max(-w.offsetWidth+80,e.clientX-ox)+"px";w.style.top=Math.max(0,Math.min(innerHeight-100,e.clientY-oy))+"px"}};
  bar.onpointerup=()=>dr=0;bar.ondblclick=e=>{if(e.target.tagName!="BUTTON")mx.onclick()}}

/* ---------- Desktop, menu, boot ---------- */
const ic=os.querySelector(".icons"),sm=$("sm");
Object.keys(A).forEach(id=>{const a=A[id],e=document.createElement("div");e.className="ico";e.innerHTML=`<b>${a.i}</b>`;e.append(a.t);e.onclick=()=>open(id);ic.append(e);
  const m=document.createElement("button");m.textContent=a.i+"  "+a.t;m.onclick=()=>{open(id);sm.classList.remove("on")};sm.append(m)});
const sd=document.createElement("button");sd.textContent="⏻  Shut down";sd.onclick=()=>{sm.classList.remove("on");shutdown()};sm.append(sd);
$("sbtn").onclick=e=>{e.stopPropagation();sm.classList.toggle("on")};
desk.onclick=()=>sm.classList.remove("on");
$("xit").onclick=()=>closeOS();
setInterval(()=>$("tclock").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),1000);

function boot(){const b=$("boot");b.className="boot";b.style.display="";b.innerHTML="";
  const L=["KnightOS BIOS v1.0  [OK]","Checking memory... 640K ought to be enough","Loading kernel... done","Mounting /home... done","Summoning knights... done","","Welcome."];let i=0;
  const t=setInterval(()=>{b.textContent+=L[i++]+"\n";if(i>=L.length){clearInterval(t);setTimeout(lock,400)}},260)}
function lock(){const b=$("boot");b.className="boot lk";
  b.innerHTML='<div class="lc"></div><div class="av">⚔️</div><div>Knight0020</div><button class="btn primary">Log in</button>';
  const tick=()=>{const c=b.querySelector(".lc");if(c)c.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};tick();
  b.querySelector("button").onclick=()=>{b.style.display="none";booted=1;if(window.boom)boom()}}
function bsod(){const d=document.createElement("div");d.className="bsod";d.innerHTML="<h1>:(</h1><p>KnightOS ran into a problem and needs to restart.</p><p>Stop code: SUDO_RM_RF_DETECTED</p><p>Click anywhere to restart.</p>";
  d.onclick=()=>{d.remove();shutdown(1)};os.append(d)}
function shutdown(again){Object.values(wins).forEach(v=>{v.w.remove();v.tb.remove()});wins={};booted=0;if(again)boot();else{closeOS();toast("KnightOS shut down ⏻")}}
window.openOS=()=>{os.classList.add("on");if(!booted)boot()};
window.closeOS=()=>os.classList.remove("on");
addEventListener("keydown",e=>{if(e.key=="Escape")sm.classList.remove("on")});
})();
