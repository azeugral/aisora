/* Orçamento original da Aisora (configurador com o modelo do corpo, 4 passos: corpo, local, estilo, enviar).
   Código do site original, separado em arquivo: imagens do corpo em img/orc/, zonas em js/zn.js. */
(function(){"use strict";
["M","F","t0","t1","t4"].forEach(k=>{const i=new Image();i.src="img/orc/"+(k.length>1?k:"corpo-"+k)+".webp"});
/* ===== PROJETO: seletor 2D de local sobre as imagens originais ===== */
const nxOn=()=>{const n=$('[data-act="nx"]');if(n)n.disabled=!(ST[c]==="estilo"?(D.estilo&&D.tam):ST[c]==="corpo"?D.gender:ST[c]==="local"?D.region:true)};
const ST=["corpo","local","estilo","enviar"],OV={0:1,1:1,3:1},PR=["CORPO","LOCAL","ESTILO","ENVIAR"];
let D={gender:"",r:"",p:[],region:"",tam:"",estilo:"",detalhe:"",cor:"",refName:"",ideia:""},c=0,VW="f",refURL="",hv="",pvK=null;
try{let nav="";try{nav=performance.getEntriesByType("navigation")[0].type}catch(e){}
if(nav==="navigate")sessionStorage.removeItem("aisora3");/* nova visita começa do zero; só recarregar/voltar mantém as escolhas */
const s=JSON.parse(sessionStorage.getItem("aisora3")||"null");if(s){D=Object.assign(D,s.D);c=Math.min(s.c||0,3);VW=s.v||"f"}}catch(e){}
if(D.estilo==="Autoral")D.estilo="";D.mx=Math.min(D.mx||0,3);
const save=()=>{try{sessionStorage.setItem("aisora3",JSON.stringify({D,c,v:VW}))}catch(e){}};
let needRender=0;
const ART_RAW={artes:window.ARTES||[]},ART_CFG=ART_RAW.config||{},ART=(ART_RAW.artes||[]).filter(a=>a&&a.id&&a.nome&&a.imagem).map(a=>Object.assign({categoria:"Outros",status:"disponivel",descricao:"",tamanho:"",alt:""},a));
const ARTBY=id=>ART.find(a=>a.id===id),CAT2EST={"Oriental":"Oriental","Blackwork":"Blackwork","Geek / Anime":"Geek / Anime","Outros":"Outro"};
/* se a arte escolhida deixou de estar disponível, o orçamento segue normal e a pessoa é avisada */
function artOk(){if(!D.art)return;const a=ARTBY(D.art.id);if(a&&a.status==="disponivel"){D.art.nome=a.nome;D.art.cat=a.categoria;return}D.artGone=D.art.nome||D.art.id;D.art=null;if(D.estAuto){D.estilo="";D.estAuto=0}save()}
/* dados anatômicos: [id, nome, níveis, função(escolhas) -> vista e zonas, áreas clicáveis por vista] */
const LD=["Esquerdo","Direito"],LF=["Esquerda","Direita"],IO={Interno:".in",Externo:".out"};
const RGN=[
["ombro","Ombro",[["Frontal","Lateral","Posterior"],LD],p=>({v:p[0]==="Posterior"?"b":"f",k:[p[0]==="Lateral"?"sh.{S}.out":"sh.{S}"]}),{f:["sh.{S}"],b:["sh.{S}"]}],
["braco","Braço",[["Bíceps","Tríceps"],["Interno","Externo"],LD],p=>({v:p[0]==="Tríceps"?"b":"f",k:["arm.{S}"+(IO[p[1]]||"")]}),{f:["arm.{S}"],b:["arm.{S}"]}],
["antebraco","Antebraço",[["Interno","Externo"],LD],p=>({v:"f",k:["fore.{S}"+(IO[p[0]]||"")]}),{f:["fore.{S}"],b:["fore.{S}"]}],
["mao","Mão",[["Palma","Dorso","Lateral"],LD],p=>({v:p[0]==="Dorso"?"b":"f",k:[p[0]==="Lateral"?"hand.{S}.out":"hand.{S}"]}),{f:["hand.{S}"],b:["hand.{S}"]}],
["peito","Peito",[LD,["Interno","Externo"]],p=>({v:"f",k:["chest.{S}"+(IO[p[0]]||"")]}),{f:["chest.{S}"]}],
["costela","Costela",[LF,["Frontal","Lateral"]],p=>({v:"f",k:[p[0]?"rib.{S}."+(p[0]==="Frontal"?"fr":"lat"):"rib.{S}"]}),{f:["rib.{S}"]}],
["abdomen","Abdômen",[["Superior","Central","Inferior"],LF],p=>({v:"f",k:p[0]?["abd."+(["Superior","Central","Inferior"].indexOf(p[0])+1)+".{S}"]:["abd.1.{S}","abd.2.{S}","abd.3.{S}"]}),{f:["abd.1.{S}","abd.2.{S}","abd.3.{S}"]}],
["costas","Costas",[["Alta","Média","Lombar"],LF],p=>({v:"b",k:p[0]?["back."+(["Alta","Média","Lombar"].indexOf(p[0])+1)+".{S}"]:["back.1.{S}","back.2.{S}","back.3.{S}"]}),{b:["back.1.{S}","back.2.{S}","back.3.{S}"]}],
["lombar","Lombar",[LF],p=>({v:"b",k:["back.3.{S}"]}),{b:["back.3.{S}"]}],
["quadril","Quadril",[["Frontal","Posterior"],LD],p=>({v:p[0]==="Posterior"?"b":"f",k:["hip.{S}"]}),{f:["hip.{S}"],b:["hip.{S}"]}],
["coxa","Coxa",[["Frontal","Lateral","Posterior","Interna"],LF],p=>({v:p[0]==="Posterior"?"b":"f",k:["thigh.{S}"+({Lateral:".out",Interna:".in"}[p[0]]||"")]}),{f:["thigh.{S}"],b:["thigh.{S}"]}],
["joelho","Joelho",[["Frontal","Lateral","Posterior"],LD],p=>({v:p[0]==="Posterior"?"b":"f",k:["knee.{S}"+(p[0]==="Lateral"?".out":"")]}),{f:["knee.{S}"],b:["knee.{S}"]}],
["panturrilha","Panturrilha",[["Frontal","Lateral","Posterior","Interna"],LF],p=>({v:["Frontal","Lateral","Interna"].includes(p[0])?"f":"b",k:["shin.{S}"+({Lateral:".out",Interna:".in"}[p[0]]||"")]}),{b:["shin.{S}"]}],
["canela","Canela",[["Frontal","Lateral"],LF],p=>({v:"f",k:["shin.{S}"+(p[0]==="Lateral"?".out":"")]}),{f:["shin.{S}"]}],
["pe","Pé",[["Superior","Lateral","Tornozelo"],LD],p=>({v:"f",k:[p[0]==="Tornozelo"?"ankle.{S}":p[0]==="Lateral"?"foot.{S}.out":"foot.{S}"]}),{f:["foot.{S}","ankle.{S}"],b:["foot.{S}","ankle.{S}"]}]];
const rg=id=>RGN.find(x=>x[0]===id),isL=l=>l===LD||l===LF,sideOf=(lab,v)=>(lab[0]==="D")===(v==="f")?"A":"B";
function selKeys(r,path){const li=r[2].findIndex(isL),lab=li>=0?path[li]:null,o=r[3](path.filter((_,i)=>i!==li)),sides=lab?[sideOf(lab,o.v)]:["A","B"];return{v:o.v,keys:o.k.flatMap(t=>sides.map(s=>t.replace("{S}",s)))}}
const blank=r=>r[2].map(()=>"");
function regText(){const r=rg(D.r);if(!r)return"";const li=r[2].findIndex(isL),lab=li>=0?D.p[li]:"",pk=D.p.filter((x,i)=>i!==li&&x);return r[1]+(lab?" "+lab.toLowerCase():"")+(pk.length?" · "+pk.join(" · "):"")}
{const r0=rg(D.r);D.p=r0?r0[2].map((_,i)=>D.p[i]||""):[]}
D.region=regText();
/* palco 2D: a imagem original fica intacta; a câmera é só transform e as zonas são SVG por cima */
const ZN=window.ZN,stg=$("#stg"),cam=$("#cam"),bimg=$("#bimg"),ovl=$("#ovl");let Z=null;
let fa=0;
function stageSet(){$("#emp").hidden=!!D.gender;$("#cp").hidden=!D.gender;if(!D.gender){cam.style.visibility="hidden";Z=null;ovl.innerHTML="";return}const g=D.gender==="Feminino"?"F":"M";Z=ZN[g];if(bimg.dataset.g!==g){bimg.dataset.g=g;bimg.src="img/orc/corpo-"+g+".webp"}cam.style.width=Z.W+"px";cam.style.height=Z.H+"px";ovl.setAttribute("viewBox","0 0 "+Z.W+" "+Z.H);cam.style.visibility="visible";$("#zo").hidden=!(D.r&&!fa)}
function fit(r,inst){const sw=stg.clientWidth||300,sh=stg.clientHeight||300;let w=r[2],h=r[3];if(w/h<sw/sh)w=h*sw/sh;else h=w*sh/sw;const s=sw/w,cx=r[0]+r[2]/2,cy=r[1]+r[3]/2;if(inst)cam.style.transition="none";cam.style.transform="translate("+(sw/2-cx*s)+"px,"+(sh/2-cy*s)+"px) scale("+s+")";if(inst){cam.offsetWidth;cam.style.transition=""}}
const allRect=()=>{const f=Z.box.f,b=Z.box.b,x0=Math.min(f[0],b[0]),y0=Math.min(f[1],b[1]),x1=Math.max(f[2],b[2]),y1=Math.max(f[3],b[3]),w=x1-x0,h=y1-y0;return[x0-w*.06,y0-h*.03,w*1.12,h*1.06]};
const baseRect=v=>{const b=Z.box[v],w=b[2]-b[0],h=b[3]-b[1];return[b[0]-w*.14,b[1]-h*.03,w*1.28,h*1.06]};
function fitSel(inst){if(!Z)return;let rect=allRect();const g=$("#hl");if(g&&!fa&&g.childNodes.length){const b=g.getBBox();if(b.width>1){const F=Z.box[VW],w=Math.max(b.width*3.4,(F[2]-F[0])*.72),h=w*stg.clientHeight/stg.clientWidth;rect=[b.x+b.width/2-w/2,b.y+b.height/2-h/2,w,h]}}fit(rect,inst)}
function draw(){if(!Z)return;const r=rg(D.r),zv=Z.z[VW];let h="";
["f","b"].forEach(v=>{const zz=Z.z[v];RGN.forEach(x=>{const tt=x[4][v];if(tt)tt.forEach(tp=>["A","B"].forEach(s=>{const k=tp.replace("{S}",s);if(zz[k])h+='<path class="ht'+(hv===x[0]?" on":"")+(D.r===x[0]?" cur":"")+'" data-r="'+x[0]+'" data-s="'+s+'" data-v="'+v+'" d="'+zz[k]+'" tabindex="0" role="button" aria-label="'+x[1]+(v==="f"?" (frente)":" (costas)")+'"/>'}))})});
if(r){const o=selKeys(r,D.p);let ks=null;if(o.v===VW)ks=o.keys;else if(r[4][VW]){const li=r[2].findIndex(isL),lab=li>=0?D.p[li]:"",sd=lab?[sideOf(lab,VW)]:["A","B"];ks=r[4][VW].flatMap(tp=>sd.map(s=>tp.replace("{S}",s)))}
if(ks)h+='<g id="hl">'+ks.map(k=>zv[k]?'<path class="hz" d="'+zv[k]+'"/>':"").join("")+"</g>"}
if(pvK&&pvK.v===VW)h+=pvK.keys.map(k=>zv[k]?'<path class="pv" d="'+zv[k]+'"/>':"").join("");ovl.innerHTML=h}
function capUpd(){const r=rg(D.r),lc=ST[c]==="local";let t=!D.gender?"ESCOLHA UM MODELO":hv?(lc?rg(hv)[1].toUpperCase():"SELECIONAR — "+rg(hv)[1].toUpperCase()):r?(lc?"":(D.region?"LOCAL — "+D.region.toUpperCase():r[1].toUpperCase())):"TOQUE NO CORPO PARA ESCOLHER";$("#cp").textContent=t;$("#cp").hidden=!D.gender||!t}
function setHv(id){hv=id;$$(".ht").forEach(p=>p.classList.toggle("on",p.dataset.r===id));capUpd()}
function refresh(){stageSet();draw();fitSel(false);capUpd()}
function refocus(sel){const e=sel&&$("#stp "+sel);if(e)e.focus({preventScroll:true})}
function pickRegion(id,v){const r=rg(id);if(D.r===id){hv="";fa=0;if(v&&r[4][v])VW=v;save();refresh();return}fa=0;D.r=id;D.p=blank(r);D.region="";hv="";pvK=null;VW=v&&r[4][v]?v:(r[4][VW]?VW:selKeys(r,D.p).v);save();render(1,1);refresh();refocus('[data-r="'+id+'"]')}
function pickLevel(j,lab){const r=rg(D.r);fa=0;if(hv)setHv("");D.p[j]=lab;D.region=regText();pvK=null;VW=selKeys(r,D.p).v;save();render(1,1);refresh();refocus('[data-li="'+j+'"][data-lv="'+lab+'"]')}
function hitClick(el){const id=el.dataset.r,v=el.dataset.v;if(id!==D.r||fa){pickRegion(id,v);return}const r=rg(id),li=r[2].findIndex(isL);if(li>=0){const person=((el.dataset.s==="A")===(v==="f"))?1:0;if(D.p[li]!==r[2][li][person])pickLevel(li,r[2][li][person])}}
const crumb=()=>{const r=rg(D.r),a=[["CORPO",0]];if(r){a.push([r[1].toUpperCase(),1]);D.p.filter(Boolean).forEach(x=>a.push([x.toUpperCase(),-1]))}return'<nav class="cr tr" aria-label="Seleção atual">'+a.map((x,i)=>x[1]>=0&&!(i===a.length-1&&i>0&&false)?'<button data-cr="'+x[1]+'" aria-label="'+(x[1]?"Recomeçar as opções de ":"Voltar para ")+x[0]+'">'+x[0]+"</button>":"<span>"+x[0]+"</span>").join("")+"</nav>"};
function estiloHTML(){const cor='<span class="tr lb">COR <i>(OPCIONAL)</i></span>'+op(["Preto e branco","Preto e vermelho"],"cor");
if(D.art)return'<h3>Tamanho e cor.</h3><span class="tr lb">TAMANHO</span>'+op(TS,"tam","sz")+cor+nav(0,D.estilo&&D.tam);
return'<h3>Seu estilo.</h3><div class="op tl" data-k="estilo" role="group" aria-label="Estilo">'+["Blackwork","Geek / Anime","Oriental","Outro"].map((o,i)=>tile(o,["I","II","III","IV"][i])).join("")+'</div><span class="tr lb">TAMANHO</span>'+op(TS,"tam","sz")+cor+nav(0,D.estilo&&D.tam)}
function artBar(){let h="";if(D.artGone)h+='<div class="note" role="status"><span>A arte “'+ESC(D.artGone)+'” não está mais disponível. Você pode continuar o orçamento normalmente ou <a class="lk" href="#catalogo">escolher outra arte</a>.</span><button class="l" data-act="okn">OK</button></div>';
if(D.art){const a=ARTBY(D.art.id);h+='<div class="artb"><img alt="" src="'+ESC(a?a.imagem:"")+'"><div><span class="mi">ARTE ESCOLHIDA · '+ESC(D.art.id)+'</span><b>'+ESC(D.art.nome)+'</b></div><a class="lk" href="#catalogo">Trocar</a><button class="l" data-act="noart">Remover</button></div>'}return h}
function topBack(){if(c===0)return"";const r=rg(D.r);let to;if(ST[c]==="local"){{const ch=D.p.filter(Boolean);to=ch.length?ch[ch.length-1]:D.r?r[1]:"Corpo"}}else to=PR[c-1][0]+PR[c-1].slice(1).toLowerCase();return'<button class="back" data-act="'+(ST[c]==="local"?"lvbk":"bk")+'" aria-label="Voltar para '+to+'"><span aria-hidden="true">←</span> Voltar<small>'+to+"</small></button>"}
function corpoHTML(){return'<h3>Escolha o corpo.</h3><div class="op gl" role="group">'+["Feminino","Masculino"].map((g,i)=>'<button data-g="'+g+'" aria-pressed="'+(D.gender===g)+'" class="'+(D.gender===g?"on":"")+'"><b>0'+(i+1)+'</b><span>'+g.toUpperCase()+'</span></button>').join("")+'</div>'}
function selName(r){const li=r[2].findIndex(isL),sd=li>=0&&D.p[li]?D.p[li].toLowerCase():"";return r[1]+(sd?" "+sd:"")}
function localHTML(){const r=rg(D.r);
let h=r?'<span class="tr lb">REGIÃO SELECIONADA</span><h3 class="rsel">'+ESC(selName(r))+'</h3>':'<h3>Onde será a tatuagem?</h3>';
if(r)r[2].forEach((o,j)=>{const L=isL(o);h+='<span class="tr lb">'+(L?"LADO":j===0?"DETALHE":"POSIÇÃO")+' <i>(OPCIONAL)</i></span><div class="op sub" role="group" aria-label="'+(L?"Lado":j===0?"Subregião":"Posição")+'">'+o.map(x=>'<button data-li="'+j+'" data-lv="'+x+'" aria-pressed="'+(D.p[j]===x)+'" class="'+(D.p[j]===x?"on":"")+'">'+x+"</button>").join("")+"</div>"});
h+='<button type="button" class="lst" data-act="rl" aria-expanded="false" aria-controls="rgl">Escolher pela lista</button><div class="op rgl" id="rgl" role="group" aria-label="Regiões do corpo" hidden>'+RGN.map(x=>'<button data-r="'+x[0]+'" aria-pressed="'+(D.r===x[0])+'" class="'+(D.r===x[0]?"on":"")+'">'+x[1]+"</button>").join("")+"</div>";
return h+(r?'<div class="n2"><button class="b f" data-act="nx"'+(D.region?"":" disabled")+'>CONTINUAR →</button></div>':"")}
const TS=["Pequeno · até 10 cm","Médio · 10–20 cm","Grande · 20–30 cm","Cobertura extensa · 30 cm+"];
const op=(l,k,cl)=>'<div class="op '+(cl||"")+'" data-k="'+k+'" role="group">'+l.map(o=>'<button data-v="'+o+'" aria-pressed="'+(D[k]===o)+'" class="'+(D[k]===o?"on":"")+'">'+o+'</button>').join("")+'</div>';
const TIMG={"Blackwork":"t0","Geek / Anime":"t1","Oriental":"t4"};
const tile=(o,i)=>'<button data-v="'+o+'" aria-pressed="'+(D.estilo===o)+'" class="'+(D.estilo===o?"on":"")+(TIMG[o]?"":" semfoto")+'">'+(TIMG[o]?'<img decoding="async" src="img/orc/'+TIMG[o]+'.webp" alt="">':'<svg class="tph" viewBox="0 0 1496 3100" aria-hidden="true" focusable="false"><use href="#lg"/></svg>')+'<i class="no" aria-hidden="true">'+i+'</i><span>'+o.toUpperCase()+'</span></button>';
const nav=(back,ok,lbl)=>'<div class="n2">'+(back?'<button class="l" data-act="bk">VOLTAR</button>':'')+'<button class="b f" data-act="nx"'+(ok?"":" disabled")+'>'+(lbl||"CONTINUAR →")+'</button></div>';
/* ===== dados do cliente: nome e idade (obrigatórios) ===== */
const nomeLimpo=()=>(D.nome||"").trim().replace(/\s+/g," ");
function fieldsHTML(){return'<div class="fld"><label class="tr lb" for="f-nome">NOME COMPLETO <i>(OBRIGATÓRIO)</i></label><input class="fi" id="f-nome" type="text" autocomplete="name" autocapitalize="words" maxlength="80" required aria-required="true" aria-describedby="e-nome" placeholder="Como você se chama?" value="'+ESC(D.nome||"")+'"><p class="ferr tr" id="e-nome" role="alert" hidden></p></div><div class="fld"><label class="tr lb" for="f-idade">IDADE <i>(OBRIGATÓRIO)</i></label><input class="fi fi2" id="f-idade" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="3" required aria-required="true" aria-describedby="e-idade" placeholder="Somente números" value="'+ESC(D.idade||"")+'"><p class="ferr tr" id="e-idade" role="alert" hidden></p></div>'}
function setErr(k,msg){const e=$("#e-"+k),i=$("#f-"+(k==="nome"?"nome":"idade"));if(!e||!i)return;e.hidden=!msg;e.textContent=msg||"";i.classList.toggle("bad",!!msg);i.setAttribute("aria-invalid",msg?"true":"false")}
function validate(){const n=nomeLimpo(),a=(D.idade||"").trim(),age=parseInt(a,10);
const nameOk=n.length>=3&&/^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u.test(n)&&/\p{L}[\s\S]*\p{L}/u.test(n),ageOk=/^\d{1,3}$/.test(a)&&age>=1&&age<=120;
setErr("nome",nameOk?"":(n?"Use apenas letras no nome.":"Informe seu nome completo."));setErr("idade",ageOk?"":"Informe sua idade, somente números.");
const first=!nameOk?$("#f-nome"):!ageOk?$("#f-idade"):null;if(first)first.focus();return !first}
function regParts(){const r=rg(D.r);if(!r)return{reg:D.region||"-",lado:""};const li=r[2].findIndex(isL),lado=li>=0?D.p[li]:"",sub=D.p.filter((x,k)=>k!==li&&x);return{reg:[r[1]].concat(sub).join(" · "),lado}}
function mkMsg(){const g=regParts(),ideia=(D.ideia&&D.ideia!=="Ainda estou descobrindo a ideia"?D.ideia:"").trim(),
local=g.reg+(g.lado?" ("+g.lado.toLowerCase()+")":""),
blocos=[["Olá, Aisora! Vim pelo site e quero fazer um orçamento de tatuagem."],
["*Nome:* "+(nomeLimpo()||"-"),"*Idade:* "+(((D.idade||"").trim())?D.idade.trim()+" anos":"-")],
[D.art?"*Arte escolhida:* "+D.art.nome+" ("+D.art.id+")":"*Estilo:* "+(D.estilo||"-"),"*Local:* "+(local||"-"),"*Corpo de referência:* "+(D.gender||"-"),"*Tamanho:* "+(D.tam||"-")].concat(D.cor?["*Cor:* "+D.cor]:[])];
if(ideia)blocos.push(["*"+(D.art?"Observações":"Ideia")+":*",ideia]);
blocos.push(["Gostaria de saber a disponibilidade e os próximos passos. Já mando as referências por aqui."]);
return wa(blocos.map(b=>b.join("\n")).join("\n\n"))}
function render(first,keep){D.region=regText();const k=ST[c],a0=first?0:$("#stp").getBoundingClientRect().top;D.mx=Math.max(D.mx||0,c);artOk();PR[2]=D.art?"TAMANHO":"ESTILO";$("#pr").innerHTML=PR.map((n,i)=>'<li class="'+(i<c?"d":i===c?"on":"")+'"><button data-step="'+i+'"'+(i>D.mx||i===c?" disabled":"")+(i===c?' aria-current="step"':' aria-label="Ir para '+n+'"')+'><span>0'+(i+1)+'</span>'+n+'</button></li>').join("");$("#pb").classList.toggle("v",!!OV[c]);const SPO='<div class="sp'+(keep?' nk':'')+'">';let h=SPO;
if(k==="corpo")h+=corpoHTML();
if(k==="local")h+=localHTML();
if(k==="estilo")h+=estiloHTML();
if(k==="enviar"){const bits=[[[D.gender,D.region].filter(Boolean).join(" · "),1],[D.art?"":D.estilo,2],[D.tam,2],[D.cor,2]].filter(x=>x[0]);
h+='<h3>Pronto.</h3><div class="chips">'+(D.art?'<a class="chip" href="#catalogo" aria-label="Arte escolhida: '+ESC(D.art.nome)+'. Trocar">ARTE · '+ESC(D.art.nome)+'</a>':'')+bits.map(x=>'<button class="chip" data-step="'+x[1]+'" aria-label="Alterar: '+x[0]+'">'+x[0]+'</button>').join("")+'</div>'+fieldsHTML()+'<label class="tr lb" for="ta">'+(D.art?"OBSERVAÇÕES":"SUA IDEIA")+' <i>(OPCIONAL)</i></label><textarea id="ta" rows="2" placeholder="'+(D.art?"Quer mudar algo na arte? Conte aqui.":"Conte em uma frase o que você imagina.")+'">'+(D.ideia==="Ainda estou descobrindo a ideia"?"":D.ideia)+'</textarea>'+'<p class="refnote"><b>Depois de enviar o orçamento</b>, mande também as fotos de referência (desenhos, tatuagens e inspirações) na mesma conversa do WhatsApp.</p><div class="n2"><a class="b f" id="send" target="_blank" rel="noopener">ENVIAR PELO WHATSAPP →</a><button class="l" data-act="rs">RECOMEÇAR</button></div>'}
h=h.replace(SPO,SPO+topBack()+artBar());$("#stp").innerHTML=h+'</div>';$("#stp").dataset.k=k;$("#pb").dataset.k=k;save();if(!first){const dy=$("#stp").getBoundingClientRect().top-a0;if(Math.abs(dy)>1)scrollBy({top:dy,behavior:"instant"})}
if(k==="enviar")$("#send").href=mkMsg();
if(OV[c]){stageSet();draw();if(!keep)fitSel(!!first);capUpd()}
}

$("#stp").onclick=e=>{const t=e.target.closest("button");if(!t)return;
if(t.dataset.step!==undefined){c=+t.dataset.step;render();return}
if(t.dataset.cr!==undefined){const i=+t.dataset.cr;if(i===0){c=0;render()}else{const r=rg(D.r);D.p=blank(r);D.region="";VW=selKeys(r,D.p).v;save();render(1,1);refresh()}return}
if(t.dataset.act){const a=t.dataset.act;if(a==="bk"){c--;render()}else if(a==="nx"){c++;render()}else if(a==="lvbk"){let k=-1;D.p.forEach((x,i)=>{if(x)k=i});if(k>=0){D.p[k]="";D.region="";VW=selKeys(rg(D.r),D.p).v;save();render(1,1);refresh()}else if(D.r){D.r="";D.p=[];D.region="";save();render(1,1);refresh()}else{c--;render()}}else if(a==="chg"){D.r="";D.p=[];D.region="";VW=VW;save();render(1,1);refresh()}else if(a==="unk"){D.ideia="Ainda estou descobrindo a ideia";save();c++;render()}else if(a==="noart"){if(D.estAuto){D.estilo="";D.estAuto=0}D.art=null;save();render(1)}else if(a==="okn"){D.artGone="";save();render(1,1)}else if(a==="rl"){const l=$("#rgl"),o=l.hidden;l.hidden=!o;t.setAttribute("aria-expanded",o);t.textContent=o?"Ocultar a lista":"Escolher pela lista"}else if(a==="rs"){D={gender:"",r:"",p:[],region:"",tam:"",estilo:"",detalhe:"",cor:"",refName:"",ideia:"",nome:"",idade:""};c=0;VW="f";render()}return}
if(t.dataset.r){pickRegion(t.dataset.r);return}
if(t.dataset.lv!==undefined){pickLevel(+t.dataset.li,t.dataset.lv);return}
if(t.dataset.g){D.gender=t.dataset.g;save();$$("#stp .gl button").forEach(b=>{const on=b===t;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});stageSet();draw();fitSel(false);capUpd();setTimeout(()=>{if(c===0&&D.gender){c=1;render()}},300);return}
const o=t.closest(".op[data-k]");if(o&&t.dataset.v){const key=o.dataset.k;D[key]=t.dataset.v;save();o.querySelectorAll("button").forEach(b=>{const on=b===t;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});nxOn()}};
let PT=matchMedia("(hover:none)").matches?"touch":"mouse";addEventListener("pointerdown",e=>{PT=e.pointerType},{capture:true,passive:true});addEventListener("pointermove",e=>{if(e.pointerType==="mouse")PT="mouse"},{passive:true});const mouseOn=()=>PT==="mouse";
$("#stp").onmouseover=e=>{if(!mouseOn())return;const t=e.target.closest("button");if(!t)return;if(t.dataset.r)setHv(t.dataset.r);else if(t.dataset.lv!==undefined&&D.r){const pp=D.p.slice();pp[+t.dataset.li]=t.dataset.lv;pvK=selKeys(rg(D.r),pp);draw()}};
$("#stp").onmouseout=e=>{if(!mouseOn())return;if(e.target.closest("button")){if(hv)setHv("");if(pvK){pvK=null;draw()}}};
ovl.onclick=e=>{const p=e.target.closest(".ht");if(p)hitClick(p)};
ovl.onmouseover=e=>{if(!mouseOn())return;const p=e.target.closest(".ht");if(p)setHv(p.dataset.r)};ovl.onmouseout=e=>{if(!mouseOn())return;if(e.target.closest(".ht"))setHv("")};
ovl.onkeydown=e=>{const p=e.target.closest(".ht");if(p&&(e.key==="Enter"||e.key===" ")){e.preventDefault();hitClick(p)}};
$("#pr").onclick=e=>{const b=e.target.closest("button[data-step]");if(b&&!b.disabled){c=+b.dataset.step;render()}};
$("#zo").onclick=()=>{fa=1;stageSet();fitSel(false)};
stg.addEventListener("click",e=>{if(!mouseOn()||!Z||!D.r||fa||e.target.closest(".ht"))return;fa=1;stageSet();fitSel(false)});
new ResizeObserver(()=>{if(Z)fitSel(true)}).observe(stg);
render(1);
$("#stp").oninput=e=>{const id=e.target.id;if(id==="ta"){D.ideia=e.target.value}else if(id==="f-nome"){D.nome=e.target.value;setErr("nome","")}else if(id==="f-idade"){const v=e.target.value.replace(/\D/g,"").slice(0,3);if(v!==e.target.value)e.target.value=v;D.idade=v;setErr("idade","")}else return;save();const s=$("#send");if(s)s.href=mkMsg()};
/* enviar: só abre o WhatsApp com nome e idade preenchidos */
$("#stp").addEventListener("click",e=>{const s=e.target.closest("#send");if(!s)return;if(!validate()){e.preventDefault();return}s.href=mkMsg()});
/* entradas vindas do portfólio e das artes disponíveis */
const vai=()=>$("#projeto").scrollIntoView({behavior:RM?"auto":"smooth"});
window.orcEstilo=function(est){D.art=null;D.artGone="";D.estilo=["Blackwork","Geek / Anime","Oriental"].includes(est)?est:"Outro";D.estAuto=0;save();if(c>2){c=2}render(1);vai()};
window.orcArte=function(id){const a=ARTBY(id);if(!a||a.status!=="disponivel")return;
D=Object.assign(D,{tam:"",estilo:CAT2EST[a.categoria]||"Outro",estAuto:1,art:{id:a.id,nome:a.nome,cat:a.categoria},artGone:""});
c=D.gender?(D.region?2:1):0;save();render(1);vai()};
})();
