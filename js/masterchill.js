'use strict';

// ============================================================
//  MASTER-CHILL  —  Videojuego de Peleas 2D
//  Inspirado en el universo culinario de MasterChef Chile
//  Motor: Phaser 3  |  Versión 1.0
// ============================================================

(function () {

// ────────────────────────────────────────────
//  SECCIÓN 1 — CONFIGURACIÓN GLOBAL
// ────────────────────────────────────────────
const W = 1280, H = 720;
const GRAVITY = 1800;
const GROUND_Y = 635;
const STAGE_LEFT = 80, STAGE_RIGHT = W - 80;
const ROUND_TIME = 99;
const ROUNDS_TO_WIN = 2;
const FW = 100, FH = 132; // dimensiones de frame de luchador

// ────────────────────────────────────────────
//  SECCIÓN 2 — DATOS DE PERSONAJES
// ────────────────────────────────────────────
const CHARACTERS = [
  {
    id: 'don_hugo',
    name: 'Don Hugo',
    title: 'El Patriarca del Fuego',
    portrait: 'assets/portraits/don_hugo.png',
    weapon: 'blowtorch',
    weaponName: 'Soplete Gastronómico',
    colors: { skin: 0xD4A574, hair: 0x888888, shirt: 0x3366AA, pants: 0x2a2a3a, shoes: 0x553322 },
    hairStyle: 'short_gray',
    build: 'medium',
    hasApron: true,
    stats: { speed: 3, power: 5, defense: 4 },
    specialName: 'Llama Culinaria',
    quote: '¡En mi cocina mando yo!'
  },
  {
    id: 'kenny',
    name: 'Sebastián "Kenny"',
    title: 'El Rockero de la Cocina',
    portrait: 'assets/portraits/kenny.png',
    weapon: 'guitar',
    weaponName: 'Guitarra Eléctrica',
    colors: { skin: 0xC8956C, hair: 0x5C3317, shirt: 0xCC3333, pants: 0x334488, shoes: 0xAA2222 },
    hairStyle: 'long_brown',
    build: 'slim',
    hasApron: true,
    stats: { speed: 5, power: 3, defense: 3 },
    specialName: 'Riff Gourmet',
    quote: '¡Póngale rock and roll a esa cazuela!'
  },
  {
    id: 'cynthia',
    name: 'Cynthia',
    title: 'La Estratega del Sabor',
    portrait: 'assets/portraits/cynthia.png',
    weapon: 'rolling_pin',
    weaponName: 'Uslero Pesado',
    colors: { skin: 0xBB8855, hair: 0x1a1a1a, shirt: 0x333333, pants: 0x222222, shoes: 0x444444 },
    hairStyle: 'bun_glasses',
    build: 'heavy',
    hasApron: true,
    stats: { speed: 2, power: 5, defense: 5 },
    specialName: 'Amasado Implacable',
    quote: '¡Aquí no se improvisa, se ejecuta!'
  },
  {
    id: 'stana',
    name: 'Stana',
    title: 'La Ninja de los Cortes',
    portrait: 'assets/portraits/stana.png',
    weapon: 'knife',
    weaponName: 'Cuchillo Santoku',
    colors: { skin: 0xC8A882, hair: 0x0a0a0a, shirt: 0x991122, pants: 0x1a1a1a, shoes: 0x333333 },
    hairStyle: 'long_black',
    build: 'slim',
    hasApron: true,
    stats: { speed: 5, power: 4, defense: 2 },
    specialName: 'Juliana Relámpago',
    quote: '¡Corte preciso, sabor letal!'
  },
  {
    id: 'nattida',
    name: 'Nattida',
    title: 'El Volcán de Especias',
    portrait: 'assets/portraits/nattida.png',
    weapon: 'frying_pan',
    weaponName: 'Wok en Llamas',
    colors: { skin: 0xBB8855, hair: 0x1a1a1a, shirt: 0x224488, pants: 0x2a2a3a, shoes: 0x444444 },
    hairStyle: 'short_glasses',
    build: 'heavy',
    hasApron: true,
    stats: { speed: 3, power: 5, defense: 4 },
    specialName: 'Flambeado Extremo',
    quote: '¡Que arda la pasión por el sabor!'
  },
  {
    id: 'nicolas',
    name: 'Nicolás',
    title: 'El Asador Sonriente',
    portrait: 'assets/portraits/nicolas.png',
    weapon: 'spatula',
    weaponName: 'Espátula Parrillera',
    colors: { skin: 0xC8956C, hair: 0x2a1a0a, shirt: 0x223366, pants: 0x333344, shoes: 0x443322 },
    hairStyle: 'short_dark',
    build: 'heavy',
    hasApron: true,
    stats: { speed: 3, power: 4, defense: 5 },
    specialName: 'Vuelta y Vuelta',
    quote: '¡A punto y con mucho cariño!'
  },
  {
    id: 'fran',
    name: 'Fran',
    title: 'La Voz Crítica',
    portrait: 'assets/portraits/fran.png',
    weapon: 'microphone',
    weaponName: 'Micrófono React',
    colors: { skin: 0xC8A882, hair: 0x0a0a0a, shirt: 0xEEEEEE, pants: 0x556688, shoes: 0x222222 },
    hairStyle: 'long_glasses',
    build: 'slim',
    hasApron: false,
    stats: { speed: 4, power: 3, defense: 3 },
    specialName: 'Crítica Feroz',
    quote: '¡Esto no se lo come ni el jurado!'
  },
  {
    id: 'yuhui',
    name: 'Yuhui',
    title: 'El Cucharón Feliz',
    portrait: 'assets/portraits/yuhui.png',
    weapon: 'ladle',
    weaponName: 'Cucharón de Acero',
    colors: { skin: 0xE8C8A0, hair: 0x0a0a0a, shirt: 0x222222, pants: 0x1a1a2a, shoes: 0x333333 },
    hairStyle: 'short_black',
    build: 'slim',
    hasApron: false,
    stats: { speed: 5, power: 3, defense: 4 },
    specialName: 'Torbellino Dulce',
    quote: '¡Cocinar con corazón siempre gana!'
  }
];

// ────────────────────────────────────────────
//  SECCIÓN 3 — ESCENARIOS DISPONIBLES
// ────────────────────────────────────────────
const STAGES = [
  {
    id: 'stage_kitchen',
    name: 'Cocina Master-Chill',
    desc: 'Set televisivo con mesones, ollas, fogones y utensilios',
    file: 'assets/stages/stage_kitchen.png'
  },
  {
    id: 'stage_fire',
    name: 'Cocina en Llamas',
    desc: 'Combate extremo bajo el calor ardiente y la presión del servicio',
    file: 'assets/stages/stage_kitchen_fire.png'
  }
];

// ────────────────────────────────────────────
//  SECCIÓN 4 — JUECES Y COMENTARIOS
// ────────────────────────────────────────────
const JUDGES = {
  yann: { name: 'Yann Yvin', portrait: 'assets/portraits/judge_yann.png' },
  fernanda: { name: 'Fernanda Fuentes', portrait: 'assets/portraits/judge_fernanda.png' },
  juanma: { name: 'Juanma', portrait: 'assets/portraits/judge_juanma.png' }
};

const JUDGE_LINES = {
  start: [
    { judge: 'yann', text: '¡Que empiece el duelo! Quiero ver carácter en esa plancha.' },
    { judge: 'fernanda', text: '¡Hoy se cocina con garra! Demuestren de qué están hechos.' },
    { judge: 'juanma', text: '¡Señores, esto es Master-Chill, aquí no hay perdón para el mal sazón!' },
    { judge: 'yann', text: '¡Vamos, chefs! ¡La cocina de competencia no tiene piedad!' },
    { judge: 'fernanda', text: '¡Que fluya el adrenalín culinario! ¡Esta pelea es épica!' },
    { judge: 'juanma', text: '¡Tres... dos... uno... ¡A COCINAR SIN CUARTEL!' },
    { judge: 'yann', text: '¡El honor del delantal blanco está en juego, señores!' },
    { judge: 'fernanda', text: '¡Que el mejor chef gane esta batalla de sabores!' }
  ],
  hit: [
    { judge: 'yann', text: '¡Mon dieu! ¡Ese golpe fue más duro que un pan duro de tres semanas!' },
    { judge: 'fernanda', text: '¡Eso sí que tuvo picardía! ¡Golpe bien sazonado!' },
    { judge: 'juanma', text: '¡Le dio vuelta la tortilla por completo!' },
    { judge: 'yann', text: '¡Ojo con la defensa, chef! ¡La cocina no espera a nadie!' },
    { judge: 'fernanda', text: '¡Qué combinación! ¡Eso estuvo impecable!' },
    { judge: 'juanma', text: '¡Se le quemó el plato al rival con ese combo!' },
    { judge: 'yann', text: '¡Sacré bleu! ¡Eso duele más que el picante de la abuela!' },
    { judge: 'fernanda', text: '¡Puro sabor y potencia en ese golpe, chef!' },
    { judge: 'juanma', text: '¡Ja! ¡Le faltó condimento a esa defensa!' },
    { judge: 'yann', text: '¡Excelente técnica! ¡Golpe con cuerpo y alma culinaria!' },
    { judge: 'fernanda', text: '¡Eso fue más rápido que cortar cebolla juliana!' },
    { judge: 'juanma', text: '¡El pobre se pegó un porrazo gourmet de los buenos!' }
  ],
  special: [
    { judge: 'yann', text: '¡ATAQUE ESPECIAL! ¡Voilà, eso es cocina de alta técnica!' },
    { judge: 'fernanda', text: '¡Espectacular! ¡Sacó la receta secreta de la abuela!' },
    { judge: 'juanma', text: '¡Qué emplatado de combo más explosivo!' },
    { judge: 'yann', text: '¡Incroyable! ¡Eso fue un Michelin de golpes de alto vuelo!' },
    { judge: 'fernanda', text: '¡EL ESPECIAL! ¡Eso requirió paciencia y dedicación total!' },
    { judge: 'juanma', text: '¡LA TÉCNICA SUPREMA! ¡Este chef no se rinde jamás!' },
    { judge: 'yann', text: '¡Tres estrellas para ese movimiento culinario maestro!' }
  ],
  block: [
    { judge: 'yann', text: '¡Buena tapa de olla! ¡Pero bloquear no sirve para ganar!' },
    { judge: 'fernanda', text: '¡Se protegió justo a tiempo, qué reflejos!' },
    { judge: 'juanma', text: '¡Escudo de acero inoxidable, nada pasa!' },
    { judge: 'yann', text: '¡Eso sí que fue una guardia de hierro fundido profesional!' },
    { judge: 'fernanda', text: '¡Bloqueo perfecto! ¡Como la costra dorada de un croissant!' },
    { judge: 'juanma', text: '¡Ni el hacha de un vikingo rompería esa defensa!' }
  ],
  ko: [
    { judge: 'yann', text: '¡C’est fini! ¡Plato terminado y rival servido en bandeja!' },
    { judge: 'fernanda', text: '¡K.O.! ¡Una victoria contundente con estrella culinaria!' },
    { judge: 'juanma', text: '¡A lavar los platos! ¡Tenemos un ganador indiscutido!' },
    { judge: 'yann', text: '¡Noqueado con elegancia francesa! ¡Qué exquisito final!' },
    { judge: 'fernanda', text: '¡Ha caído como un soufflé mal preparado! ¡K.O. definitivo!' },
    { judge: 'juanma', text: '¡Paf! ¡Al suelo como un pastel de cumpleaños sin harina!' },
    { judge: 'yann', text: '¡El perdedor ha sido eliminado de la cocina de competencia!' }
  ],
  timeout: [
    { judge: 'yann', text: '¡Tiempo cumplido! ¡Manos arriba, el jurado deliberará!' },
    { judge: 'fernanda', text: '¡Se acabó el tiempo en la cocina! Veamos quién resistió mejor.' },
    { judge: 'juanma', text: '¡Sonó la campana! ¡La decisión está tomada!' },
    { judge: 'yann', text: '¡Fin del tiempo! Le plus résistant aura gagné.' },
    { judge: 'fernanda', text: '¡Se terminó la ronda! ¡Los puntos dictarán el veredicto!' }
  ],
  combo: [
    { judge: 'juanma', text: '¡COMBO! ¡Eso es cocina en cadena, sin parar ni respirar!' },
    { judge: 'fernanda', text: '¡Encadenado brutal! ¡Como una receta de varios tiempos!' },
    { judge: 'yann', text: '¡Un combo digno de los mejores restaurantes del mundo!' },
    { judge: 'juanma', text: '¡No para! ¡Es una metralleta culinaria imparable!' },
    { judge: 'fernanda', text: '¡Golpe tras golpe! ¡Este chef es un demoledor con mandil!' }
  ]
};

function getRandomJudgeLine(category) {
  const pool = JUDGE_LINES[category];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ────────────────────────────────────────────
//  SECCIÓN 5 — PARÁMETROS DE COMBATE
// ────────────────────────────────────────────
const ATTACK_DATA = {
  punch:   { damage: 9,  startup: 4, active: 4, recovery: 6, knockback: 180, hitstun: 14, range: 62 },
  kick:    { damage: 14, startup: 6, active: 4, recovery: 8, knockback: 260, hitstun: 18, range: 74 },
  special: { damage: 25, startup: 10, active: 6, recovery: 15, knockback: 420, hitstun: 25, range: 95, cooldown: 180 }
};

// ────────────────────────────────────────────
//  SECCIÓN 6 — GENERADOR DINÁMICO DE SPRITES
// ────────────────────────────────────────────
function hexToRGB(hex) {
  return { r: (hex >> 16) & 0xff, g: (hex >> 8) & 0xff, b: hex & 0xff };
}
function rgbStr(hex) {
  const c = hexToRGB(hex);
  return `rgb(${c.r},${c.g},${c.b})`;
}
function darken(hex, amt) {
  const c = hexToRGB(hex);
  return `rgb(${Math.max(0, c.r - amt)},${Math.max(0, c.g - amt)},${Math.max(0, c.b - amt)})`;
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function drawFighterHair(ctx, cx, cy, style, color) {
  ctx.fillStyle = rgbStr(color);
  switch (style) {
    case 'short_gray':
    case 'short_dark':
    case 'short_black':
      ctx.beginPath();
      ctx.arc(cx, cy - 2, 19, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 19, cy - 6, 38, 11);
      break;
    case 'long_brown':
      // Rocker con gorro beanie rojo y pelo largo
      ctx.fillStyle = '#BB2222';
      ctx.beginPath();
      ctx.arc(cx, cy - 6, 20, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 20, cy - 8, 40, 10);
      ctx.fillStyle = rgbStr(color);
      ctx.fillRect(cx - 22, cy - 2, 8, 34);
      ctx.fillRect(cx + 14, cy - 2, 8, 34);
      break;
    case 'bun_glasses':
      ctx.beginPath();
      ctx.arc(cx, cy - 2, 19, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 19, cy - 6, 38, 9);
      ctx.beginPath();
      ctx.arc(cx, cy - 23, 9, 0, Math.PI * 2);
      ctx.fill();
      // Lentes
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - 11, cy - 4, 9, 8);
      ctx.strokeRect(cx + 2, cy - 4, 9, 8);
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy);
      ctx.lineTo(cx + 2, cy);
      ctx.stroke();
      break;
    case 'long_black':
      ctx.beginPath();
      ctx.arc(cx, cy - 2, 20, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 20, cy - 6, 40, 9);
      ctx.fillRect(cx - 21, cy - 2, 8, 38);
      ctx.fillRect(cx + 13, cy - 2, 8, 38);
      break;
    case 'short_glasses':
      ctx.beginPath();
      ctx.arc(cx, cy - 2, 19, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 19, cy - 6, 38, 9);
      // Lentes
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - 11, cy - 4, 9, 8);
      ctx.strokeRect(cx + 2, cy - 4, 9, 8);
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy);
      ctx.lineTo(cx + 2, cy);
      ctx.stroke();
      break;
    case 'long_glasses':
      ctx.beginPath();
      ctx.arc(cx, cy - 2, 20, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(cx - 20, cy - 6, 40, 9);
      ctx.fillRect(cx - 21, cy - 2, 8, 40);
      ctx.fillRect(cx + 13, cy - 2, 8, 40);
      // Lentes grandes
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - 12, cy - 5, 10, 9);
      ctx.strokeRect(cx + 2, cy - 5, 10, 9);
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy - 1);
      ctx.lineTo(cx + 2, cy - 1);
      ctx.stroke();
      break;
  }
}

