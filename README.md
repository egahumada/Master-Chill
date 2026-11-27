# MASTER-CHILL — Versus V1

Videojuego web de combate arcade 2D, independiente y de parodia. Esta versión reemplaza el prototipo de minijuegos por una primera modalidad VS.

## Modo disponible
- **1P vs PC:** un jugador contra un rival controlado por la computadora, con dificultad fácil, normal y difícil.

El modo local de dos jugadores no forma parte de esta versión.

## Controles

### Jugador 1
- A / D: moverse.
- W: saltar.
- S: bloquear.
- F: golpe.
- G: patada.
- H: ataque especial.

## Personajes y arte
La selección y el combate utilizan recortes de las ilustraciones originales almacenadas en assets/characters/. Se conserva el arte original. En combate los recortes se muestran como imágenes estáticas con desplazamiento, salto, escala de ataque y reacciones; todavía no hay spritesheets completos de animación cuadro a cuadro.

## Escenario
Arena lateral de cocina con mesones, hornos, campanas, utensilios y letrero MASTER-CHILL. Los jueces entregan comentarios originales durante el combate.

## Tecnología
- Phaser 3.80.1 (cargado desde CDN).
- HTML, CSS y JavaScript.
- Sin backend; preparado para alojamiento estático en GitHub Pages.
- Requiere conexión a Internet para cargar Phaser desde CDN y las fuentes web.

## Ejecutar
Abre index.html mediante un servidor estático local o publícalo mediante GitHub Pages. Para evitar restricciones del navegador con recursos, es preferible usar un servidor HTTP local en lugar de abrir el archivo directamente.

## Publicar
En GitHub, configura Settings → Pages → Deploy from a branch → main → /(root) una vez que los cambios sean revisados y fusionados a main.

## Estado de esta entrega
Primera implementación de combate 1P vs PC en una rama de desarrollo. Se recomienda probar selección, dificultad, físicas y controles antes de fusionarla a main.

## Nota
MASTER-CHILL es un proyecto independiente de parodia y entretenimiento. No es oficial ni está afiliado a ningún programa de televisión. Los diálogos del jurado son originales y no se presentan como citas textuales.
