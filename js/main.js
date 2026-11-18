/* Aisora Tattoo — v2 (L R G Z). Fumaça e abertura vêm do site original; navegação, portfólio, visualizador e orçamento (LRGZ Manequim) são novos. */
"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],NUM="5511993696958",wa=t=>"https://wa.me/"+NUM+"?text="+encodeURIComponent(t),RM=matchMedia("(prefers-reduced-motion: reduce)").matches,HV=matchMedia("(hover:hover) and (pointer:fine)").matches,ESC=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]);
$$("[data-wa]").forEach(a=>{a.href=wa("Olá, Aisora! Vim pelo site e gostaria de conversar sobre uma tatuagem.");a.target="_blank";a.rel="noopener"});
/* fumaça global (WebGL2) — portada do componente SmokeBackground */
(function(){const cv=$("#smk"),gl=cv.getContext("webgl2",{antialias:false,alpha:false,powerPreference:"low-power"});if(!gl){cv.style.display="none";return}
const FS=`#version 300 es
precision highp float;out vec4 O;uniform float time;uniform vec2 resolution;uniform vec3 u_color;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}
void main(){vec2 uv=(FC-.5*R)/R.y;vec3 col=vec3(1);uv.x+=.25;uv*=vec2(2,1);
float n=fbm(uv*.28-vec2(T*.01,0));n=noise(uv*3.+n*2.);
col.r-=fbm(uv+vec2(0,T*.015)+n);col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);
col=mix(col,u_color,dot(col,vec3(.21,.71,.07)));col=mix(vec3(.08),col,min(time*.1,1.));col=clamp(col,.08,1.);O=vec4(col,1);}`;
const VS=`#version 300 es
precision highp float;in vec4 position;void main(){gl_Position=position;}`;
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o};
let pr;try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw 0}catch(e){cv.style.display="none";return}
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,1,-1,-1,1,1,1,-1]),gl.STATIC_DRAW);const ps=gl.getAttribLocation(pr,"position");gl.enableVertexAttribArray(ps);gl.vertexAttribPointer(ps,2,gl.FLOAT,false,0,0);
const uR=gl.getUniformLocation(pr,"resolution"),uT=gl.getUniformLocation(pr,"time"),uC=gl.getUniformLocation(pr,"u_color"),low=(navigator.hardwareConcurrency||4)<=4;let on=true,raf=0,t0=performance.now();
const size=()=>{const s=low?.38:.5;cv.width=Math.max(2,Math.round(cv.clientWidth*s));cv.height=Math.max(2,Math.round(cv.clientHeight*s));gl.viewport(0,0,cv.width,cv.height)};
const draw=t=>{gl.useProgram(pr);gl.uniform2f(uR,cv.width,cv.height);gl.uniform1f(uT,t+10);gl.uniform3fv(uC,[.78,.78,.77]);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)};
const loop=now=>{raf=0;if(!on||document.hidden)return;draw((now-t0)/1000);raf=requestAnimationFrame(loop)};const go=()=>{if(!RM&&on&&!raf&&!document.hidden)raf=requestAnimationFrame(loop)};
size();new ResizeObserver(()=>{size();draw((performance.now()-t0)/1000)}).observe(cv);if(RM){draw(12);return}
addEventListener("visibilitychange",go);window.__smk=v=>{on=v;if(v)go()};go();cv.addEventListener("webglcontextlost",e=>{e.preventDefault();on=false;cv.style.display="none"})})();
/* navegação: uma página só, menu e trilho rolam até as seções */
const mb=$("#mb"),menu=$("#menu"),WF=$(".wf");
const setMenu=o=>{menu.classList.toggle("o",o);menu.inert=!o;mb.setAttribute("aria-expanded",o);mb.firstElementChild.textContent=o?"FECHAR":"MENU";document.body.style.overflow=o?"hidden":"";["main","#rail",".wf","a.sr"].forEach(s=>{const e=$(s);if(e)e.inert=o});if(o)setTimeout(()=>{const a=menu.querySelector("a");if(a)a.focus()},60)};
mb.onclick=()=>setMenu(!menu.classList.contains("o"));
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();setMenu(false);const t=$(a.getAttribute("href"));setTimeout(()=>t.scrollIntoView({behavior:RM?"auto":"smooth"}),RM?0:380)}));
addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("o")){setMenu(false);mb.focus()}});
const secs=["hero","projeto","trabalhos","catalogo","contato"].map(i=>$("#"+i)),rl=$$("#rail a");
function railUpdate(){const m=innerHeight*.45;let k=0;secs.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=m&&r.bottom>m)k=i});rl.forEach((a,i)=>{const on=i===k;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")})}
const root=document.documentElement;let ticking=0;
const HD=$("#hd");function onScroll(){ticking=0;railUpdate();HD.classList.toggle("sol",scrollY>innerHeight*.85);const h=root.scrollHeight-innerHeight;root.style.setProperty("--sp",(h>0?scrollY/h:0).toFixed(4))}
addEventListener("scroll",()=>{if(!ticking){ticking=1;requestAnimationFrame(onScroll)}},{passive:true});addEventListener("resize",onScroll);addEventListener("load",onScroll);onScroll();
/* revelações: um observador só, que também recebe o que entra depois (cartões, grade) */
const rio=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");rio.unobserve(x.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
const revela=els=>els.forEach(e=>rio.observe(e));
revela($$(".rv,.sp2"));
if(HV&&!RM)$$("[data-mag]").forEach(a=>{a.style.transition="transform .4s var(--eo)";a.addEventListener("pointermove",e=>{const r=a.getBoundingClientRect();a.style.transform="translate("+((e.clientX-r.left-r.width/2)*.12).toFixed(1)+"px,"+((e.clientY-r.top-r.height/2)*.2).toFixed(1)+"px)"});a.addEventListener("pointerleave",()=>{a.style.transform=""})});

/* ===== 01 ORÇAMENTO: LRGZ Manequim no modo vitrine ===== */
const MQ="https://lrgz-manequim.pages.dev/aisora/",fr=$("#manequim"),hd=$("#hd");
addEventListener("message",e=>{if(e.source!==fr.contentWindow||!e.data||!e.data.manequim)return;const d=e.data;
if(d.altura)fr.style.height=Math.max(480,Math.min(4000,d.altura))+"px";
if(d.rolar){const base=fr.getBoundingClientRect().top+scrollY,t=base+d.rolar.t,b=base+d.rolar.b,livre=hd.getBoundingClientRect().bottom+14,cima=scrollY+livre,baixo=scrollY+innerHeight-16;let y=null;
if(d.rolar.modo==="fim"){if(b>baixo)y=b-innerHeight+24}else if(t<cima||b>baixo)y=t-livre;
if(y!==null)scrollTo({top:Math.max(0,y),behavior:RM?"auto":"smooth"})}});
const esc0={};const wfIO=new IntersectionObserver(es=>{es.forEach(e=>esc0[e.target.tagName]=e.isIntersecting);WF.classList.toggle("fora",Object.values(esc0).some(Boolean))},{rootMargin:"-15% 0px -15% 0px"});wfIO.observe(fr);
new IntersectionObserver(([e])=>{esc0.FOOTER=e.isIntersecting;WF.classList.toggle("fora",Object.values(esc0).some(Boolean))},{rootMargin:"0px 0px 40px 0px"}).observe($(".fin"));
function orcamento(estilo,desenho){const q=new URLSearchParams({vitrine:"1"});if(estilo)q.set("estilo",estilo);if(desenho)q.set("desenho",desenho);fr.src=MQ+"?"+q.toString();$("#projeto").scrollIntoView({behavior:RM?"auto":"smooth"})}

/* ===== 02 TRABALHOS: filtros por estilo, grade, "ver mais" ===== */
const OB=(window.OBRAS||[]).slice().sort((a,b)=>a.id.localeCompare(b.id)),TEMAS=["Blackwork","Geek / Anime","Oriental"],PF=$("#pf"),FT=$("#ft"),MAIS=$("#mais"),PASSO=innerWidth<860?12:16;
let tema="all",qtd=PASSO;
const lista=()=>tema==="all"?OB:OB.filter(o=>o.tema===tema);
const num=(o)=>"N° "+o.id;
function tile(o,i,re){return'<li class="'+(re?"re":"")+'" style="--d:'+(i%8)+'"><button type="button" class="ob" data-id="'+o.id+'" aria-label="'+ESC(o.titulo)+", "+ESC(o.tema)+'. Ampliar"><span class="of"><img src="img/t/'+o.id+'.webp" width="720" height="900" alt="Tatuagem: '+ESC(o.titulo)+'" decoding="async" draggable="false"><span class="av mi" aria-hidden="true">AMPLIAR +</span></span><span class="oc"><b>'+ESC(o.titulo)+'</b><span class="mi">'+ESC(o.tema)+"</span></span></button></li>"}
function pinta(anima){const L=lista(),n=Math.min(qtd,L.length);PF.innerHTML=L.slice(0,n).map((o,i)=>tile(o,i,anima)).join("");
MAIS.hidden=n>=L.length;MAIS.querySelector("span").textContent="Ver mais trabalhos ("+(L.length-n)+")";
$("#gct").textContent=String(L.length).padStart(2,"0")+" TRABALHOS"}
FT.innerHTML='<button type="button" class="gb on" data-t="all" aria-pressed="true">Todos<sup>'+OB.length+"</sup></button>"+TEMAS.map(t=>'<button type="button" class="gb" data-t="'+t+'" aria-pressed="false">'+t+"<sup>"+OB.filter(o=>o.tema===t).length+"</sup></button>").join("")+'<span class="mi gct" id="gct" aria-live="polite"></span>';
FT.addEventListener("click",e=>{const b=e.target.closest(".gb");if(!b||b.dataset.t===tema)return;tema=b.dataset.t;qtd=PASSO;
FT.querySelectorAll(".gb").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",on)});
if(RM){pinta(false);return}PF.classList.add("sw");setTimeout(()=>{pinta(true);PF.classList.remove("sw")},200)});
MAIS.addEventListener("click",()=>{const antes=qtd;qtd+=PASSO;const L=lista(),n=Math.min(qtd,L.length);
PF.insertAdjacentHTML("beforeend",L.slice(antes,n).map((o,i)=>tile(o,i,true)).join(""));MAIS.hidden=n>=L.length;MAIS.querySelector("span").textContent="Ver mais trabalhos ("+(L.length-n)+")"});
PF.addEventListener("click",e=>{const b=e.target.closest(".ob");if(b)abre("obra",b.dataset.id,b)});
pinta(false);
/* tudo carregado na abertura (sem lazy): pré-carrega as miniaturas restantes e as fotos grandes depois do load */
addEventListener("load",()=>{const fila=OB.map(o=>"img/t/"+o.id+".webp").concat(OB.map(o=>"img/g/"+o.id+".webp"));let k=0;const vai=()=>{if(k>=fila.length)return;const im=new Image();im.onload=im.onerror=vai;im.src=fila[k++]};for(let i=0;i<4;i++)vai()});

/* ===== 03 DISPONÍVEIS ===== */
const AR=(window.ARTES||[]).filter(a=>a.status==="disponivel"),GAL=$("#gal");
GAL.innerHTML=AR.map((a,i)=>'<li class="rv" style="--d:'+i+'"><button type="button" class="art" data-id="'+ESC(a.id)+'" aria-label="'+ESC(a.nome)+", "+ESC(a.categoria)+', disponível. Ver detalhes"><span class="af"><img src="'+ESC(a.imagem)+'" width="900" height="1200" alt="'+ESC(a.alt)+'" decoding="async" draggable="false"><span class="av mi" aria-hidden="true">VER ARTE +</span></span><span class="ac"><b>'+ESC(a.nome)+'</b><span class="mi">'+ESC(a.categoria)+'</span><span class="st mi"><i></i>DISPONÍVEL</span></span></button></li>').join("");
$("#gmore").innerHTML='Novas artes entram aqui. Para ser avisado, acompanhe no <a class="lk" href="https://www.instagram.com/aisora.ink/" target="_blank" rel="noopener">Instagram</a>.';
revela($$("#gal .rv"));
GAL.addEventListener("click",e=>{const b=e.target.closest(".art");if(b)abre("arte",b.dataset.id,b)});

/* ===== visualizador (trabalhos e artes) ===== */
const AM=$("#am"),AI=$("#am-img"),AF=$(".am-f"),AV=$("#am-vs");let modo="",lst=[],pos=0,quem=null;
function mostra(){const o=lst[pos];AF.classList.remove("sw2");void AF.offsetWidth;AF.classList.add("sw2");
if(modo==="obra"){const vs=[{src:"img/g/"+o.id+".webp",legenda:"Tatuagem"}].concat(o.extras||[]);
AI.src=vs[0].src;AI.alt="Tatuagem: "+o.titulo;AV.hidden=vs.length<2;
AV.innerHTML=vs.length<2?"":vs.map((v,i)=>'<button type="button" class="'+(i?"":"on")+'" data-src="'+v.src+'" aria-pressed="'+!i+'">'+ESC(i?v.legenda:"A tatuagem")+"</button>").join("");
$("#am-id").textContent=num(o)+" — "+o.tema.toUpperCase();$("#am-t").textContent=o.titulo;
$("#am-ds").textContent=o.extras?"Desenhada pela Aisora para este projeto e levada à pele em preto e cinza.":"Do arquivo da Aisora. Use como ponto de partida: no orçamento você conta o que quer mudar.";
$("#am-dl").innerHTML="<div><dt class=\"mi\">ESTILO</dt><dd>"+ESC(o.tema)+"</dd></div>";
$("#am-go").innerHTML="QUERO UMA ASSIM <em>→</em>"}
else{AV.hidden=true;AI.src=o.imagem;AI.alt=o.alt;$("#am-id").textContent=o.id+" — DISPONÍVEL";$("#am-t").textContent=o.nome;$("#am-ds").textContent=o.descricao;
$("#am-dl").innerHTML="<div><dt class=\"mi\">ESTILO</dt><dd>"+ESC(o.categoria)+"</dd></div><div><dt class=\"mi\">STATUS</dt><dd>Disponível</dd></div>";
$("#am-go").innerHTML="QUERO TATUAR ESSA ARTE <em>→</em>"}
$("#am-pos").textContent=String(pos+1).padStart(2,"0")+" / "+String(lst.length).padStart(2,"0");
const um=lst.length<2;$("#am-pv").hidden=um;$("#am-nx").hidden=um;$("#am-pos").hidden=um}
AV.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;AV.querySelectorAll("button").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-pressed",x===b)});AI.src=b.dataset.src;AF.classList.remove("sw2");void AF.offsetWidth;AF.classList.add("sw2")});
function abre(m,id,de){modo=m;quem=de;lst=m==="obra"?lista():AR;pos=Math.max(0,lst.findIndex(o=>o.id===id));mostra();
AM.hidden=false;["main","#rail",".wf","#hd"].forEach(s=>{const e=$(s);if(e)e.inert=true});document.body.style.overflow="hidden";requestAnimationFrame(()=>AM.classList.add("o"));setTimeout(()=>$("#am-x").focus(),50)}
function fecha(){AM.classList.remove("o");["main","#rail",".wf","#hd"].forEach(s=>{const e=$(s);if(e)e.inert=false});document.body.style.overflow="";setTimeout(()=>{AM.hidden=true;AI.removeAttribute("src")},RM?0:300);if(quem)quem.focus({preventScroll:true})}
const anda=d=>{if(lst.length<2)return;pos=(pos+d+lst.length)%lst.length;mostra()};
$("#am-x").onclick=fecha;$("#am-pv").onclick=()=>anda(-1);$("#am-nx").onclick=()=>anda(1);
addEventListener("keydown",e=>{if(AM.hidden)return;if(e.key==="Escape")fecha();else if(e.key==="ArrowLeft")anda(-1);else if(e.key==="ArrowRight")anda(1)});
let sx=0,sy=0;AF.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
AF.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)anda(dx<0?1:-1)},{passive:true});
$("#am-go").onclick=()=>{const o=lst[pos];fecha();if(modo==="obra")orcamento(o.tema);else orcamento("Arte disponível",o.nome)};

