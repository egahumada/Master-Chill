'use strict';

/* MASTER-CHILL VS V1 — Phaser 3
   Los retratos de la selección se recortan desde las ilustraciones originales.
   La arena usa personajes dibujados por código hasta disponer de spritesheets de animación individuales.
*/
const ROOT = 'assets/characters/';
const SHEET = ROOT + 'Gemini_Generated_Image_h1t0coh1t0coh1t0.jfif';
const JUDGES_SHEET = ROOT + 'Gemini_Generated_Image_62z0t462z0t462z0.jfif';

const fighters = [
  {id:'kenny',name:'SEBASTIÁN “KENNY”',style:'Velocidad',sheet:'main',x:0,y:0,w:340,h:350,tint:0xffd66b},
  {id:'cynthia',name:'CYNTHIA',style:'Técnica',sheet:'main',x:340,y:0,w:340,h:350,tint:0x8fd8ff},
  {id:'regina',name:'REGINA',style:'Equilibrio',sheet:'main',x:680,y:0,w:340,h:350,tint:0xffa6b7},
  {id:'hugo',name:'DON HUGO',style:'Potencia',sheet:'hugo',x:0,y:0,w:0,h:0,tint:0x8ab7ff},
  {id:'rosita',name:'ROSITA',style:'Técnica',sheet:'main',x:0,y:370,w:272,h:350,tint:0xffbb70},
  {id:'valentina',name:'VALENTINA',style:'Velocidad',sheet:'main',x:272,y:370,w:272,h:350,tint:0x91d9ff},
  {id:'nattida',name:'NATTIDA',style:'Equilibrio',sheet:'main',x:544,y:370,w:272,h:350,tint:0xffa6bd},
  {id:'nicolas',name:'NICOLÁS',style:'Potencia',sheet:'main',x:816,y:370,w:272,h:350,tint:0x8ed9c5},
  {id:'stana',name:'STANA',style:'Velocidad',sheet:'main',x:1088,y:370,w:272,h:350,tint:0xe9b0ff}
];
const screens = [...document.querySelectorAll('.screen')];
const $ = s => document.querySelector(s);
let mode='cpu', selected1=0, selected2=1, choosingPlayer=1, game=null, lastSetup=null, resultShown=false;
const judges = [
  {name:'YANN',lines:['¡La técnica, chef! ¡No estamos jugando a la pinta!','¡Eso estuvo crudo! ¡Necesito carácter!','¡Bien ejecutado! Ahora repítelo bajo presión.']},
  {name:'FERNANDA',lines:['Buena energía, pero cuida la precisión.','Ese movimiento necesitaba un poquito más de equilibrio.','Me gustó esa combinación. ¡Muy limpia!']},
  {name:'JUANMA',lines:['¡Esto está más caliente que una cocina en servicio!','¡Ojo con ese cucharón, que va con todo!','¡Señoras y señores, tenemos combate!']}
];
function showScreen(id){screens.forEach(s=>s.classList.toggle('active',s.id===id+'-screen'));if(id==='fight')$('#result-overlay').classList.remove('visible');}
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.screen)));
$('#start-button').addEventListener('click',()=>showScreen('mode'));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{
  mode=b.dataset.mode;selected1=0;selected2=1;choosingPlayer=1;
  $('#select-mode-label').textContent=mode==='cpu'?'PLAYER VS CPU':'PLAYER 1 VS PLAYER 2';
  $('#difficulty-row').style.display=mode==='cpu'?'flex':'none';
  $('#p2-choice-name').textContent=mode==='cpu'?'CPU · '+fighters[selected2].name:'ELIGE JUGADOR 2';
  $('#p1-choice-name').textContent='ELIGE JUGADOR 1';
  $('#select-instruction').textContent='Selecciona un personaje para el Jugador 1.';
  $('#fight-button').disabled=true;renderRoster();showScreen('select');
}));
function renderRoster(){
  const root=$('#roster');
  root.innerHTML=fighters.map((f,i)=>{
    const p1=i===selected1?'selected-p1':'',p2=mode==='local'&&i===selected2?'selected-p2':'';
    return '<button class="fighter-card '+p1+' '+p2+'" data-fighter="'+i+'" aria-label="Elegir '+f.name+'"><div class="portrait" data-portrait="'+i+'"></div><strong>'+f.name+'</strong><small>'+f.style+'</small></button>';
  }).join('');
  root.querySelectorAll('[data-portrait]').forEach(el=>{
    const f=fighters[Number(el.dataset.portrait)];
    if(f.sheet==='hugo'){
      el.style.backgroundImage='url("'+ROOT+'Don%20Hugo.png")';
      el.style.backgroundSize='contain';el.style.backgroundPosition='center bottom';el.style.backgroundRepeat='no-repeat';
    }else{
      el.style.backgroundImage='url("'+SHEET+'")';
      el.style.backgroundSize='400% 200%';
      const col=f.y===0?f.x/340:(f.x/272);
      const row=f.y===0?0:1;
      const cols=row===0?4:5;
      el.style.backgroundSize=(cols*100)+'% 200%';
      el.style.backgroundPosition=(cols===1?0:(col/(cols-1)*100))+'% '+(row*100)+'%';
    }
  });
  root.querySelectorAll('[data-fighter]').forEach(btn=>btn.addEventListener('click',()=>{
    const i=Number(btn.dataset.fighter);
    if(mode==='cpu'){selected1=i;if(selected2===i)selected2=(i+1)%fighters.length;$('#p1-choice-name').textContent=fighters[selected1].name;$('#p2-choice-name').textContent='CPU · '+fighters[selected2].name;$('#select-instruction').textContent='Rival de CPU seleccionado automáticamente. ¡A pelear!';}
    else if(choosingPlayer===1){selected1=i;choosingPlayer=2;$('#p1-choice-name').textContent=fighters[i].name;$('#select-instruction').textContent='Ahora selecciona el personaje del Jugador 2.';}
    else{selected2=i;$('#p2-choice-name').textContent=fighters[i].name;$('#select-instruction').textContent='¡Combate listo! Pulsa A PELEAR.';}
    renderRoster();$('#fight-button').disabled=mode==='local'&&choosingPlayer===2;
    if(mode==='local'&&choosingPlayer===1)$('#fight-button').disabled=true;
    if(mode==='local'&&choosingPlayer===2)$('#fight-button').disabled=true;
    if(mode==='local'&&$('#p2-choice-name').textContent!=='ELIGE JUGADOR 2')$('#fight-button').disabled=false;
    if(mode==='cpu')$('#fight-button').disabled=false;
  }));
}
$('#fight-button').addEventListener('click',()=>startFight());
$('#quit-fight').addEventListener('click',()=>{if(game){game.destroy(true);game=null;}showScreen('select');});
$('#rematch-button').addEventListener('click',()=>startFight());
$('#menu-button').addEventListener('click',()=>{if(game){game.destroy(true);game=null;}$('#result-overlay').classList.remove('visible');showScreen('home');});

