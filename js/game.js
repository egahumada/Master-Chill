'use strict';
const $=s=>document.querySelector(s);const screens=[...document.querySelectorAll('.screen')];
const cast=[['La Estratega','Planifica cada movimiento','👩‍🍳'],['El Velocista','Rápido como un rayo','🧑‍🍳'],['El Perfeccionista','No soporta un corte chueco','👨‍🍳'],['El Caos','Improvisa y que sea lo que sea','🥸'],['La Inventora','Mezcla sabores imposibles','👩‍🍳'],['El Clásico','A la antigua y sin miedo','👨‍🍳'],['La Tormenta','Entra a la cocina arrasando','🧑‍🍳'],['El Decorador','Todo entra por los ojos','👩‍🍳']];
let chosen=0,score=0,move=0,items=0,layers=0,hits=0,cut=0,clock=null,keyHandler=null;
const judgeLines={
Yann:['La idea está buena, pero quiero ver ejecución. ¡Vamos!','Esto necesita carácter. ¡No le tengas miedo al sabor!','Ojo con la técnica, chef. La cocina no perdona.'],
Fernanda:['¡Qué lindo desafío! Ahora hay que hacerlo bien.','Me encanta la energía, aunque falta un poquito de orden.','¡Confía en tu instinto y dale con todo!'],
Juanma:['¡Esto está más intenso que un servicio de sábado!','¡A ese plato le falta cariño y le sobra apuro!','¡Señores, aquí vinimos a cocinar!']
};
const reactLines={
Yuhui:['¡Vamos, vamos! ¡Con cariño queda más rico!','¡Ay, qué nervios! Yo quiero probar ese plato.','¡No te apures tanto, primero cocina rico!'],
Fran:['¡Pero qué está pasando en esta cocina!','Yo habría probado eso antes de emplatar.','¡Necesito ver ese resultado ahora ya!']
};
let reactTurn=0;
function sayLine(custom){const voices=['Yann','Fernanda','Juanma'];const who=voices[Math.floor(Math.random()*voices.length)];const line=custom||judgeLines[who][Math.floor(Math.random()*judgeLines[who].length)];const el=$('#judge-comment');if(el)el.textContent=who+': “'+line+'”';}
function reactComment(){if(reactTurn++%3!==2)return;const who=Math.random()<.5?'Yuhui':'Fran';const line=reactLines[who][Math.floor(Math.random()*reactLines[who].length)];const el=$('#judge-comment');if(el)el.textContent=who+' (REACT): “'+line+'”';}
function go(id){if(clock)clearInterval(clock);if(keyHandler){removeEventListener('keydown',keyHandler);keyHandler=null;}screens.forEach(x=>x.classList.toggle('active',x.id===id));}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
function roster(){ $('#roster').innerHTML=cast.map((c,i)=>`<button class="character ${i===chosen?'selected':''}" data-c="${i}"><span class="avatar">${c[2]}</span><b>${c[0]}</b><small>${c[1]}</small></button>`).join('');document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{chosen=Number(b.dataset.c);roster()});}
roster();$('#to-modes').onclick=()=>go('modos');document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>start(b.dataset.mode));
function points(n){score=n;$('#score').textContent=n}
function start(mode){go('juego');points(0);move=4;items=0;layers=0;hits=0;cut=0;reactTurn=0;sayLine('¡Bienvenidos a la cocina! Hoy se viene bueno.');const names={collect:'LA DESPENSA LOCA',cut:'CORTE CONTRARRELOJ',versus:'DUELO DE CUCHARONES',tower:'TORRE DE TORTAS'};$('#game-title').textContent=names[mode];if(mode==='collect')collect();if(mode==='cut')cutting();if(mode==='versus')versus();if(mode==='tower')tower();}
function finish(extra){$('#game-controls').innerHTML=`<button id="again">REPETIR DESAFÍO</button><button id="other">OTRO DESAFÍO</button>`;$('#again').onclick=()=>start(extra);$('#other').onclick=()=>go('modos');}
function collect(){
 $('#game-help').textContent='← → o A/D para moverte · ↑, W o SALTAR para brincar · ESPACIO o RECOGER para tomar ingredientes.';
 $('#game-area').innerHTML='<div class="collect-scene"><div class="scene-label">DESPENSA · RECOLECTA 6 INGREDIENTES</div><div class="player" id="player">🧑‍🍳</div><span class="food" style="left:18%">🥕</span><span class="food" style="left:34%">🍅</span><span class="food" style="left:50%">🧀</span><span class="food" style="left:66%">🥦</span><span class="food" style="left:80%">🍄</span><span class="food" style="left:92%">🌶️</span><span class="obstacle" id="bucket" style="left:42%">🪣</span></div><p class="feedback" id="collect-status">Ingredientes: 0 / 6 · Vidas: 3</p>';
 $('#game-controls').innerHTML='<button id="left">← MOVER</button><button id="jump">⬆ SALTAR</button><button id="right">MOVER →</button><button id="pick">🥕 RECOGER</button>';
 const p=$('#player');let lives=3,jumping=false,jumpTimer=null,invulnerable=false;
 function shift(d){
  const previous=move;move=Math.max(0,Math.min(91,move+d));
  const crossedBucket=previous<39&&move>=39||previous>45&&move<=45;
  if(crossedBucket&&!jumping&&!invulnerable){
   lives--;move=previous<42?34:49;invulnerable=true;
   $('#collect-status').textContent='¡Te tropezaste con el balde! Vidas: '+lives;
   sayLine('¡Cuidado con los cachureos! ¡Mira por dónde vas!');
   p.classList.add('bumped');
   setTimeout(()=>{p.classList.remove('bumped');invulnerable=false},650);
   if(lives<=0){$('#collect-status').textContent='¡Te quedaste sin vidas! Inténtalo otra vez.';$('#game-controls').innerHTML='<button id="retry">REINTENTAR</button>';$('#retry').onclick=()=>start('collect');return}
  }
  p.style.left=move+'%';
 }
 function jump(){
  if(jumping)return;jumping=true;p.classList.add('jumping');sayLine('¡Eso, chef! ¡Salta ese obstáculo!');
  clearTimeout(jumpTimer);jumpTimer=setTimeout(()=>{jumping=false;p.classList.remove('jumping')},620);
 }
 $('#left').onclick=()=>shift(-5);$('#right').onclick=()=>shift(5);$('#jump').onclick=jump;
 $('#pick').onclick=()=>{
  const foods=[...document.querySelectorAll('.food')];let nearest=null,dist=Infinity;
  foods.forEach(food=>{const x=parseFloat(food.style.left);const d=Math.abs(x-(move+3));if(d<dist){dist=d;nearest=food}});
  if(!nearest||dist>9){$('#collect-status').textContent='¡Acércate un poco más al ingrediente! · Vidas: '+lives;sayLine('¡Primero hay que acercarse a la despensa!');return}
  nearest.remove();items++;points(score+10);$('#collect-status').textContent='Ingredientes: '+items+' / 6 · Vidas: '+lives;sayLine();reactComment();
  if(items>=6){$('#collect-status').textContent='¡Despensa completada! ¡Y sin dejar la cocina patas arriba!';sayLine('¡Mise en place lista! ¡Excelente trabajo!');finish('collect')}
 };
 keyHandler=e=>{
  if(!$('#juego').classList.contains('active'))return;
  const k=e.key.toLowerCase();
  if(k==='arrowleft'||k==='a'){e.preventDefault();shift(-5)}
  if(k==='arrowright'||k==='d'){e.preventDefault();shift(5)}
  if(k==='arrowup'||k==='w'){e.preventDefault();jump()}
  if(k===' '){e.preventDefault();$('#pick')?.click()}
 };
 addEventListener('keydown',keyHandler);
}
function cutting(){const veg=['ZANAHORIA','CEBOLLA','PIMIENTO','TOMATE','CHAMPIÑÓN'];let t=8;$('#game-help').textContent='Completa cinco cortes. Pulsa el botón antes de que llegue a cero.';$('#game-area').innerHTML=`<div class="task"><div class="task-icon">🔪🥕</div><p>CORTE ${cut+1} / 5</p><h3 id="veg">${veg[0]}</h3><div class="timer" id="timer">08</div><p class="feedback" id="cut-status">¡Concentración, chef!</p></div>`;$('#game-controls').innerHTML='<button id="chop">¡CORTAR!</button>';function tick(){t--;$('#timer').textContent=String(t).padStart(2,'0');if(t<=0){clearInterval(clock);$('#cut-status').textContent='¡Se acabó el tiempo!';$('#game-controls').innerHTML='<button id="retry">REINTENTAR</button>';$('#retry').onclick=()=>start('cut')}}clock=setInterval(tick,1000);$('#chop').onclick=()=>{clearInterval(clock);points(score+20);sayLine();reactComment();cut++;if(cut===5){$('#cut-status').textContent='¡Cortes impecables! ¡Desafío superado!';finish('cut')}else{t=8;$('#veg').textContent=veg[cut];$('#cut-status').textContent='¡Bien hecho! Sigue con el próximo.';$('#timer').textContent='08';clock=setInterval(tick,1000)}};}
function versus(){$('#game-help').textContent='Pulsa ATACAR para lanzar cucharones. Consigue cinco impactos.';$('#game-area').innerHTML='<div class="versus"><div>🧑‍🍳<small>TÚ</small></div><strong>VS</strong><div>👨‍🍳<small>RIVAL</small></div></div><div class="task"><h3 id="versus-status">¡Que comience el duelo!</h3></div>';$('#game-controls').innerHTML='<button id="attack">🥄 ATACAR</button>';$('#attack').onclick=()=>{hits++;points(score+10);sayLine();reactComment();$('#versus-status').textContent=hits>=5?'¡GANASTE EL DUELO!':`¡Impacto ${hits}/5! El rival prepara su contraataque…`;if(hits>=5)finish('versus')}}
function tower(){$('#game-help').textContent='Apila ocho capas para completar tu torre de torta.';$('#game-area').innerHTML='<div class="task"><div class="cake-stack" id="stack"></div><h3 id="cake-status">Tu obra maestra comienza aquí</h3></div>';$('#game-controls').innerHTML='<button id="add-layer">🎂 APILAR CAPA</button>';$('#add-layer').onclick=()=>{layers++;points(score+15);sayLine();reactComment();const el=document.createElement('div');el.className='cake-layer';el.style.width=Math.max(55,160-layers*12)+'px';$('#stack').append(el);$('#cake-status').textContent=layers>=8?'¡Una torre monumental! Desafío superado.':`¡${layers} capas! Sigue construyendo.`;if(layers>=8)finish('tower')}}