/* mapa do contato: Google Maps de verdade; o botão amplia o quadro */
(function(){const c=$("#xmc"),b=$("#xmb");if(!c||!b)return;
b.addEventListener("click",()=>{const o=!c.classList.contains("o");c.classList.toggle("o",o);b.setAttribute("aria-expanded",o);b.textContent=o?"Reduzir o mapa":"Ampliar o mapa"})})();

/* ===== abertura: a logo vem em direção à câmera, fica vazada e engole a tela (uma vez por sessão) ===== */
(function(){const R=document.documentElement;if(!R.classList.contains("intro")){const w=$("#intro");if(w)w.remove();return}
try{sessionStorage.setItem("aisoraIntro","1")}catch(e){}
const wrap=$("#intro"),cv=$("#ic"),ctx=cv.getContext("2d");let raf=0,over=0;
const bez=(a,b,c,d)=>x=>{if(x<=0)return 0;if(x>=1)return 1;let t=x;for(let i=0;i<6;i++){const cx=3*a*t*(1-t)*(1-t)+3*c*t*t*(1-t)+t*t*t-x,dx=3*a*(1-t)*(1-t)+6*(c-a)*t*(1-t)+3*(1-c)*t*t;if(Math.abs(dx)<1e-6)break;t-=cx/dx}return 3*b*t*(1-t)*(1-t)+3*d*t*t*(1-t)+t*t*t};
const EO=bez(.23,1,.32,1),EIO=bez(.77,0,.175,1),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),sm=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x)};
function end(fast){if(over)return;over=1;cancelAnimationFrame(raf);R.classList.remove("intro");wrap.classList.add("o");setTimeout(()=>wrap.remove(),fast?300:650)}
wrap.addEventListener("click",()=>end(true));addEventListener("keydown",e=>{if(e.key==="Escape")end(true)});
const W0=innerWidth,H0=innerHeight;addEventListener("resize",()=>{if(!over&&(innerWidth!==W0||Math.abs(innerHeight-H0)>120))end(true)});
/* desenho vetorial dos kanji da logo (contornos tirados da imagem enviada) */
const G={"w":1496,"h":3100,"fx":766,"fy":1894,"r":77.3,"A":[[404,689,398,688,393,684,389,684,384,680,380,680,369,675,366,672,361,672,356,668,352,668,346,664,341,664,336,660,332,660,327,656,322,656,318,652,314,652,309,649,304,658,304,662,300,667,296,682,275,722,256,753,232,785,213,806,166,852,137,873,130,880,122,884,113,892,109,893,107,898,167,948,186,967,192,968,204,960,254,919,299,874,335,829,367,781,368,776,379,758,379,755,395,725,399,712,408,694],[48,1241,49,1244,100,1291,133,1324,141,1323,145,1319,149,1319,153,1315,158,1315,163,1311,192,1299,197,1295,201,1295,205,1291,209,1291,213,1287,217,1287,229,1279,232,1279,281,1252,286,1251,288,1248,293,1247,297,1243,322,1231,326,1227,329,1227,333,1223,338,1222,354,1211,370,1203,373,1199,376,1199,398,1183,402,1183,440,1223,465,1246,478,1255,485,1263,555,1315,603,1345,601,1349,595,1352,589,1352,583,1356,575,1356,571,1359,562,1360,555,1364,548,1364,540,1368,531,1368,525,1372,517,1372,510,1376,504,1376,496,1380,487,1380,480,1384,472,1384,465,1388,455,1388,448,1392,439,1392,432,1396,421,1396,413,1400,402,1400,395,1404,383,1404,376,1408,364,1408,358,1412,345,1412,336,1416,323,1416,316,1420,304,1420,295,1424,283,1424,275,1428,261,1428,249,1432,237,1432,227,1436,211,1436,203,1440,187,1440,178,1444,161,1444,154,1448,136,1448,125,1452,108,1452,98,1456,79,1456,71,1460,53,1460,43,1464,24,1465,23,1469,40,1490,40,1493,48,1502,49,1506,60,1518,62,1523,71,1533,72,1537,97,1571,104,1571,118,1567,131,1567,137,1564,154,1563,160,1560,177,1559,190,1555,203,1555,237,1547,248,1547,259,1543,270,1543,276,1540,290,1539,300,1535,331,1531,342,1527,351,1527,361,1523,371,1523,381,1519,391,1519,399,1515,407,1515,417,1511,426,1511,435,1507,444,1507,453,1503,464,1502,469,1499,478,1499,486,1495,494,1495,501,1491,510,1491,517,1487,525,1487,532,1483,540,1483,547,1479,553,1479,561,1475,568,1475,576,1471,582,1471,589,1467,596,1467,604,1463,611,1463,617,1459,623,1459,643,1451,648,1451,653,1447,659,1447,665,1443,671,1443,677,1439,683,1439,689,1435,696,1435,713,1427,719,1427,724,1423,730,1423,734,1419,739,1419,744,1415,749,1415,753,1419,758,1419,763,1423,767,1423,773,1427,778,1427,793,1435,799,1435,802,1438,808,1439,814,1443,819,1443,825,1447,830,1447,846,1455,851,1455,856,1459,862,1459,867,1463,875,1463,881,1467,887,1467,893,1471,899,1471,905,1475,911,1475,919,1479,926,1479,932,1483,939,1483,947,1487,954,1487,960,1491,967,1491,975,1495,983,1495,990,1499,999,1499,1003,1502,1013,1503,1022,1507,1031,1507,1040,1511,1069,1516,1074,1519,1084,1519,1092,1523,1104,1523,1112,1527,1124,1527,1132,1531,1145,1531,1155,1535,1164,1535,1176,1539,1189,1539,1200,1543,1217,1544,1223,1547,1242,1548,1248,1551,1261,1551,1275,1555,1290,1555,1302,1559,1317,1559,1330,1563,1342,1563,1358,1567,1375,1567,1390,1571,1407,1545,1411,1542,1415,1534,1423,1525,1427,1517,1443,1498,1447,1489,1451,1486,1459,1473,1470,1460,1469,1457,1445,1456,1433,1452,1409,1452,1396,1448,1375,1448,1362,1444,1339,1444,1327,1440,1310,1440,1298,1436,1280,1436,1271,1432,1251,1432,1242,1428,1223,1428,1214,1424,1198,1424,1189,1420,1174,1420,1166,1416,1153,1416,1143,1412,1130,1412,1121,1408,1111,1408,1100,1404,1089,1404,1082,1400,1070,1400,1063,1396,1051,1396,1044,1392,1033,1392,1027,1388,1019,1388,1011,1384,1003,1384,995,1380,985,1380,979,1376,970,1376,964,1372,956,1372,950,1368,942,1368,936,1364,927,1364,921,1360,915,1360,908,1356,902,1356,893,1352,891,1349,897,1344,909,1339,913,1335,925,1330,954,1311,957,1311,961,1307,977,1299,986,1291,1030,1262,1042,1251,1065,1235,1102,1203,1155,1150,1187,1114,1201,1094,1202,1089,1192,1080,1154,1056,1145,1048,1122,1033,1113,1036,593,1036,591,1032,623,1001,659,957,663,949,670,942,666,935,669,930,944,931,987,927,1022,915,1029,911,1046,896,1055,885,1067,863,1075,836,1076,822,1079,816,1080,798,1083,792,1083,777,1077,776,1060,768,1055,768,1049,764,1044,764,1033,760,1010,748,997,744,993,740,989,740,986,736,981,736,980,745,976,753,976,772,972,783,972,794,964,811,964,815,954,828,939,836,925,836,919,838,668,838,612,836,593,828,584,817,583,811,579,804,579,643,577,641,543,643,465,642,463,644,464,688,462,795,464,842,468,854,468,860,472,868,472,872,480,886,496,904,514,915,537,922,537,928,478,988,447,1015,389,1060,369,1072,366,1076,354,1084,345,1088,330,1099,313,1108,309,1112,306,1112,302,1116,286,1124,270,1135,208,1168,180,1180,159,1192,139,1200,134,1204,130,1204,115,1212,110,1212,105,1216,101,1216,97,1220,83,1224,78,1228,73,1228,69,1232,65,1232,62,1235,56,1236],[499,1128,504,1125,511,1127,1009,1126,1012,1130,976,1161,945,1184,937,1188,934,1192,925,1196,922,1200,913,1204,910,1208,869,1232,865,1236,862,1236,858,1240,853,1241,833,1252,829,1256,825,1256,821,1260,818,1260,805,1268,801,1268,796,1272,783,1276,778,1280,757,1288,752,1292,745,1292,742,1289,720,1280,715,1276,712,1276,707,1272,704,1272,681,1260,677,1256,674,1256,670,1252,653,1244,630,1228,621,1224,618,1220,609,1216,582,1196,554,1172,530,1156,506,1134,501,1132],[1049,692,1048,695,1055,702,1083,724,1093,735,1126,763,1141,779,1157,791,1207,841,1284,927,1299,948,1309,958,1397,885,1398,881,1363,841,1264,743,1204,691,1131,634,1124,636,1106,651,1097,656,1094,660,1086,664,1078,672,1070,676],[1370,125,1343,89,1334,73,1300,30,1298,25,1288,24,1280,28,1268,29,1261,32,1245,33,1238,36,1222,37,1216,40,1201,41,1195,44,1183,44,1169,48,1159,48,1145,52,1134,52,1118,56,1098,57,1092,60,1075,61,1067,64,1051,64,1035,68,1021,68,1003,72,982,73,973,76,958,76,941,80,924,80,909,84,892,84,872,88,846,89,835,92,817,92,796,96,779,96,757,100,738,100,718,104,695,104,670,108,650,108,629,110,625,112,601,112,576,116,486,121,472,124,445,124,426,127,385,128,362,131,325,132,288,136,259,136,220,140,174,141,162,144,129,144,127,146,136,157,140,166,156,189,164,205,168,209,168,213,179,229,185,243,189,245,199,245,211,243,246,243,267,239,308,238,312,241,309,244,304,244,297,248,292,248,277,256,272,256,269,258,268,262,300,301,332,349,367,410,380,438,381,444,377,448,68,448,66,522,67,735,70,739,181,739,183,737,183,549,185,547,650,546,652,550,600,601,600,606,605,607,630,622,658,635,682,651,685,651,701,662,713,667,721,674,738,683,773,707,782,711,785,715,793,719,801,727,810,731,838,753,842,751,879,705,902,681,906,674,882,656,873,652,805,608,802,608,798,604,781,596,777,592,772,591,771,589,742,573,737,572,733,568,729,568,718,560,715,560,702,552,697,552,695,550,697,547,1309,547,1312,551,1312,750,1430,751,1431,449,1139,448,1137,446,1139,440,1159,418,1198,368,1214,343,1251,293,1276,253,1291,234,1291,232,1285,228,1271,224,1266,220,1251,215,1247,212,1232,208,1225,204,1219,204,1213,200,1209,200,1203,196,1199,196,1177,187,1135,263,1104,313,1059,379,1052,386,1023,427,1012,438,1012,446,1010,448,747,448,745,446,748,442,754,439,759,439,764,435,769,435,773,431,778,431,784,427,798,423,820,411,826,411,832,406,827,392,826,382,823,378,823,372,819,367,819,361,815,357,815,352,811,346,811,341,807,336,794,305,767,257,739,218,731,210,733,207,748,206,759,203,789,202,799,199,820,199,844,195,865,195,877,192,899,191,921,187,938,187,958,183,977,183,991,179,1008,179,1026,175,1044,175,1059,171,1081,170,1089,167,1105,167,1119,163,1133,163,1151,159,1169,159,1183,155,1201,155,1214,151,1229,151,1243,147,1256,147,1271,143,1285,143,1298,139,1311,139,1321,135,1332,135,1344,131,1356,131,1369,127],[665,214,659,220,654,220,647,224,641,224,633,228,627,228,618,232,617,234,625,243,636,262,640,265,656,291,656,294,660,297,661,302,672,319,684,348,688,353,688,358,692,363,696,376,700,381,700,386,704,391,704,395,708,401,708,406,712,412,712,416,716,421,716,426,720,432,720,438,723,442,722,447,420,447,420,445,428,439,433,439,438,435,442,435,464,423,477,419,482,415,487,415,494,409,491,406,491,402,487,396,487,392,478,372,475,369,475,366,464,350,463,345,459,341,459,338,455,334,447,318,443,314,431,293,407,266,395,249,383,237,386,232,423,231,446,227,483,227,508,223,539,223,565,219,590,219,612,215,637,215,661,212]],"B":[[52,2961,51,3000,53,3075,1441,3075,1443,3073,1442,2960,801,2960,799,2958,799,2573,803,2569,836,2568,1273,2568,1276,2565,1275,2461,1273,2459,214,2460,212,2462,212,2566,215,2568,619,2568,653,2570,665,2569,671,2573,672,2957,669,2960],[847,2148,847,2150,854,2155,857,2155,874,2167,878,2167,880,2170,885,2171,890,2175,894,2175,898,2179,901,2179,905,2183,908,2183,925,2194,930,2195,934,2199,938,2199,942,2203,945,2203,949,2207,974,2219,978,2223,1002,2235,1006,2239,1017,2243,1021,2247,1025,2247,1029,2251,1033,2251,1037,2255,1062,2267,1066,2271,1069,2271,1073,2275,1090,2283,1113,2298,1118,2299,1122,2303,1126,2303,1128,2306,1153,2319,1157,2323,1162,2324,1185,2339,1188,2339,1203,2348,1205,2351,1208,2351,1229,2363,1245,2374,1257,2379,1274,2391,1290,2399,1294,2403,1312,2412,1352,2437,1354,2437,1366,2425,1437,2343,1435,2340,1425,2336,1423,2333,1418,2332,1402,2321,1397,2320,1394,2316,1390,2316,1386,2312,1369,2304,1365,2300,1361,2300,1358,2296,1354,2296,1350,2292,1333,2284,1329,2280,1326,2280,1322,2276,1302,2265,1297,2264,1286,2256,1283,2256,1250,2237,1237,2232,1233,2228,1229,2228,1226,2224,1223,2224,1201,2212,1197,2208,1193,2208,1189,2204,1186,2204,1166,2192,1138,2179,1130,2173,1125,2172,1104,2160,1101,2160,1097,2156,1093,2156,1089,2152,1085,2152,1081,2148,1062,2140,1050,2132,1046,2132,1042,2128,1039,2128,1034,2124,1023,2120,994,2104,989,2103,986,2100,982,2100,978,2096,973,2095,970,2092,926,2071,923,2068,917,2071,868,2123],[632,2144,579,2092,553,2065,550,2065,505,2100,502,2104,498,2105,490,2112,482,2116,458,2135,429,2152,426,2156,417,2160,414,2164,405,2168,402,2172,397,2173,388,2180,385,2180,383,2183,365,2192,361,2196,337,2208,334,2212,329,2213,307,2227,302,2228,298,2232,294,2232,290,2236,271,2244,203,2280,190,2284,178,2292,173,2292,168,2296,154,2300,150,2304,145,2304,140,2308,137,2308,122,2316,118,2316,104,2324,100,2324,94,2328,89,2328,83,2332,77,2333,74,2336,69,2336,64,2340,60,2340,59,2344,96,2389,132,2437,137,2439,158,2427,162,2427,167,2423,171,2423,185,2415,189,2415,203,2407,207,2407,220,2399,224,2399,229,2395,257,2383,261,2379,264,2379,269,2375,272,2375,277,2371,305,2358,322,2347,325,2347,329,2343,332,2343,397,2307,414,2295,417,2295,421,2291,477,2258,485,2251,494,2247,497,2243,554,2206,592,2176,613,2163,627,2151],[48,1865,47,2205,49,2208,87,2210,119,2208,169,2210,171,2208,171,1974,174,1971,1302,1971,1304,1973,1304,2194,1439,2194,1438,1864,841,1864,835,1858,835,1851,831,1846,831,1841,827,1835,827,1831,823,1825,819,1811,815,1806,815,1801,807,1786,807,1782,799,1769,799,1765,796,1762,795,1757,792,1754,791,1749,775,1720,775,1717,771,1713,771,1709,767,1705,767,1701,763,1697,759,1686,755,1682,743,1657,738,1652,732,1652,725,1656,716,1657,712,1660,705,1660,701,1663,693,1664,686,1668,679,1668,672,1672,666,1672,659,1676,642,1680,636,1684,631,1684,623,1688,616,1689,616,1693,624,1703,632,1722,640,1733,640,1736,648,1749,648,1753,652,1757,652,1761,656,1766,656,1770,660,1775,664,1787,672,1800,677,1814,680,1817,680,1822,684,1827,688,1840,692,1845,692,1850,696,1856,696,1862,693,1864,93,1863]]};
try{
const W=innerWidth,H=innerHeight,dpr=Math.min(devicePixelRatio||1,1.5),mob=W<860,f=mob?.85:1;
cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+"px";cv.style.height=H+"px";
const kh=Math.min(H*(mob?.5:.6),mob?420:580),k0=kh/G.h,kw=G.w*k0,kx=(W-kw)/2,ky=(H-kh)/2;
const P0=[kx+G.fx*k0,ky+G.fy*k0],C=[W/2,H/2],d0=1800,near=1.5;
const Smax=1.1*Math.hypot(W,H)/2/(G.r*k0);
const T_IN=200*f,T_IN2=700*f,T_GO=700*f,T_DUR=1800*f,T_H0=950*f,T_H1=1650*f;
const lay=(L,z)=>L.map(c=>{const n=c.length/2,X=new Float32Array(n),Y=new Float32Array(n);for(let i=0;i<n;i++){X[i]=(c[2*i]-G.fx)*k0;Y[i]=(c[2*i+1]-G.fy)*k0}return{X,Y,n}});
const LA=lay(G.A),LB=lay(G.B);
/* projeção em perspectiva (com recorte no plano da câmera) */
function path(L,z,d,yaw,pitch,piv){const p=new Path2D(),cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),X3=[],Y3=[],D3=[];
for(const c of L){const n=c.n;let m=0;for(let i=0;i<n;i++){const X=c.X[i],Y=c.Y[i],x1=X*cy+z*sy,z1=-X*sy+z*cy,y2=Y*cp-z1*sp,z2=Y*sp+z1*cp;X3[m]=x1;Y3[m]=y2;D3[m]=d+z2;m++}
const px=[],py=[];for(let i=0;i<m;i++){const j=(i+1)%m,a=D3[i]>=near,b=D3[j]>=near;if(a){px.push(piv[0]+d0*X3[i]/D3[i]);py.push(piv[1]+d0*Y3[i]/D3[i])}
if(a!==b){const t=(near-D3[i])/(D3[j]-D3[i]),xx=X3[i]+(X3[j]-X3[i])*t,yy=Y3[i]+(Y3[j]-Y3[i])*t;px.push(piv[0]+d0*xx/near);py.push(piv[1]+d0*yy/near)}}
if(px.length>2){p.moveTo(px[0],py[0]);for(let i=1;i<px.length;i++)p.lineTo(px[i],py[i]);p.closePath()}}return p}
const t0=performance.now();let first=1;
(function frame(now){if(over)return;const t=now-t0;
const a=EO(clamp((t-T_IN)/(500*f))),g=Math.pow(clamp((t-T_GO)/T_DUR),2.2),S=Math.exp(Math.log(Smax*1.06)*g)*(.96+.04*a),d=d0/S;
const h=a,w=EO(clamp(g*2.6)),piv=[P0[0]+(C[0]-P0[0])*w,P0[1]+(C[1]-P0[1])*w];
const yaw=-.16*(1-.6*g),pitch=.06*(1-.6*g),zA=-320*sm(.05,.8,g);
ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
const PB=path(LB,0,d,yaw,pitch,piv),PA=path(LA,zA,d,yaw,pitch,piv);
ctx.globalCompositeOperation="source-over";ctx.globalAlpha=1;ctx.fillStyle="#060606";ctx.fillRect(0,0,W,H);
/* o interior da logo vai ficando transparente: o site aparece por dentro */
if(h>0){ctx.globalCompositeOperation="destination-out";ctx.globalAlpha=h;ctx.fillStyle="#000";ctx.fill(PB);ctx.fill(PA)}
ctx.globalCompositeOperation="source-over";
/* os traços continuam visíveis, em linha */
ctx.globalAlpha=a;ctx.strokeStyle="#f3f3f0";ctx.lineWidth=1.6;ctx.lineJoin="round";ctx.stroke(PB);ctx.stroke(PA);ctx.globalAlpha=1;
if(first){first=0;wrap.style.background="transparent"}
if(g>=.985||t>T_GO+T_DUR+200){end(false);return}
raf=requestAnimationFrame(frame)})(t0);
}catch(err){console.warn("abertura:",err&&err.message||err);end(true)}
})();