function startFight(){
  if(game){game.destroy(true);game=null;}
  resultShown=false;$('#result-overlay').classList.remove('visible');showScreen('fight');
  const setup={mode,p1:fighters[selected1],p2:fighters[selected2],difficulty:$('#difficulty').value};
  lastSetup=setup;
  $('#hud-p1-name').textContent=setup.p1.name;
  $('#hud-p2-name').textContent=(mode==='cpu'?'CPU · ':'2P · ')+setup.p2.name;
  $('#health-p1').style.width='100%';$('#health-p2').style.width='100%';$('#round-timer').textContent='90';
  $('#control-legend').innerHTML=mode==='cpu'
    ?'<span><b>A / D</b> MOVER</span><span><b>W</b> SALTAR</span><span><b>F</b> GOLPE</span><span><b>G</b> PATADA</span><span><b>H</b> ESPECIAL</span><span><b>S</b> BLOQUEAR</span>'
    :'<span><b>A / D</b> 1P MOVER</span><span><b>W</b> SALTAR</span><span><b>F / G / H</b> ATACAR</span><span><b>← / →</b> 2P MOVER</span><span><b>↑</b> SALTAR</span><span><b>J / K / L</b> ATACAR</span>';
  const config={type:Phaser.AUTO,parent:'game-container',width:960,height:420,backgroundColor:'#392343',physics:{default:'arcade',arcade:{gravity:{y:900},debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:{preload,create,update}};
  game=new Phaser.Game(config);
}
function preload(){
  this.load.image('roster-sheet',SHEET);
  this.load.image('don-hugo',ROOT+'Don%20Hugo.png');
  this.load.image('judges-sheet',JUDGES_SHEET);
  this.load.on('loaderror',file=>console.warn('No se pudo cargar recurso:',file.key,file.src));
}
function create(){
  const scene=this;scene.roundTime=90;scene.finished=false;scene.lastJudge=0;scene.cpuThink=0;scene.keys=scene.input.keyboard.addKeys('A,D,W,S,F,G,H,LEFT,RIGHT,UP,DOWN,J,K,L');
  // Cocina lateral: azulejos, campana, repisas, hornos y mesón.
  const g=scene.add.graphics();
  g.fillGradientStyle(0x482b54,0x482b54,0x2c1b35,0x2c1b35,1);g.fillRect(0,0,960,310);
  for(let x=0;x<960;x+=80){g.lineStyle(2,0x21162a,.45);g.lineBetween(x,0,x,300;}
  for(let y=45;y<300;y+=55){g.lineStyle(2,0x21162a,.45);g.lineBetween(0,y,960,y);}
  g.fillStyle(0x5a3a42,1);g.fillRect(0,302,960,118);
  g.fillStyle(0xb8794c,1);g.fillRect(0,320,960,20);g.fillStyle(0x392638,1);g.fillRect(0,340,960,80);
  for(let x=0;x<960;x+=64){g.lineStyle(2,0x1b1422,.5);g.lineBetween(x,340,x,420);}
  // Campanas y estantes
  [110,735].forEach(x=>{g.fillStyle(0x9ba1a8,1);g.fillRoundedRect(x,95,115,18,5);g.fillStyle(0x646b76,1);g.fillRect(x+17,112,81,58);g.fillStyle(0x28202c,1);g.fillRect(x+25,162,65,9);});
  g.fillStyle(0x75443b,1);g.fillRect(40,205,880,12);g.fillStyle(0xe3b66e,1);g.fillRect(40,217,880,5);
  // Ollas y sartenes en el fondo
  scene.add.text(100,228,'🍲',{fontSize:'42px'});scene.add.text(790,228,'🍳',{fontSize:'43px'});scene.add.text(475,232,'🥕  🧂  🍅',{fontSize:'24px'});
  // Cartel
  scene.add.rectangle(480,48,250,62,0x21152a).setStrokeStyle(3,0xffdf4a);
  scene.add.text(480,37,'COCINA MASTER-CHILL',{fontFamily:'monospace',fontSize:'16px',fontStyle:'bold',color:'#ffe04b'}).setOrigin(.5);
  scene.add.text(480,62,'¡EL CAOS ESTÁ SERVIDO!',{fontFamily:'monospace',fontSize:'9px',color:'#35dfcc'}).setOrigin(.5);
  // Plataformas invisibles y suelo
  scene.physics.world.setBounds(20,0,920,420);
  const floor=scene.physics.add.staticImage(480,395,undefined).setVisible(false);floor.body.setSize(920,30).updateFromGameObject();
  const p1=createFighter(scene,setupFighter(lastSetup.p1),230,350,0x24d6c2,true);
  const p2=createFighter(scene,setupFighter(lastSetup.p2),730,350,0xff6a55,false);
  scene.p1=p1;scene.p2=p2;scene.physics.add.collider(p1.sprite,floor);scene.physics.add.collider(p2.sprite,floor);
  scene.physics.add.overlap(p1.hitbox,p2.sprite,()=>{},null,scene);
  p1.sprite.setCollideWorldBounds(true);p2.sprite.setCollideWorldBounds(true);
  scene.cameras.main.setBounds(0,0,960,420);
  scene.time.addEvent({delay:1000,loop:true,callback:()=>{if(scene.finished)return;scene.roundTime--;$('#round-timer').textContent=String(scene.roundTime).padStart(2,'0');if(scene.roundTime<=0)endFight(scene,p1.health>=p2.health?1:2,'TIME UP');}});
  scene.input.keyboard.on('keydown',ev=>{if(ev.repeat||scene.finished)return;const key=ev.key.toLowerCase();if(['f','g','h','j','k','l'].includes(key)){if(['f','g','h'].includes(key))attack(scene,p1,key);else if(mode==='local')attack(scene,p2,key);}});
  scene.judgeTimer=scene.time.addEvent({delay:6500,loop:true,callback:()=>commentJudge()});
  $('#game-loading').style.display='none';
  commentJudge('¡Bienvenidos! ¡Que empiece el combate!');
  scene.events.once('destroy',()=>{scene.input.keyboard.removeAllListeners();});
}
function setupFighter(f){return f;}
function createFighter(scene,data,x,y,tint,isPlayer){
  const container=scene.add.container(x,y);
  const shadow=scene.add.ellipse(0,36,78,15,0x100b13,.45);
  const art=scene.add.graphics();
  // Diseño temporal de luchador arcade: mandil, chaqueta, cabeza, guantes y utensilio.
  art.fillStyle(0x17101b,1);art.fillRoundedRect(-24,-91,48,88,10);
  art.fillStyle(tint,1);art.fillRoundedRect(-23,-87,46,47,8);
  art.fillStyle(0xfff1d7,1);art.fillRoundedRect(-17,-45,34,39,4);
  art.lineStyle(3,0x382238,1);art.strokeRoundedRect(-17,-45,34,39,4);
  art.fillStyle(0xf0bd91,1);art.fillCircle(0,-105,24);
  art.fillStyle(0x28202b,1);art.fillEllipse(0,-123,43,17);
  art.fillStyle(0x17101b,1);art.fillCircle(-8,-107,3);art.fillCircle(8,-107,3);
  art.lineStyle(2,0x7d342e,1);art.beginPath();art.arc(0,-98,8,.2,Math.PI-.2,false);art.strokePath();
  art.fillStyle(0x21152a,1);art.fillRoundedRect(-21,-8,17,34,5);art.fillRoundedRect(4,-8,17,34,5);
  art.fillStyle(0xf0bd91,1);art.fillCircle(-31,-61,10);art.fillCircle(31,-61,10);
  art.fillStyle(0xbfc5ce,1);art.fillRoundedRect(isPlayer?28:-42,-84,9,43,4);art.fillCircle(isPlayer?32:-38,-87,11);
  container.add([shadow,art]);container.setSize(60,120);
  const body=scene.physics.add.existing(container);body.body.setSize(42,90).setOffset(-21,-90);body.body.setCollideWorldBounds(true);body.body.setBounce(0);
  const hit=scene.add.rectangle(x,y-65,1,1,0xff0000,0);scene.physics.add.existing(hit);hit.body.setAllowGravity(false);hit.body.enable=false;
  return {sprite:container,body:container.body,art,hitbox:hit,health:100,stun:0,blocking:false,attackCooldown:0,specialCooldown:0,isPlayer,tint,data,face:isPlayer?1:-1,anim:0};
}
function attack(scene,attacker,key){
  if(scene.finished||attacker.stun>0)return;
  const special=key==='h'||key==='l',kick=key==='g'||key==='k';
  const cooldown=special?1000:kick?520:330;
  if(attacker.attackCooldown>0)return;
  attacker.attackCooldown=cooldown;
  const defender=attacker===scene.p1?scene.p2:scene.p1;
  const distance=Math.abs(attacker.sprite.x-defender.sprite.x);
  const reach=special?155:kick?112:88;
  attacker.sprite.setScale(attacker===scene.p1?1.08:1.08,1.04);
  scene.time.delayedCall(120,()=>{if(attacker.sprite&&attacker.sprite.active)attacker.sprite.setScale(1);});
  if(distance<=reach&&Math.abs(attacker.sprite.y-defender.sprite.y)<55){
    const blocked=defender.blocking;
    const damage=blocked?special?7:3:special?23:kick?13:9;
    defender.health=Math.max(0,defender.health-damage);
    defender.stun=blocked?90:180;
    defender.sprite.x=Phaser.Math.Clamp(defender.sprite.x+attacker.face*(blocked?9:22),50,910);
    defender.sprite.setTint(blocked?0x9ed9ff:0xffffff);
    scene.time.delayedCall(150,()=>{if(defender.sprite&&defender.sprite.active)defender.sprite.clearTint();});
    updateHealth(scene);
    const fx=scene.add.text(defender.sprite.x,defender.sprite.y-115,special?'¡PUM!':kick?'¡ZAS!':'¡PAF!',{fontFamily:'monospace',fontSize:special?'24px':'18px',fontStyle:'bold',color:special?'#ffe04b':'#ffffff',stroke:'#21152a',strokeThickness:5}).setOrigin(.5);
    scene.tweens.add({targets:fx,y:fx.y-35,alpha:0,duration:450,onComplete:()=>fx.destroy()});
    if(defender.health<=0)endFight(scene,attacker===scene.p1?1:2,'K.O.');
  }else{
    const puff=scene.add.text(attacker.sprite.x+attacker.face*48,attacker.sprite.y-100,'¡Fiu!',{fontSize:'15px',color:'#ffe04b',stroke:'#21152a',strokeThickness:4}).setOrigin(.5);
    scene.tweens.add({targets:puff,y:puff.y-22,alpha:0,duration:350,onComplete:()=>puff.destroy()});
  }
  if(special)commentJudge('¡Ataque especial! ¡Eso sí que tuvo sazón!');
}
function updateHealth(scene){$('#health-p1').style.width=scene.p1.health+'%';$('#health-p2').style.width=scene.p2.health+'%';}
function update(time,delta){
  if(this.finished)return;
  const s=this,dt=Math.min(delta,40);
  const p1=s.p1,p2=s.p2,k=s.keys;
  p1.attackCooldown=Math.max(0,p1.attackCooldown-dt);p2.attackCooldown=Math.max(0,p2.attackCooldown-dt);
  p1.stun=Math.max(0,p1.stun-dt);p2.stun=Math.max(0,p2.stun-dt);
  p1.blocking=k.S.isDown;p2.blocking=mode==='local'?k.DOWN.isDown:false;
  let v1=0;if(p1.stun<=0){if(k.A.isDown)v1=-1;if(k.D.isDown)v1=1;}
  p1.body.setVelocityX(v1*(p1.blocking?95:230));if(Phaser.Input.Keyboard.JustDown(k.W)&&p1.body.blocked.down)p1.body.setVelocityY(-440);
  if(mode==='local'){
    let v2=0;if(p2.stun<=0){if(k.LEFT.isDown)v2=-1;if(k.RIGHT.isDown)v2=1;}
    p2.body.setVelocityX(v2*(p2.blocking?95:230));if(Phaser.Input.Keyboard.JustDown(k.UP)&&p2.body.blocked.down)p2.body.setVelocityY(-440);
  }else{
    s.cpuThink-=dt;
    if(s.cpuThink<=0&&p2.stun<=0){
      s.cpuThink=160+Math.random()*160;
      const dist=p1.sprite.x-p2.sprite.x,abs=Math.abs(dist),difficulty=lastSetup.difficulty;
      const aggressiveness=difficulty==='hard'?.82:difficulty==='normal'?.62:.42;
      if(abs>120)p2.cpuMove=Math.sign(dist);else p2.cpuMove=Math.random()<.25?-Math.sign(dist):0;
      if(abs<150&&Math.random()<aggressiveness){attack(s,p2,Math.random()<(difficulty==='hard'?.32:.16)?'l':Math.random()<.5?'k':'j');}
      if(difficulty!=='easy'&&Math.random()<.08&&p2.body.blocked.down)p2.body.setVelocityY(-410);
      if(p1.sprite.x<p2.sprite.x)p2.face=-1;else p2.face=1;
    }
    const move=p2.cpuMove||0;p2.body.setVelocityX(p2.stun>0?0:move*(p2.blocking?75:190));
  }
  if(p1.sprite.x<p2.sprite.x){p1.face=1;p2.face=-1;}else{p1.face=-1;p2.face=1;}
  p1.sprite.setFlipX(p1.face<0);p2.sprite.setFlipX(p2.face<0);
  p1.anim+=dt;p2.anim+=dt;
  p1.sprite.y=Phaser.Math.Clamp(p1.sprite.y,80,350);p2.sprite.y=Phaser.Math.Clamp(p2.sprite.y,80,350);
  if(p1.blocking)p1.sprite.setAlpha(.82);else p1.sprite.setAlpha(1);
  if(p2.blocking)p2.sprite.setAlpha(.82);else p2.sprite.setAlpha(1);
}
function endFight(scene,winner,reason){
  if(scene.finished)return;scene.finished=true;scene.p1.body.setVelocity(0,0);scene.p2.body.setVelocity(0,0);
  const win=winner===1?lastSetup.p1.name:lastSetup.p2.name;
  $('#result-title').textContent=winner===1?'¡VICTORIA!':'¡DERROTA!';
  $('#result-copy').textContent=win+' gana el combate. '+(reason==='TIME UP'?'Se acabó el tiempo.':'¡La cocina tiene nuevo campeón!');
  $('#result-overlay').classList.add('visible');$('#result-overlay').setAttribute('aria-hidden','false');
  commentJudge(winner===1?'¡Excelente combate! ¡Hoy te llevas el cucharón!':'¡Tenemos ganador! ¡Que alguien apague esa cocina!');
}
function commentJudge(custom){
  const j=judges[Math.floor(Math.random()*judges.length)];
  $('#judge-name').textContent='JURADO · '+j.name;
  $('#judge-line').textContent=custom||j.lines[Math.floor(Math.random()*j.lines.length)];
}