function drawFighterWeapon(ctx, x, y, type) {
  ctx.save();
  switch (type) {
    case 'blowtorch':
      ctx.fillStyle = '#555';
      ctx.fillRect(x - 4, y - 5, 18, 9);
      ctx.fillStyle = '#AAA';
      ctx.fillRect(x + 14, y - 4, 9, 7);
      // Llamas
      ctx.fillStyle = '#FF5500';
      ctx.beginPath();
      ctx.moveTo(x + 23, y);
      ctx.lineTo(x + 36, y - 6);
      ctx.lineTo(x + 36, y + 6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFCC00';
      ctx.beginPath();
      ctx.moveTo(x + 23, y);
      ctx.lineTo(x + 30, y - 3);
      ctx.lineTo(x + 30, y + 3);
      ctx.closePath();
      ctx.fill();
      break;
    case 'guitar':
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x - 2, y - 3, 26, 5);
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.ellipse(x + 28, y, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(x + 28, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'rolling_pin':
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(x - 4, y - 4, 32, 8);
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(x - 7, y - 5, 5, 10);
      ctx.fillRect(x + 28, y - 5, 5, 10);
      break;
    case 'knife':
      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.moveTo(x, y - 2);
      ctx.lineTo(x + 28, y - 4);
      ctx.lineTo(x + 28, y + 4);
      ctx.lineTo(x, y + 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#4a3520';
      ctx.fillRect(x - 9, y - 3, 10, 6);
      break;
    case 'frying_pan':
      ctx.fillStyle = '#555';
      ctx.fillRect(x - 3, y - 3, 20, 5);
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.ellipse(x + 24, y, 14, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      // Fuego en el wok
      ctx.fillStyle = '#FF6600';
      ctx.beginPath();
      ctx.arc(x + 24, y - 2, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'spatula':
      ctx.fillStyle = '#666';
      ctx.fillRect(x - 3, y - 2, 22, 5);
      ctx.fillStyle = '#BBB';
      ctx.fillRect(x + 19, y - 6, 14, 12);
      break;
    case 'microphone':
      ctx.fillStyle = '#444';
      ctx.fillRect(x - 2, y - 2, 18, 5);
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.arc(x + 20, y, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'ladle':
      ctx.fillStyle = '#888';
      ctx.fillRect(x - 3, y - 2, 24, 5);
      ctx.fillStyle = '#BBB';
      ctx.beginPath();
      ctx.arc(x + 26, y + 3, 8, 0, Math.PI);
      ctx.fill();
      break;
  }
  ctx.restore();
}

// Poses de animación para frames
const POSES = {
  idle1:    { hY:0,   bY:0,  faX:18,  faY:0,  baX:-18, baY:0,  flX:9,  flY:0,  blX:-9,  blY:0,  wpn:0, mouth:0 },
  idle2:    { hY:-2,  bY:-1, faX:16,  faY:-2, baX:-16, baY:-2, flX:9,  flY:0,  blX:-9,  blY:0,  wpn:0, mouth:0 },
  walk1:    { hY:0,   bY:-1, faX:22,  faY:-5, baX:-14, baY:5,  flX:15, flY:-2, blX:-5,  blY:2,  wpn:0, mouth:0 },
  walk2:    { hY:0,   bY:0,  faX:18,  faY:0,  baX:-18, baY:0,  flX:9,  flY:0,  blX:-9,  blY:0,  wpn:0, mouth:0 },
  walk3:    { hY:0,   bY:-1, faX:14,  faY:5,  baX:-22, baY:-5, flX:-5, flY:2,  blX:15,  blY:-2, wpn:0, mouth:0 },
  walk4:    { hY:0,   bY:0,  faX:18,  faY:0,  baX:-18, baY:0,  flX:9,  flY:0,  blX:-9,  blY:0,  wpn:0, mouth:0 },
  jump:     { hY:-6,  bY:-3, faX:14,  faY:-14,baX:-14, baY:-14,flX:6,  flY:8,  blX:-6,  blY:8,  wpn:0, mouth:0 },
  fall:     { hY:-2,  bY:-1, faX:20,  faY:-6, baX:-20, baY:-6, flX:7,  flY:4,  blX:-7,  blY:4,  wpn:0, mouth:0 },
  crouch:   { hY:14,  bY:16, faX:14,  faY:12, baX:-14, baY:12, flX:12, flY:12, blX:-4,  blY:12, wpn:0, mouth:0 },
  punch1:   { hY:0,   bY:1,  faX:14,  faY:-2, baX:-16, baY:0,  flX:9,  flY:0,  blX:-9,  blY:0,  wpn:0, mouth:0 },
  punch2:   { hY:2,   bY:3,  faX:42,  faY:-9, baX:-14, baY:3,  flX:13, flY:0,  blX:-11, blY:0,  wpn:0, mouth:1 },
  punch3:   { hY:0,   bY:1,  faX:30,  faY:-4, baX:-15, baY:1,  flX:11, flY:0,  blX:-10, blY:0,  wpn:0, mouth:0 },
  kick1:    { hY:0,   bY:1,  faX:16,  faY:0,  baX:-18, baY:0,  flX:11, flY:-2, blX:-11, blY:0,  wpn:0, mouth:0 },
  kick2:    { hY:-2,  bY:3,  faX:14,  faY:3,  baX:-20, baY:-2, flX:40, flY:-18,blX:-13, blY:2,  wpn:0, mouth:1 },
  kick3:    { hY:0,   bY:2,  faX:16,  faY:1,  baX:-18, baY:0,  flX:24, flY:-6, blX:-11, blY:0,  wpn:0, mouth:0 },
  special1: { hY:-2,  bY:0,  faX:8,   faY:3,  baX:-14, baY:0,  flX:9,  flY:0,  blX:-9,  blY:0,  wpn:1, mouth:0 },
  special2: { hY:0,   bY:5,  faX:48,  faY:-13,baX:-12, baY:5,  flX:15, flY:0,  blX:-15, blY:0,  wpn:1, mouth:1 },
  special3: { hY:4,   bY:3,  faX:36,  faY:-7, baX:-14, baY:2,  flX:13, flY:0,  blX:-11, blY:0,  wpn:1, mouth:0 },
  block:    { hY:2,   bY:2,  faX:4,   faY:-8, baX:-4,  baY:-8, flX:7,  flY:0,  blX:-7,  blY:0,  wpn:0, mouth:0 },
  hurt1:    { hY:-4,  bY:3,  faX:-16, faY:-6, baX:16,  baY:-6, flX:-7, flY:3,  blX:11,  blY:3,  wpn:0, mouth:1 },
  hurt2:    { hY:-6,  bY:5,  faX:-20, faY:-3, baX:20,  baY:-3, flX:-9, flY:5,  blX:15,  blY:5,  wpn:0, mouth:1 },
  ko:       { hY:32,  bY:32, faX:-8,  faY:26, baX:8,   baY:26, flX:-4, flY:26, blX:4,   blY:26, wpn:0, mouth:1 },
  victory1: { hY:-6,  bY:-2, faX:24,  faY:-24,baX:-24, baY:-24,flX:11, flY:0,  blX:-11, blY:0,  wpn:0, mouth:2 },
  victory2: { hY:-8,  bY:-4, faX:26,  faY:-28,baX:-26, baY:-28,flX:11, flY:0,  blX:-11, blY:0,  wpn:1, mouth:2 }
};

const FRAME_ORDER = [
  POSES.idle1, POSES.idle2,
  POSES.walk1, POSES.walk2, POSES.walk3, POSES.walk4,
  POSES.jump, POSES.fall,
  POSES.crouch,
  POSES.punch1, POSES.punch2, POSES.punch3,
  POSES.kick1, POSES.kick2, POSES.kick3,
  POSES.special1, POSES.special2, POSES.special3,
  POSES.block,
  POSES.hurt1, POSES.hurt2,
  POSES.ko,
  POSES.victory1, POSES.victory2
];

function drawFighterFrame(ctx, frameIdx, char, scene) {
  const pose = FRAME_ORDER[frameIdx];
  const cx = FW / 2;
  const groundY = FH - 16;

  const bodyTopY = groundY - 62 + pose.bY;
  const headCY = groundY - 78 + pose.hY;
  const isHeavy = char.build === 'heavy';
  const bodyW = isHeavy ? 38 : 32;
  const bodyH = isHeavy ? 30 : 26;

  // Sombra proyectada
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(cx, groundY + 4, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pierna trasera
  const blX = cx + pose.blX;
  const blY = bodyTopY + bodyH - 2 + pose.blY;
  ctx.fillStyle = darken(char.colors.pants, 30);
  drawRoundRect(ctx, blX - 5, blY, 11, 23, 3);
  ctx.fillStyle = darken(char.colors.shoes, 20);
  drawRoundRect(ctx, blX - 6, blY + 21, 13, 7, 2);

  // Brazo trasero
  const baX = cx + pose.baX;
  const baY = bodyTopY + 4 + pose.baY;
  ctx.fillStyle = darken(char.colors.shirt, 30);
  drawRoundRect(ctx, baX - 4, baY, 9, 19, 3);
  ctx.fillStyle = darken(char.colors.skin, 20);
  ctx.beginPath();
  ctx.arc(baX, baY + 21, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Torso / Polera
  ctx.fillStyle = rgbStr(char.colors.shirt);
  drawRoundRect(ctx, cx - bodyW / 2, bodyTopY, bodyW, bodyH, 5);

  // Delantal blanco de MasterChef
  if (char.hasApron) {
    ctx.fillStyle = '#FFFFFF';
    const aw = bodyW - 8;
    drawRoundRect(ctx, cx - aw / 2, bodyTopY + 4, aw, bodyH - 5, 3);
    // Logo "M" de parodia
    ctx.fillStyle = '#DD3322';
    ctx.beginPath();
    ctx.arc(cx, bodyTopY + bodyH / 2 + 1, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 7px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', cx, bodyTopY + bodyH / 2 + 1);
  }

  // Cinturón
  ctx.fillStyle = darken(char.colors.pants, 15);
  ctx.fillRect(cx - bodyW / 2 + 2, bodyTopY + bodyH - 3, bodyW - 4, 4);

  // Pierna delantera
  const flX = cx + pose.flX;
  const flY = bodyTopY + bodyH - 2 + pose.flY;
  ctx.fillStyle = rgbStr(char.colors.pants);
  drawRoundRect(ctx, flX - 6, flY, 13, 25, 3);
  ctx.fillStyle = rgbStr(char.colors.shoes);
  drawRoundRect(ctx, flX - 7, flY + 23, 15, 8, 2);

  // Brazo delantero
  const faX = cx + pose.faX;
  const faY = bodyTopY + 4 + pose.faY;
  ctx.fillStyle = rgbStr(char.colors.shirt);
  drawRoundRect(ctx, faX - 5, faY, 11, 21, 3);
  ctx.fillStyle = rgbStr(char.colors.skin);
  ctx.beginPath();
  ctx.arc(faX, faY + 23, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Arma de cocina en ataque / especial
  if (pose.wpn) {
    drawFighterWeapon(ctx, faX + 6, faY + 22, char.weapon);
  }

  // Cuello
  ctx.fillStyle = rgbStr(char.colors.skin);
  ctx.fillRect(cx - 5, headCY + 15, 10, 8);

  // Cabeza con el retrato auténtico pixel-art del personaje
  const headSize = 40;
  let drewPortrait = false;
  if (scene && scene.textures && scene.textures.exists('portrait_' + char.id)) {
    const portraitTex = scene.textures.get('portrait_' + char.id);
    if (portraitTex && portraitTex.key !== '__MISSING') {
      const portraitImg = portraitTex.getSourceImage();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, headCY, headSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(portraitImg, cx - headSize / 2, headCY - headSize / 2, headSize, headSize);
      ctx.restore();

      ctx.strokeStyle = darken(char.colors.skin, 65);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, headCY, headSize / 2, 0, Math.PI * 2);
      ctx.stroke();
      drewPortrait = true;
    }
  }

  if (!drewPortrait) {
    ctx.fillStyle = rgbStr(char.colors.skin);
    ctx.beginPath();
    ctx.arc(cx, headCY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = darken(char.colors.skin, 55);
    ctx.lineWidth = 2;
    ctx.stroke();
    drawFighterHair(ctx, cx, headCY, char.hairStyle, char.colors.hair);
  }

  // Efectos visuales de impacto en frames de ataque activo
  if (frameIdx === 10 || frameIdx === 13 || frameIdx === 16) {
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2.5;
    const ex = faX + 14;
    const ey = faY + (frameIdx === 13 ? 32 : 12);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI / 2) + Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(ex + Math.cos(angle) * 6, ey + Math.sin(angle) * 6);
      ctx.lineTo(ex + Math.cos(angle) * 15, ey + Math.sin(angle) * 15);
      ctx.stroke();
    }
  }
}

function buildCharacterSpriteSheet(scene, char) {
  const canvas = document.createElement('canvas');
  canvas.width = FW * FRAME_ORDER.length;
  canvas.height = FH;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < FRAME_ORDER.length; i++) {
    ctx.save();
    ctx.translate(i * FW, 0);
    drawFighterFrame(ctx, i, char, scene);
    ctx.restore();
  }

  const key = 'fighter_' + char.id;
  if (scene.textures.exists(key)) scene.textures.remove(key);
  scene.textures.addSpriteSheet(key, canvas, { frameWidth: FW, frameHeight: FH });

  // Crear animaciones de combate
  const anims = [
    { name: 'idle', s: 0, e: 1, rate: 3, loop: true },
    { name: 'walk', s: 2, e: 5, rate: 10, loop: true },
    { name: 'jump', s: 6, e: 6, rate: 1, loop: false },
    { name: 'fall', s: 7, e: 7, rate: 1, loop: false },
    { name: 'crouch', s: 8, e: 8, rate: 1, loop: false },
    { name: 'punch', s: 9, e: 11, rate: 12, loop: false },
    { name: 'kick', s: 12, e: 14, rate: 10, loop: false },
    { name: 'special', s: 15, e: 17, rate: 8, loop: false },
    { name: 'block', s: 18, e: 18, rate: 1, loop: false },
    { name: 'hurt', s: 19, e: 20, rate: 8, loop: false },
    { name: 'ko', s: 21, e: 21, rate: 1, loop: false },
    { name: 'victory', s: 22, e: 23, rate: 3, loop: true }
  ];

  anims.forEach(a => {
    const aKey = char.id + '_' + a.name;
    if (scene.anims.exists(aKey)) scene.anims.remove(aKey);
    scene.anims.create({
      key: aKey,
      frames: scene.anims.generateFrameNumbers(key, { start: a.s, end: a.e }),
      frameRate: a.rate,
      repeat: a.loop ? -1 : 0
    });
  });
}

// ────────────────────────────────────────────
//  SECCIÓN 7 — CLASE FIGHTER
// ────────────────────────────────────────────
class Fighter {
  constructor(scene, x, y, charId, playerNum) {
    this.scene = scene;
    this.charData = CHARACTERS.find(c => c.id === charId);
    this.playerNum = playerNum;

    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.facing = playerNum === 1 ? 1 : -1;

    this.health = 100;
    this.maxHealth = 100;
    this.state = 'idle';
    this.stateTimer = 0;
    this.grounded = true;
    this.specialCooldown = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.hitstun = 0;
    this.blockstun = 0;
    this.invulnerable = 0;

    const texKey = 'fighter_' + charId;
    this.sprite = scene.add.sprite(x, y, texKey);
    this.sprite.setOrigin(0.5, 0.86);
    this.sprite.play(charId + '_idle');
    this.sprite.setScale(2.4);
    this.sprite.setDepth(10);

    if (this.facing < 0) this.sprite.setFlipX(true);

    const spd = this.charData.stats.speed;
    this.walkSpeed = 220 + spd * 30;
    this.jumpForce = -700 - spd * 15;

    this.powerMod = 0.8 + this.charData.stats.power * 0.12;
    this.defenseMod = 1.0 - this.charData.stats.defense * 0.05;

    this.alive = true;
    this.canAct = true;

    this.nameTag = scene.add.text(x, y + 10, this.charData.name, {
      fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold',
      color: playerNum === 1 ? '#66BBFF' : '#FF6666',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5, 0).setDepth(11);
  }

  setState(newState) {
    if (this.state === newState) return;
    this.state = newState;
    const aKey = this.charData.id + '_' + newState;
    if (this.scene.anims.exists(aKey)) {
      this.sprite.play(aKey);
    }
  }

  update(dt, keys, opponent) {
    if (!this.alive) return;

    if (this.specialCooldown > 0) this.specialCooldown--;
    if (this.comboTimer > 0) this.comboTimer--;
    else this.comboCount = 0;
    if (this.invulnerable > 0) this.invulnerable--;

    if (this.hitstun > 0) {
      this.hitstun--;
      if (this.hitstun <= 0 && this.state === 'hurt') {
        this.setState('idle');
        this.canAct = true;
      }
    }

    if (this.blockstun > 0) {
      this.blockstun--;
      if (this.blockstun <= 0 && this.state === 'block') {
        this.setState('idle');
        this.canAct = true;
      }
    }

    // Auto-encarar al oponente
    if (this.canAct && opponent && this.state !== 'hurt' && this.state !== 'ko') {
      if (opponent.x < this.x) {
        this.facing = -1;
        this.sprite.setFlipX(true);
      } else {
        this.facing = 1;
        this.sprite.setFlipX(false);
      }
    }

    if (this.canAct && this.state !== 'hurt' && this.state !== 'ko' && this.state !== 'victory') {
      this.handleInput(keys);
    }

    if (this.state === 'punch' || this.state === 'kick' || this.state === 'special') {
      this.stateTimer--;
      if (this.stateTimer <= 0) {
        this.setState('idle');
        this.canAct = true;
      }
    }

    this.applyPhysics(dt);

    this.sprite.setPosition(this.x, this.y);
    this.nameTag.setPosition(this.x, this.y + 10);
  }

  handleInput(keys) {
    const isAttacking = (this.state === 'punch' || this.state === 'kick' || this.state === 'special');
    if (isAttacking) return;

    // Bloqueo
    const blockDown = (keys.block && keys.block.isDown) || (keys.altBlock && keys.altBlock.isDown);
    if (blockDown) {
      if (this.state !== 'block') this.setState('block');
      this.vx = 0;
      return;
    } else if (this.state === 'block') {
      this.setState('idle');
    }

    // Movimiento lateral
    let moving = false;
    const leftDown = (keys.left && keys.left.isDown) || (keys.altLeft && keys.altLeft.isDown);
    const rightDown = (keys.right && keys.right.isDown) || (keys.altRight && keys.altRight.isDown);

    if (leftDown) {
      this.vx = -this.walkSpeed;
      moving = true;
    } else if (rightDown) {
      this.vx = this.walkSpeed;
      moving = true;
    } else {
      this.vx = 0;
    }

    // Salto
    const jumpJustDown = (keys.jump && Phaser.Input.Keyboard.JustDown(keys.jump)) ||
                         (keys.altJump && Phaser.Input.Keyboard.JustDown(keys.altJump));
    if (jumpJustDown && this.grounded) {
      this.vy = this.jumpForce;
      this.grounded = false;
      this.setState('jump');
    }

    // Golpes y Ataques
    const punchJustDown = (keys.punch && Phaser.Input.Keyboard.JustDown(keys.punch)) ||
                          (keys.altPunch && Phaser.Input.Keyboard.JustDown(keys.altPunch));
    if (punchJustDown) {
      this.attack('punch');
      return;
    }

    const kickJustDown = (keys.kick && Phaser.Input.Keyboard.JustDown(keys.kick)) ||
                         (keys.altKick && Phaser.Input.Keyboard.JustDown(keys.altKick));
    if (kickJustDown) {
      this.attack('kick');
      return;
    }

    const specialJustDown = (keys.special && Phaser.Input.Keyboard.JustDown(keys.special)) ||
                           (keys.altSpecial && Phaser.Input.Keyboard.JustDown(keys.altSpecial));
    if (specialJustDown && this.specialCooldown <= 0) {
      this.attack('special');
      return;
    }

    if (this.grounded && !isAttacking) {
      if (moving) {
        if (this.state !== 'walk') this.setState('walk');
      } else {
        if (this.state !== 'idle') this.setState('idle');
      }
    }

    if (!this.grounded) {
      if (this.vy < 0 && this.state !== 'jump' && !isAttacking) this.setState('jump');
      else if (this.vy > 0 && this.state !== 'fall' && !isAttacking) this.setState('fall');
    }
  }

  attack(type) {
    const data = ATTACK_DATA[type];
    this.setState(type);
    this.canAct = false;
    this.stateTimer = data.startup + data.active + data.recovery;

    if (type === 'special') {
      this.specialCooldown = data.cooldown;
      // Destello especial
      const fx = this.scene.add.graphics().setDepth(25);
      fx.fillStyle(0xFFCC00, 0.4);
      fx.fillCircle(this.x, this.y - 70, 60);
      this.scene.tweens.add({
        targets: fx, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 250,
        onComplete: () => fx.destroy()
      });
    }

    this.vx = this.facing * 90;
  }

  getHitbox() {
    if (this.state !== 'punch' && this.state !== 'kick' && this.state !== 'special') return null;

    const data = ATTACK_DATA[this.state];
    const totalFrames = data.startup + data.active + data.recovery;
    const elapsed = totalFrames - this.stateTimer;

    if (elapsed < data.startup || elapsed >= data.startup + data.active) return null;

    const hbX = this.x + this.facing * 40;
    const hbY = this.state === 'kick' ? this.y - 50 : this.y - 92;
    const hbW = data.range;
    const hbH = 42;

    return {
      x: this.facing > 0 ? hbX : hbX - hbW,
      y: hbY,
      w: hbW,
      h: hbH,
      damage: Math.round(data.damage * this.powerMod),
      knockback: data.knockback,
      hitstun: data.hitstun,
      type: this.state
    };
  }

  getHurtbox() {
    return {
      x: this.x - 32,
      y: this.y - 145,
      w: 64,
      h: 145
    };
  }

  takeDamage(hitbox) {
    if (this.invulnerable > 0) return false;

    if (this.state === 'block') {
      const chipDamage = Math.round(hitbox.damage * 0.15);
      this.health = Math.max(0, this.health - chipDamage);
      this.vx = -this.facing * hitbox.knockback * 0.35;
      this.blockstun = 8;
      this.canAct = false;
      this.scene.cameras.main.shake(70, 0.003);
      return 'blocked';
    }

    const finalDamage = Math.round(hitbox.damage * this.defenseMod);
    this.health = Math.max(0, this.health - finalDamage);

    this.vx = -this.facing * hitbox.knockback;
    this.vy = -160;

    this.hitstun = hitbox.hitstun;
    this.canAct = false;
    this.setState('hurt');
    this.invulnerable = hitbox.hitstun + 4;

    this.scene.cameras.main.shake(130, 0.009);
    this.sprite.setTint(0xFF3333);
    this.scene.time.delayedCall(120, () => {
      if (this.sprite && this.sprite.active) this.sprite.clearTint();
    });

    this.createHitEffect(hitbox);

    if (this.health <= 0) {
      this.die();
    }

    return 'hit';
  }

  createHitEffect(hitbox) {
    const hx = hitbox.x + hitbox.w / 2;
    const hy = hitbox.y + hitbox.h / 2;

    const flash = this.scene.add.graphics().setDepth(30);
    flash.fillStyle(0xFFFFFF, 0.95);
    flash.fillCircle(hx, hy, 22);
    flash.fillStyle(0xFFCC00, 0.8);
    flash.fillCircle(hx, hy, 15);
    flash.fillStyle(0xFF4400, 0.6);
    flash.fillCircle(hx, hy, 8);

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
      const len = 18 + Math.random() * 22;
      flash.lineStyle(3, 0xFFCC00);
      flash.beginPath();
      flash.moveTo(hx + Math.cos(angle) * 8, hy + Math.sin(angle) * 8);
      flash.lineTo(hx + Math.cos(angle) * len, hy + Math.sin(angle) * len);
      flash.strokePath();
    }

    this.scene.tweens.add({
      targets: flash,
      alpha: 0, scaleX: 1.6, scaleY: 1.6, duration: 220,
      onComplete: () => flash.destroy()
    });
  }

  die() {
    this.alive = false;
    this.setState('ko');
    this.canAct = false;
    this.vx = -this.facing * 220;
    this.vy = -320;
  }

  applyPhysics(dt) {
    if (!this.grounded) {
      this.vy += GRAVITY * dt;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.y >= GROUND_Y) {
      this.y = GROUND_Y;
      this.vy = 0;
      if (!this.grounded) {
        this.grounded = true;
        if (this.state === 'jump' || this.state === 'fall') {
          if (this.alive && this.hitstun <= 0) {
            this.setState('idle');
            this.canAct = true;
          }
        }
      }
    } else {
      this.grounded = false;
    }

    if (this.x < STAGE_LEFT) this.x = STAGE_LEFT;
    if (this.x > STAGE_RIGHT) this.x = STAGE_RIGHT;

    if (this.grounded && this.state !== 'walk') {
      this.vx *= 0.84;
      if (Math.abs(this.vx) < 5) this.vx = 0;
    }
  }

  setVictory() {
    this.setState('victory');
    this.canAct = false;
    this.vx = 0;
  }

  reset(x) {
    this.x = x;
    this.y = GROUND_Y;
    this.vx = 0;
    this.vy = 0;
    this.health = this.maxHealth;
    this.state = 'idle';
    this.stateTimer = 0;
    this.grounded = true;
    this.specialCooldown = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.hitstun = 0;
    this.blockstun = 0;
    this.invulnerable = 0;
    this.alive = true;
    this.canAct = true;
    this.sprite.clearTint();
    this.sprite.setPosition(this.x, this.y);
    this.setState('idle');
  }

  destroy() {
    if (this.sprite) this.sprite.destroy();
    if (this.nameTag) this.nameTag.destroy();
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 8 — ESCENA 1: BOOT SCENE
// ────────────────────────────────────────────
class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'Boot' }); }

  preload() {
    const bar = this.add.graphics();
    const box = this.add.graphics();
    box.fillStyle(0x222222, 0.8);
    box.fillRect(W / 2 - 180, H / 2 - 15, 360, 30);

    const txt = this.add.text(W / 2, H / 2 - 45, 'PREPARANDO LA COCINA...', {
      fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setOrigin(0.5);

    // Cargar retratos reales de los personajes
    CHARACTERS.forEach(c => {
      this.load.image('portrait_' + c.id, c.portrait);
    });

    // Cargar retratos de los jueces
    Object.keys(JUDGES).forEach(k => {
      this.load.image('judge_' + k, JUDGES[k].portrait);
    });

    // Cargar escenarios
    STAGES.forEach(s => {
      this.load.image(s.id, s.file);
    });
  }

  create() {
    // Generar spritesheets procedurales de animación para los 8 luchadores
    CHARACTERS.forEach(c => {
      buildCharacterSpriteSheet(this, c);
    });

    this.scene.start('Title');
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 9 — ESCENA 2: PORTADA (TITLE)
// ────────────────────────────────────────────
class TitleScene extends Phaser.Scene {
  constructor() { super({ key: 'Title' }); }

  create() {
    // Fondo temático con fuego
    this.add.image(W / 2, H / 2, 'stage_fire').setTint(0x444455);

    const fireGfx = this.add.graphics();
    for (let i = 0; i < 90; i++) {
      const alpha = (1 - i / 90) * 0.35;
      fireGfx.fillStyle(0xFF3300, alpha);
      fireGfx.fillRect(0, H - i * 3, W, 3);
    }

    // Placa del Logotipo Culinario
    const py = H * 0.33;
    const plate = this.add.graphics();
    plate.fillStyle(0x991100, 0.95);
    plate.fillRoundedRect(W / 2 - 320, py - 85, 640, 170, 24);
    plate.lineStyle(5, 0xFFD700);
    plate.strokeRoundedRect(W / 2 - 320, py - 85, 640, 170, 24);

    const masterT = this.add.text(W / 2, py - 30, 'MASTER', {
      fontSize: '76px', fontFamily: 'Impact, Arial Black',
      color: '#FFFFFF', stroke: '#000000', strokeThickness: 8
    }).setOrigin(0.5);

    const chillT = this.add.text(W / 2, py + 38, 'CHILL', {
      fontSize: '84px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#AA1100', strokeThickness: 10
    }).setOrigin(0.5);

    this.add.text(W / 2, py + 92, '⭐ EL CAOS ESTÁ SERVIDO ⭐', {
      fontSize: '19px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    // Texto parpadeante de entrada
    const startBtn = this.add.text(W / 2, H * 0.72, '— PRESIONA ENTER O HAZ CLICK PARA ENTRAR —', {
      fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFFFFF', stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.tweens.add({
      targets: startBtn, alpha: 0.25, duration: 600, yoyo: true, repeat: -1
    });

    const proceed = () => this.scene.start('MainMenu');
    this.input.keyboard.on('keydown-ENTER', proceed);
    this.input.keyboard.on('keydown-SPACE', proceed);
    startBtn.on('pointerdown', proceed);
    this.input.on('pointerdown', proceed);
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 10 — ESCENA 3: MENÚ PRINCIPAL
// ────────────────────────────────────────────
class MainMenuScene extends Phaser.Scene {
  constructor() { super({ key: 'MainMenu' }); }

  create() {
    this.add.image(W / 2, H / 2, 'stage_tv').setTint(0x555566);

    this.add.text(W / 2, 80, 'MASTER-CHILL', {
      fontSize: '54px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#CC1100', strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(W / 2, 125, 'MENÚ PRINCIPAL', {
      fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    // Opciones del Menú
    const options = [
      { text: '⚔️  COMBATE VS (LOCAL 2P)', scene: 'CharSelect' },
      { text: '🤖  1 JUGADOR vs CPU', scene: 'CharSelect', cpuMode: true },
      { text: '📖  CÓMO JUGAR / CONTROLES', action: 'controls' },
      { text: '🏆  CRÉDITOS Y PARODIA', action: 'credits' }
    ];

    const startY = 195;
    options.forEach((opt, idx) => {
      const y = startY + idx * 72;

      const bg = this.add.graphics();
      bg.fillStyle(0x1a1a2e, 0.85);
      bg.fillRoundedRect(W / 2 - 250, y - 26, 500, 56, 14);
      bg.lineStyle(3, 0xFFD700);
      bg.strokeRoundedRect(W / 2 - 250, y - 26, 500, 56, 14);

      const btn = this.add.text(W / 2, y + 2, opt.text, {
        fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF'
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => {
        btn.setColor('#FFD700');
        btn.setScale(1.05);
      });
      btn.on('pointerout', () => {
        btn.setColor('#FFF');
        btn.setScale(1);
      });

      btn.on('pointerdown', () => {
        if (opt.scene) this.scene.start(opt.scene, { cpuMode: opt.cpuMode || false });
        else if (opt.action === 'controls') this.showControlsModal();
        else if (opt.action === 'credits') this.showCreditsModal();
      });
    });

    this.input.keyboard.on('keydown-ENTER', () => this.scene.start('CharSelect'));
  }

  showControlsModal() {
    const modal = this.add.container(W / 2, H / 2).setDepth(100);
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a1a, 0.95);
    bg.fillRoundedRect(-380, -220, 760, 440, 20);
    bg.lineStyle(4, 0xFFD700);
    bg.strokeRoundedRect(-380, -220, 760, 440, 20);
    modal.add(bg);

    const title = this.add.text(0, -180, 'ESQUEMA DE CONTROLES', {
      fontSize: '28px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setOrigin(0.5);
    modal.add(title);

    const p1Txt = this.add.text(-180, -40,
      'JUGADOR 1 (IZQUIERDA):\n' +
      '• Moverse: A / D\n' +
      '• Saltar: W\n' +
      '• Agacharse: S\n' +
      '• Golpe normal: F\n' +
      '• Patada: G\n' +
      '• Bloquear: H\n' +
      '• Ataque especial: R',
      { fontSize: '16px', fontFamily: 'Arial', color: '#66BBFF', lineSpacing: 8 }
    ).setOrigin(0.5);
    modal.add(p1Txt);

    const p2Txt = this.add.text(180, -40,
      'JUGADOR 2 (DERECHA):\n' +
      '• Moverse: Flechas ← / →\n' +
      '• Saltar: Flecha ↑\n' +
      '• Agacharse: Flecha ↓\n' +
      '• Golpe normal: Num 1 o J\n' +
      '• Patada: Num 2 o K\n' +
      '• Bloquear: Num 3 o L\n' +
      '• Ataque especial: Num 0 o U',
      { fontSize: '16px', fontFamily: 'Arial', color: '#FF8888', lineSpacing: 8 }
    ).setOrigin(0.5);
    modal.add(p2Txt);

    const closeBtn = this.add.text(0, 170, '✕ CERRAR (Haz Click)', {
      fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF',
      backgroundColor: '#CC2200', padding: { x: 20, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => modal.destroy());
    modal.add(closeBtn);
  }

  showCreditsModal() {
    const modal = this.add.container(W / 2, H / 2).setDepth(100);
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a1a, 0.95);
    bg.fillRoundedRect(-360, -180, 720, 360, 20);
    bg.lineStyle(4, 0xFFD700);
    bg.strokeRoundedRect(-360, -180, 720, 360, 20);
    modal.add(bg);

    const title = this.add.text(0, -130, 'MASTER-CHILL', {
      fontSize: '28px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setOrigin(0.5);
    modal.add(title);

    const desc = this.add.text(0, -10,
      'Proyecto independiente de parodia y homenaje al universo\n' +
      'de la cocina televisiva chilena.\n\n' +
      'Desarrollado con Phaser 3, HTML5 y JavaScript.\n' +
      'No oficial ni afiliado a ningún canal de televisión.\n\n' +
      '¡Que no se te queme el plato!',
      { fontSize: '16px', fontFamily: 'Arial', color: '#EEE', align: 'center', lineSpacing: 6 }
    ).setOrigin(0.5);
    modal.add(desc);

    const closeBtn = this.add.text(0, 130, '✕ CERRAR', {
      fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF',
      backgroundColor: '#225588', padding: { x: 20, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => modal.destroy());
    modal.add(closeBtn);
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 11 — ESCENA 4: SELECCIÓN DE PERSONAJES
// ────────────────────────────────────────────
class CharSelectScene extends Phaser.Scene {
  constructor() { super({ key: 'CharSelect' }); }

  init(data) {
    this.cpuMode = data && data.cpuMode ? true : false;
  }

  create() {
    this.add.rectangle(W / 2, H / 2, W, H, 0x10101c);

    this.add.text(W / 2, 40, 'SELECCIÓN DE LUCHADORES', {
      fontSize: '34px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);

    this.p1Choice = 0;
    this.p2Choice = 1;
    this.p1Confirmed = false;
    this.p2Confirmed = false;

    // Cuadrícula de 8 personajes (2 filas x 4 columnas)
    this.cards = [];
    const cardW = 145, cardH = 160;
    const gapX = 22, gapY = 18;
    const startX = W / 2 - (4 * cardW + 3 * gapX) / 2 + cardW / 2;
    const startY = 125;

    for (let i = 0; i < CHARACTERS.length; i++) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const cx = startX + col * (cardW + gapX);
      const cy = startY + row * (cardH + gapY);

      const card = this.add.container(cx, cy);

      const bg = this.add.graphics();
      bg.fillStyle(0x1e1e2f, 1);
      bg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 12);
      bg.lineStyle(3, 0x3d3d5c);
      bg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 12);
      card.add(bg);

      // Retrato real recortado
      const portrait = this.add.image(0, -22, 'portrait_' + CHARACTERS[i].id);
      portrait.setDisplaySize(92, 92);
      card.add(portrait);

      // Nombre
      const nameTxt = this.add.text(0, 42, CHARACTERS[i].name, {
        fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF'
      }).setOrigin(0.5);
      card.add(nameTxt);

      // Título
      const titleTxt = this.add.text(0, 58, CHARACTERS[i].title, {
        fontSize: '9px', fontFamily: 'Arial', color: '#BBB'
      }).setOrigin(0.5);
      card.add(titleTxt);

      card.setSize(cardW, cardH);
      card.setInteractive({ useHandCursor: true });
      const idx = i;
      card.on('pointerdown', (pointer) => {
        if (pointer.rightButtonDown() || pointer.button === 2) {
          this.p2Choice = idx;
        } else {
          this.p1Choice = idx;
        }
        this.updateDisplay();
      });

      this.cards.push({ container: card, bg, cx, cy });
    }

    // Indicadores P1 y P2
    this.p1Badge = this.add.text(0, 0, 'P1', {
      fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', backgroundColor: '#0066CC', padding: { x: 7, y: 3 }
    }).setOrigin(0.5, 1).setDepth(20);

    this.p2Badge = this.add.text(0, 0, 'P2', {
      fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', backgroundColor: '#CC2200', padding: { x: 7, y: 3 }
    }).setOrigin(0.5, 1).setDepth(20);

    // Paneles de información detallada
    this.p1Info = this.add.text(180, H - 145, '', {
      fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#66BBFF', stroke: '#000', strokeThickness: 3, lineSpacing: 4
    }).setOrigin(0.5, 0);

    this.p2Info = this.add.text(W - 180, H - 145, '', {
      fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FF7777', stroke: '#000', strokeThickness: 3, lineSpacing: 4
    }).setOrigin(0.5, 0);

    // Botón de Inicio / Selección de Escenario
    this.fightBtn = this.add.text(W / 2, H - 95, '⚔️ ¡A COCINAR! [ENTER]', {
      fontSize: '26px', fontFamily: 'Impact, Arial Black',
      color: '#FFF', backgroundColor: '#CC2200', padding: { x: 26, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.fightBtn.on('pointerover', () => this.fightBtn.setScale(1.08));
    this.fightBtn.on('pointerout', () => this.fightBtn.setScale(1));
    this.fightBtn.on('pointerdown', () => this.goToStageSelect());

    // Botón Volver
    const backBtn = this.add.text(80, 40, '← MENÚ', {
      fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#AAA'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('MainMenu'));

    // Configuración de teclado
    this.p1Left = this.input.keyboard.addKey('A');
    this.p1Right = this.input.keyboard.addKey('D');
    this.p2Left = this.input.keyboard.addKey('LEFT');
    this.p2Right = this.input.keyboard.addKey('RIGHT');
    this.startKey = this.input.keyboard.addKey('ENTER');

    this.input.keyboard.on('keydown-ENTER', () => this.goToStageSelect());
    this.input.keyboard.on('keydown-SPACE', () => this.goToStageSelect());

    this.updateDisplay();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.p1Left)) {
      this.p1Choice = (this.p1Choice - 1 + CHARACTERS.length) % CHARACTERS.length;
      this.updateDisplay();
    }
    if (Phaser.Input.Keyboard.JustDown(this.p1Right)) {
      this.p1Choice = (this.p1Choice + 1) % CHARACTERS.length;
      this.updateDisplay();
    }

    if (Phaser.Input.Keyboard.JustDown(this.p2Left)) {
      this.p2Choice = (this.p2Choice - 1 + CHARACTERS.length) % CHARACTERS.length;
      this.updateDisplay();
    }
    if (Phaser.Input.Keyboard.JustDown(this.p2Right)) {
      this.p2Choice = (this.p2Choice + 1) % CHARACTERS.length;
      this.updateDisplay();
    }

    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.goToStageSelect();
    }
  }

  goToStageSelect() {
    this.scene.start('StageSelect', {
      p1Char: CHARACTERS[this.p1Choice].id,
      p2Char: CHARACTERS[this.p2Choice].id,
      cpuMode: this.cpuMode
    });
  }

  updateDisplay() {
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      card.bg.clear();

      let border = 0x3d3d5c;
      let bg = 0x1e1e2f;

      if (i === this.p1Choice && i === this.p2Choice) {
        border = 0xFFD700;
        bg = 0x3d2d44;
      } else if (i === this.p1Choice) {
        border = 0x3388FF;
        bg = 0x1a2e4c;
      } else if (i === this.p2Choice) {
        border = 0xFF3333;
        bg = 0x4c1a1a;
      }

      card.bg.fillStyle(bg, 1);
      card.bg.fillRoundedRect(-145 / 2, -160 / 2, 145, 160, 12);
      card.bg.lineStyle(3.5, border);
      card.bg.strokeRoundedRect(-145 / 2, -160 / 2, 145, 160, 12);
    }

    const c1 = this.cards[this.p1Choice];
    this.p1Badge.setPosition(c1.cx - 28, c1.cy - 86);

    const c2 = this.cards[this.p2Choice];
    this.p2Badge.setPosition(c2.cx + 28, c2.cy - 86);

    const ch1 = CHARACTERS[this.p1Choice];
    this.p1Info.setText(
      `P1: ${ch1.name}\n` +
      `Arma: ${ch1.weaponName}\n` +
      `Especial: ${ch1.specialName}\n` +
      `VEL:${'★'.repeat(ch1.stats.speed)} POD:${'★'.repeat(ch1.stats.power)} DEF:${'★'.repeat(ch1.stats.defense)}`
    );

    const ch2 = CHARACTERS[this.p2Choice];
    this.p2Info.setText(
      `P2: ${ch2.name}\n` +
      `Arma: ${ch2.weaponName}\n` +
      `Especial: ${ch2.specialName}\n` +
      `VEL:${'★'.repeat(ch2.stats.speed)} POD:${'★'.repeat(ch2.stats.power)} DEF:${'★'.repeat(ch2.stats.defense)}`
    );
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 12 — ESCENA 5: SELECCIÓN DE ESCENARIO
// ────────────────────────────────────────────
class StageSelectScene extends Phaser.Scene {
  constructor() { super({ key: 'StageSelect' }); }

  init(data) {
    this.p1Char = data.p1Char || 'don_hugo';
    this.p2Char = data.p2Char || 'kenny';
    this.cpuMode = data.cpuMode || false;
  }

  create() {
    this.add.rectangle(W / 2, H / 2, W, H, 0x0f0e1a);

    this.add.text(W / 2, 60, 'SELECCIÓN DE ESCENARIO', {
      fontSize: '36px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);

    this.currentStageIdx = 0;

    this.stageCards = [];
    const cardW = 420, cardH = 260;
    const startX = W / 2 - 250;

    STAGES.forEach((stage, idx) => {
      const cx = idx === 0 ? W / 2 - 250 : W / 2 + 250;
      const cy = H / 2 - 20;

      const container = this.add.container(cx, cy);

      const frame = this.add.graphics();
      frame.fillStyle(0x1a1a2e, 1);
      frame.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
      frame.lineStyle(4, idx === 0 ? 0xFFD700 : 0x444466);
      frame.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
      container.add(frame);

      const thumb = this.add.image(0, -25, stage.id);
      thumb.setDisplaySize(cardW - 20, cardH - 80);
      container.add(thumb);

      const name = this.add.text(0, cardH / 2 - 45, stage.name, {
        fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF'
      }).setOrigin(0.5);
      container.add(name);

      const desc = this.add.text(0, cardH / 2 - 20, stage.desc, {
        fontSize: '12px', fontFamily: 'Arial', color: '#BBB'
      }).setOrigin(0.5);
      container.add(desc);

      container.setSize(cardW, cardH);
      container.setInteractive({ useHandCursor: true });
      container.on('pointerdown', () => {
        this.currentStageIdx = idx;
        this.startCombat();
      });

      this.stageCards.push({ container, frame, idx });
    });

    const startBtn = this.add.text(W / 2, H - 90, '🔥 ¡COMENZAR PELEA! [ENTER]', {
      fontSize: '26px', fontFamily: 'Impact, Arial Black',
      color: '#FFF', backgroundColor: '#CC2200', padding: { x: 28, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerdown', () => this.startCombat());

    this.input.keyboard.on('keydown-LEFT', () => {
      this.currentStageIdx = 0;
      this.updateHighlight();
    });
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.currentStageIdx = 1;
      this.updateHighlight();
    });
    this.input.keyboard.on('keydown-ENTER', () => this.startCombat());
  }

  updateHighlight() {
    this.stageCards.forEach((c, idx) => {
      c.frame.clear();
      c.frame.fillStyle(0x1a1a2e, 1);
      c.frame.fillRoundedRect(-210, -130, 420, 260, 16);
      c.frame.lineStyle(4, idx === this.currentStageIdx ? 0xFFD700 : 0x444466);
      c.frame.strokeRoundedRect(-210, -130, 420, 260, 16);
    });
  }

  startCombat() {
    this.scene.start('Fight', {
      p1Char: this.p1Char,
      p2Char: this.p2Char,
      stage: STAGES[this.currentStageIdx].id,
      cpuMode: this.cpuMode
    });
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 13 — ESCENA 6: COMBATE VS
// ────────────────────────────────────────────
class FightScene extends Phaser.Scene {
  constructor() { super({ key: 'Fight' }); }

  init(data) {
    this.p1CharId = data.p1Char || 'don_hugo';
    this.p2CharId = data.p2Char || 'kenny';
    this.stageKey = data.stage || 'stage_kitchen';
    this.cpuMode = data.cpuMode || false;
  }

  create() {
    // Escenario de fondo real
    this.add.image(W / 2, H / 2, this.stageKey);

    // Luchadores
    this.fighter1 = new Fighter(this, 320, GROUND_Y, this.p1CharId, 1);
    this.fighter2 = new Fighter(this, W - 320, GROUND_Y, this.p2CharId, 2);

    // Mapeo de controles de teclado
    this.p1Keys = {
      left:    this.input.keyboard.addKey('A'),
      right:   this.input.keyboard.addKey('D'),
      jump:    this.input.keyboard.addKey('W'),
      crouch:  this.input.keyboard.addKey('S'),
      punch:   this.input.keyboard.addKey('F'),
      kick:    this.input.keyboard.addKey('G'),
      block:   this.input.keyboard.addKey('H'),
      special: this.input.keyboard.addKey('R')
    };

    this.p2Keys = {
      left:       this.input.keyboard.addKey('LEFT'),
      right:      this.input.keyboard.addKey('RIGHT'),
      jump:       this.input.keyboard.addKey('UP'),
      crouch:     this.input.keyboard.addKey('DOWN'),
      punch:      this.input.keyboard.addKey('NUMPAD_ONE'),
      kick:       this.input.keyboard.addKey('NUMPAD_TWO'),
      block:      this.input.keyboard.addKey('NUMPAD_THREE'),
      special:    this.input.keyboard.addKey('NUMPAD_ZERO'),
      // Alternativas para teclados sin Numpad:
      altPunch:   this.input.keyboard.addKey('J'),
      altKick:    this.input.keyboard.addKey('K'),
      altBlock:   this.input.keyboard.addKey('L'),
      altSpecial: this.input.keyboard.addKey('U')
    };

    this.createHUD();

    this.currentRound = 1;
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.roundTimer = ROUND_TIME;
    this.timerActive = false;
    this.roundOver = false;
    this.matchOver = false;
    this.hitRegistered = {};

    // CPU banner
    if (this.cpuMode) {
      this.add.text(W / 2, 86, '🤖 MODO CPU', {
        fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
        color: '#AAFFAA', stroke: '#000', strokeThickness: 2
      }).setOrigin(0.5).setDepth(16);
    }

    // HUD de Combo
    this.comboText1 = this.add.text(220, H / 2 - 20, '', {
      fontSize: '48px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5).setDepth(60).setAlpha(0);

    this.comboText2 = this.add.text(W - 220, H / 2 - 20, '', {
      fontSize: '48px', fontFamily: 'Impact, Arial Black',
      color: '#FF6666', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5).setDepth(60).setAlpha(0);

    this.startRoundIntro();
  }

  createHUD() {
    const hudY = 28;
    const barW = 420;
    const barH = 30;

    // Retratos P1 y P2 en el HUD
    const p1Img = this.add.image(42, hudY + 15, 'portrait_' + this.p1CharId).setDisplaySize(48, 48).setDepth(15);
    const p2Img = this.add.image(W - 42, hudY + 15, 'portrait_' + this.p2CharId).setDisplaySize(48, 48).setDepth(15);

    // Fondos de barra
    this.add.graphics()
      .fillStyle(0x000000, 0.75)
      .fillRoundedRect(72, hudY - 2, barW + 4, barH + 4, 6)
      .setDepth(10);

    this.add.graphics()
      .fillStyle(0x000000, 0.75)
      .fillRoundedRect(W - 76 - barW, hudY - 2, barW + 4, barH + 4, 6)
      .setDepth(10);

    this.p1HealthBg = this.add.graphics().setDepth(11);
    this.p1HealthBg.fillStyle(0x331111);
    this.p1HealthBg.fillRect(74, hudY, barW, barH);

    this.p2HealthBg = this.add.graphics().setDepth(11);
    this.p2HealthBg.fillStyle(0x331111);
    this.p2HealthBg.fillRect(W - 74 - barW, hudY, barW, barH);

    // Barra "ghost" (retraso visual de daño)
    this.p1GhostBar = this.add.graphics().setDepth(11);
    this.p2GhostBar = this.add.graphics().setDepth(11);
    this.p1GhostHealth = 100;
    this.p2GhostHealth = 100;

    this.p1HealthBar = this.add.graphics().setDepth(12);
    this.p2HealthBar = this.add.graphics().setDepth(12);

    const c1 = CHARACTERS.find(c => c.id === this.p1CharId);
    const c2 = CHARACTERS.find(c => c.id === this.p2CharId);

    this.add.text(76, hudY - 4, c1.name.toUpperCase(), {
      fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#66BBFF', stroke: '#000', strokeThickness: 3
    }).setOrigin(0, 1).setDepth(15);

    this.add.text(W - 76, hudY - 4, c2.name.toUpperCase(), {
      fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FF6666', stroke: '#000', strokeThickness: 3
    }).setOrigin(1, 1).setDepth(15);

    // Temporizador
    this.add.graphics()
      .fillStyle(0x111122, 0.9)
      .fillRoundedRect(W / 2 - 40, hudY - 6, 80, 54, 10)
      .lineStyle(3, 0xFFD700)
      .strokeRoundedRect(W / 2 - 40, hudY - 6, 80, 54, 10)
      .setDepth(13);

    this.timerText = this.add.text(W / 2, hudY + 2, '99', {
      fontSize: '40px', fontFamily: 'Impact, Arial Black',
      color: '#FFFFFF', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5, 0).setDepth(15);

    this.roundText = this.add.text(W / 2, hudY + 58, 'RONDA 1', {
      fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFD700', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5).setDepth(15);

    // Indicadores de Rondas Ganadas
    this.p1WinDots = [];
    this.p2WinDots = [];
    for (let i = 0; i < ROUNDS_TO_WIN; i++) {
      const d1 = this.add.circle(76 + barW - 20 * i, hudY + barH + 12, 6, 0x333333).setDepth(15);
      this.p1WinDots.push(d1);
      const d2 = this.add.circle(W - 76 - barW + 20 * i, hudY + barH + 12, 6, 0x333333).setDepth(15);
      this.p2WinDots.push(d2);
    }

    // Indicadores de Especial
    this.p1SpecialText = this.add.text(76, hudY + barH + 24, '★ ESPECIAL LISTO [R]', {
      fontSize: '12px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setDepth(15);

    this.p2SpecialText = this.add.text(W - 76, hudY + barH + 24, '★ ESPECIAL LISTO [Num0/U]', {
      fontSize: '12px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setOrigin(1, 0).setDepth(15);

    // Banner de Comentarios de los Jueces con retrato
    this.judgeContainer = this.add.container(W / 2, H - 42).setDepth(50);

    this.judgeBg = this.add.graphics();
    this.judgeBg.fillStyle(0x0a0a14, 0.85);
    this.judgeBg.fillRoundedRect(-400, -25, 800, 50, 12);
    this.judgeBg.lineStyle(2.5, 0xFFD700);
    this.judgeBg.strokeRoundedRect(-400, -25, 800, 50, 12);
    this.judgeContainer.add(this.judgeBg);

    this.judgePortrait = this.add.image(-365, 0, 'judge_yann').setDisplaySize(42, 42);
    this.judgeContainer.add(this.judgePortrait);

    this.judgeText = this.add.text(-330, 0, '', {
      fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFD700', wordWrap: { width: 700 }
    }).setOrigin(0, 0.5);
    this.judgeContainer.add(this.judgeText);
  }

  showJudgeComment(category) {
    const q = getRandomJudgeLine(category);
    this.judgePortrait.setTexture('judge_' + q.judge);
    const jName = JUDGES[q.judge].name;
    this.judgeText.setText(`${jName}: "${q.text}"`);

    this.judgeContainer.setAlpha(1);
    if (this.judgeFade) this.judgeFade.remove();
    this.judgeFade = this.time.delayedCall(3500, () => {
      this.tweens.add({ targets: this.judgeContainer, alpha: 0, duration: 500 });
    });
  }

  startRoundIntro() {
    this.roundOver = false;
    this.timerActive = false;
    this.roundTimer = ROUND_TIME;
    this.hitRegistered = {};

    this.fighter1.reset(320);
    this.fighter2.reset(W - 320);

    const roundAnnounce = this.add.text(W / 2, H / 2 - 40, `RONDA ${this.currentRound}`, {
      fontSize: '68px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#000', strokeThickness: 8
    }).setOrigin(0.5).setDepth(100).setAlpha(0);

    const fightAnnounce = this.add.text(W / 2, H / 2 + 35, '¡A COCINAR!', {
      fontSize: '60px', fontFamily: 'Impact, Arial Black',
      color: '#FF3300', stroke: '#000', strokeThickness: 8
    }).setOrigin(0.5).setDepth(100).setAlpha(0);

    this.showJudgeComment(this.currentRound === 1 ? 'start' : 'start');

    this.tweens.add({
      targets: roundAnnounce,
      alpha: 1, scaleX: 1.1, scaleY: 1.1, duration: 400, ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(600, () => {
          this.tweens.add({ targets: roundAnnounce, alpha: 0, y: H / 2 - 80, duration: 250 });
          this.tweens.add({
            targets: fightAnnounce,
            alpha: 1, scaleX: 1.15, scaleY: 1.15, duration: 300, ease: 'Back.easeOut',
            onComplete: () => {
              this.time.delayedCall(500, () => {
                this.tweens.add({
                  targets: fightAnnounce, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 300,
                  onComplete: () => {
                    roundAnnounce.destroy();
                    fightAnnounce.destroy();
                    this.timerActive = true;
                    this.timerEvent = this.time.addEvent({
                      delay: 1000, callback: this.tickTimer, callbackScope: this, loop: true
                    });
                  }
                });
              });
            }
          });
        });
      }
    });
  }

  tickTimer() {
    if (!this.timerActive || this.roundOver) return;
    this.roundTimer--;
    this.timerText.setText(String(this.roundTimer).padStart(2, '0'));

    if (this.roundTimer <= 10) {
      this.timerText.setColor('#FF3333');
    }

    if (this.roundTimer <= 0) {
      this.endRound('timeout');
    }
  }

  update(time, delta) {
    if (this.matchOver) return;
    const dt = delta / 1000;

    if (!this.roundOver) {
      this.updateCPU(dt);
      this.fighter1.update(dt, this.p1Keys, this.fighter2);
      // En modo CPU, p2Keys se ignoran (CPU controla directo)
      if (!this.cpuMode) {
        this.fighter2.update(dt, this.p2Keys, this.fighter1);
      } else {
        this.fighter2.update(dt, {}, this.fighter1);
      }
      this.checkCombat();
      this.pushApart();
    }

    this.updateHUD();
  }

  pushApart() {
    const dist = Math.abs(this.fighter1.x - this.fighter2.x);
    if (dist < 50) {
      const push = (50 - dist) / 2 + 1;
      if (this.fighter1.x < this.fighter2.x) {
        this.fighter1.x -= push;
        this.fighter2.x += push;
      } else {
        this.fighter1.x += push;
        this.fighter2.x -= push;
      }
    }
  }

  checkCombat() {
    // P1 ataca a P2
    const hb1 = this.fighter1.getHitbox();
    if (hb1 && !this.hitRegistered['p1_' + this.fighter1.stateTimer]) {
      const hurt2 = this.fighter2.getHurtbox();
      if (this.rectsOverlap(hb1, hurt2)) {
        this.hitRegistered['p1_' + this.fighter1.stateTimer] = true;
        const res = this.fighter2.takeDamage(hb1);
        if (res === 'hit') {
          this.showJudgeComment(hb1.type === 'special' ? 'special' : 'hit');
          this.fighter1.comboCount++;
          this.fighter1.comboTimer = 35;
          this.showComboHit(1, this.fighter1.comboCount);
        } else if (res === 'blocked') {
          this.showJudgeComment('block');
        }

        if (!this.fighter2.alive) {
          this.endRound('ko', 1);
        }
      }
    }

    // P2 ataca a P1
    const hb2 = this.fighter2.getHitbox();
    if (hb2 && !this.hitRegistered['p2_' + this.fighter2.stateTimer]) {
      const hurt1 = this.fighter1.getHurtbox();
      if (this.rectsOverlap(hb2, hurt1)) {
        this.hitRegistered['p2_' + this.fighter2.stateTimer] = true;
        const res = this.fighter1.takeDamage(hb2);
        if (res === 'hit') {
          this.showJudgeComment(hb2.type === 'special' ? 'special' : 'hit');
          this.fighter2.comboCount++;
          this.fighter2.comboTimer = 35;
          this.showComboHit(2, this.fighter2.comboCount);
        } else if (res === 'blocked') {
          this.showJudgeComment('block');
        }

        if (!this.fighter1.alive) {
          this.endRound('ko', 2);
        }
      }
    }
  }

  rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  endRound(reason, winner) {
    if (this.roundOver) return;
    this.roundOver = true;
    this.timerActive = false;
    if (this.timerEvent) this.timerEvent.remove();

    if (reason === 'timeout') {
      this.showJudgeComment('timeout');
      if (this.fighter1.health > this.fighter2.health) winner = 1;
      else if (this.fighter2.health > this.fighter1.health) winner = 2;
      else winner = 0;
    } else {
      this.showJudgeComment('ko');
    }

    if (winner === 1) {
      this.p1Wins++;
      this.fighter1.setVictory();
    } else if (winner === 2) {
      this.p2Wins++;
      this.fighter2.setVictory();
    }

    for (let i = 0; i < this.p1Wins && i < this.p1WinDots.length; i++) {
      this.p1WinDots[i].setFillStyle(0x3388FF);
    }
    for (let i = 0; i < this.p2Wins && i < this.p2WinDots.length; i++) {
      this.p2WinDots[i].setFillStyle(0xFF3333);
    }

    const resultTxt = this.add.text(W / 2, H / 2, reason === 'ko' ? '¡K.O.!' : '¡TIEMPO!', {
      fontSize: '76px', fontFamily: 'Impact, Arial Black',
      color: '#FF3300', stroke: '#000', strokeThickness: 8
    }).setOrigin(0.5).setDepth(100).setAlpha(0);

    this.tweens.add({
      targets: resultTxt, alpha: 1, scaleX: 1.2, scaleY: 1.2, duration: 400, ease: 'Back.easeOut'
    });

    this.time.delayedCall(2200, () => {
      resultTxt.destroy();

      if (this.p1Wins >= ROUNDS_TO_WIN || this.p2Wins >= ROUNDS_TO_WIN) {
        this.matchOver = true;
        const matchWinner = this.p1Wins >= ROUNDS_TO_WIN ? 1 : 2;
        const winId = matchWinner === 1 ? this.p1CharId : this.p2CharId;
        const loseId = matchWinner === 1 ? this.p2CharId : this.p1CharId;

        this.scene.start('Result', {
          winner: matchWinner,
          winChar: winId,
          loseChar: loseId,
          p1Char: this.p1CharId,
          p2Char: this.p2CharId,
          stage: this.stageKey,
          p1Wins: this.p1Wins,
          p2Wins: this.p2Wins,
          cpuMode: this.cpuMode
        });
      } else {
        this.currentRound++;
        this.roundText.setText(`RONDA ${this.currentRound}`);
        this.timerText.setColor('#FFFFFF');
        this.startRoundIntro();
      }
    });
  }

  updateHUD() {
    const barW = 420, barH = 30;
    const hudY = 28;

    // Fade ghost bars toward real value
    this.p1GhostHealth = Math.max(this.fighter1.health, this.p1GhostHealth - 0.35);
    this.p2GhostHealth = Math.max(this.fighter2.health, this.p2GhostHealth - 0.35);

    // Ghost bar P1 (amarillo/naranja, se desvanece)
    this.p1GhostBar.clear();
    const p1GhostPct = this.p1GhostHealth / this.fighter1.maxHealth;
    this.p1GhostBar.fillStyle(0xFFAA00);
    this.p1GhostBar.fillRect(74, hudY, barW * p1GhostPct, barH);

    // Real health bar P1
    this.p1HealthBar.clear();
    const p1Pct = this.fighter1.health / this.fighter1.maxHealth;
    const p1Col = p1Pct > 0.5 ? 0x22CC44 : p1Pct > 0.25 ? 0xCCAA22 : 0xCC2222;
    this.p1HealthBar.fillStyle(p1Col);
    this.p1HealthBar.fillRect(74, hudY, barW * p1Pct, barH);

    // Ghost bar P2
    this.p2GhostBar.clear();
    const p2GhostPct = this.p2GhostHealth / this.fighter2.maxHealth;
    const p2BarX = W - 74 - barW;
    this.p2GhostBar.fillStyle(0xFFAA00);
    this.p2GhostBar.fillRect(p2BarX + barW * (1 - p2GhostPct), hudY, barW * p2GhostPct, barH);

    // Real health bar P2
    this.p2HealthBar.clear();
    const p2Pct = this.fighter2.health / this.fighter2.maxHealth;
    const p2Col = p2Pct > 0.5 ? 0x22CC44 : p2Pct > 0.25 ? 0xCCAA22 : 0xCC2222;
    this.p2HealthBar.fillStyle(p2Col);
    this.p2HealthBar.fillRect(p2BarX + barW * (1 - p2Pct), hudY, barW * p2Pct, barH);

    if (this.fighter1.specialCooldown > 0) {
      const pct = 1 - (this.fighter1.specialCooldown / ATTACK_DATA.special.cooldown);
      this.p1SpecialText.setText(`Especial: ${Math.ceil(this.fighter1.specialCooldown / 60)}s [${'█'.repeat(Math.floor(pct*10))}${'░'.repeat(10-Math.floor(pct*10))}]`);
      this.p1SpecialText.setColor('#888');
    } else {
      this.p1SpecialText.setText('★ ESPECIAL LISTO [R]');
      this.p1SpecialText.setColor('#FFD700');
    }

    if (this.fighter2.specialCooldown > 0) {
      const pct = 1 - (this.fighter2.specialCooldown / ATTACK_DATA.special.cooldown);
      this.p2SpecialText.setText(`[${'█'.repeat(Math.floor(pct*10))}${'░'.repeat(10-Math.floor(pct*10))}] ${Math.ceil(this.fighter2.specialCooldown / 60)}s :Especial`);
      this.p2SpecialText.setColor('#888');
    } else {
      this.p2SpecialText.setText('★ ESPECIAL LISTO [Num0/U]');
      this.p2SpecialText.setColor('#FFD700');
    }
  }

  showComboHit(playerNum, count) {
    if (count < 2) return;
    const txt = playerNum === 1 ? this.comboText1 : this.comboText2;
    if (!txt) return;
    const label = count >= 5 ? `${count} HIT\n¡COMBO SUPREMO!` :
                  count >= 3 ? `${count} HIT\n¡COMBO!` :
                               `${count} HIT`;
    txt.setText(label);
    if (this.tweens.isTweening(txt)) this.tweens.killTweensOf(txt);
    txt.setAlpha(1).setScale(1.4);
    this.tweens.add({
      targets: txt,
      scaleX: 1, scaleY: 1,
      duration: 150, ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(900, () => {
          this.tweens.add({ targets: txt, alpha: 0, duration: 300 });
        });
      }
    });
    if (count >= 3) this.showJudgeComment('combo');
  }

  updateCPU(dt) {
    if (!this.cpuMode || this.roundOver || this.matchOver) return;
    const cpu = this.fighter2;
    const p1  = this.fighter1;
    if (!cpu.alive || !cpu.canAct) return;

    // Acumular tiempo de decisión
    this.cpuTimer = (this.cpuTimer || 0) + dt;
    if (this.cpuTimer < (this.cpuDecisionDelay || 0.18)) return;
    this.cpuTimer = 0;
    this.cpuDecisionDelay = 0.12 + Math.random() * 0.14;

    const dist = Math.abs(cpu.x - p1.x);
    const isClose = dist < 130;
    const isVeryClose = dist < 72;
    const hpRatio = cpu.health / cpu.maxHealth;
    const p1Attacking = (p1.state === 'punch' || p1.state === 'kick' || p1.state === 'special');

    // Bloquear si el rival ataca de cerca
    if (p1Attacking && isClose && Math.random() < 0.4) {
      this.simulateCPUKey('block');
      return;
    }

    // Especial si está disponible y el rival está cerca
    if (isClose && cpu.specialCooldown <= 0 && Math.random() < 0.07) {
      this.simulateCPUKey('special');
      return;
    }

    // Atacar si está cerca
    if (isVeryClose) {
      const r = Math.random();
      if (r < 0.5) this.simulateCPUKey('punch');
      else if (r < 0.85) this.simulateCPUKey('kick');
      return;
    }

    // Acercarse al rival
    if (dist > 90) {
      if (cpu.x > p1.x) {
        cpu.vx = -cpu.walkSpeed;
        if (cpu.grounded && cpu.state !== 'walk') cpu.setState('walk');
      } else {
        cpu.vx = cpu.walkSpeed;
        if (cpu.grounded && cpu.state !== 'walk') cpu.setState('walk');
      }
      // Salto ocasional para variedad
      if (cpu.grounded && Math.random() < 0.015) {
        cpu.vy = cpu.jumpForce;
        cpu.grounded = false;
        cpu.setState('jump');
      }
    } else {
      if (cpu.grounded && cpu.state === 'walk') cpu.setState('idle');
      cpu.vx = 0;
    }
  }

  simulateCPUKey(action) {
    const cpu = this.fighter2;
    if (!cpu.canAct) return;
    if (action === 'punch') cpu.attack('punch');
    else if (action === 'kick') cpu.attack('kick');
    else if (action === 'special' && cpu.specialCooldown <= 0) cpu.attack('special');
    else if (action === 'block') {
      if (cpu.state !== 'block') cpu.setState('block');
      cpu.blockstun = 8;
    }
  }

  shutdown() {
    if (this.fighter1) this.fighter1.destroy();
    if (this.fighter2) this.fighter2.destroy();
    if (this.timerEvent) this.timerEvent.remove();
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 14 — ESCENA 7: RESULTADO DE LA PELEA
// ────────────────────────────────────────────
class ResultScene extends Phaser.Scene {
  constructor() { super({ key: 'Result' }); }

  init(data) {
    this.resultData = data;
  }

  create() {
    const d = this.resultData;
    this.add.rectangle(W / 2, H / 2, W, H, 0x0c0b16);

    const fireGfx = this.add.graphics();
    for (let i = 0; i < 90; i++) {
      const alpha = (1 - i / 90) * 0.3;
      fireGfx.fillStyle(d.winner === 1 ? 0x1166EE : 0xEE2211, alpha);
      fireGfx.fillRect(0, H - i * 3, W, 3);
    }

    const winChar = CHARACTERS.find(c => c.id === d.winChar);

    this.add.text(W / 2, 60, '¡VICTORIA CULINARIA!', {
      fontSize: '56px', fontFamily: 'Impact, Arial Black',
      color: '#FFD700', stroke: '#000', strokeThickness: 7
    }).setOrigin(0.5);

    // Retrato del ganador en grande
    const portrait = this.add.image(W / 2, H / 2 - 40, 'portrait_' + d.winChar);
    portrait.setDisplaySize(180, 180);
    this.add.graphics()
      .lineStyle(5, 0xFFD700)
      .strokeCircle(W / 2, H / 2 - 40, 95);

    // Nombre y título del ganador
    this.add.text(W / 2, H / 2 + 75, winChar.name, {
      fontSize: '40px', fontFamily: 'Impact, Arial Black',
      color: d.winner === 1 ? '#66BBFF' : '#FF6666',
      stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);

    this.add.text(W / 2, H / 2 + 115, winChar.title, {
      fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700'
    }).setOrigin(0.5);

    // Marcador de rondas
    this.add.text(W / 2, H / 2 + 150, `RONDAS: ${d.p1Wins} — ${d.p2Wins}`, {
      fontSize: '24px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFF'
    }).setOrigin(0.5);

    // Veredicto del Jurado con retrato
    const judgesList = ['yann', 'fernanda', 'juanma'];
    const chosenJudge = judgesList[Math.floor(Math.random() * judgesList.length)];
    const judgeObj = JUDGES[chosenJudge];

    const verdictBox = this.add.container(W / 2, H - 120);
    const vBg = this.add.graphics();
    vBg.fillStyle(0x1a1a2e, 0.9);
    vBg.fillRoundedRect(-380, -30, 760, 60, 12);
    vBg.lineStyle(3, 0xFFD700);
    vBg.strokeRoundedRect(-380, -30, 760, 60, 12);
    verdictBox.add(vBg);

    const jImg = this.add.image(-340, 0, 'judge_' + chosenJudge).setDisplaySize(50, 50);
    verdictBox.add(jImg);

    const vText = this.add.text(-300, 0, `${judgeObj.name}: "${winChar.name} demostró un sazón superior. ¡Plato impecable!"`, {
      fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFD700', wordWrap: { width: 660 }
    }).setOrigin(0, 0.5);
    verdictBox.add(vText);

    // Botones de acción
    const rematchBtn = this.add.text(W / 2 - 140, H - 45, '🔄 REVANCHA', {
      fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', backgroundColor: '#CC2200', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const menuBtn = this.add.text(W / 2 + 140, H - 45, '📋 MENÚ PRINCIPAL', {
      fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold',
      color: '#FFF', backgroundColor: '#225588', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    rematchBtn.on('pointerdown', () => {
      this.scene.start('Fight', {
        p1Char: d.p1Char, p2Char: d.p2Char, stage: d.stage, cpuMode: d.cpuMode || false
      });
    });

    menuBtn.on('pointerdown', () => this.scene.start('MainMenu'));

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start('Fight', {
        p1Char: d.p1Char, p2Char: d.p2Char, stage: d.stage, cpuMode: d.cpuMode || false
      });
    });
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MainMenu'));
  }
}

// ────────────────────────────────────────────
//  SECCIÓN 15 — INICIALIZACIÓN DE PHASER
// ────────────────────────────────────────────
const gameConfig = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  parent: 'game-container',
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    BootScene,
    TitleScene,
    MainMenuScene,
    CharSelectScene,
    StageSelectScene,
    FightScene,
    ResultScene
  ],
  fps: { target: 60, forceSetTimeOut: false },
  render: { pixelArt: false, antialias: true }
};

window.addEventListener('load', () => {
  window.masterChillGame = new Phaser.Game(gameConfig);
});

})();
