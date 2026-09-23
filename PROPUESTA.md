# Comidas — propuesta de aplicación

App web de un solo archivo (`index.html`), instalable en el móvil, al estilo de
`Apps/Registrador`. El objetivo no es "una app de recetas": es **responder rápido a
"con lo que tengo hecho, ¿qué puedo comer / qué cocino el domingo?"** y arrastrar
sola la lista de la compra.

---

## 1. La idea central: el grafo bases → recetas

Todo el recetario ya es un grafo. La app lo hace navegable en los dos sentidos y,
sobre todo, **lo cruza con el inventario**:

```
Inventario (lo que hay)  →  Bases disponibles  →  Recetas posibles  →  Menú  →  Compra
        ↑                                                               │
        └───────────────── cocinar consume / repone ────────────────────┘
```

De ahí salen las tres preguntas que la app contesta de un toque:

| Pregunta | Pantalla |
|---|---|
| ¿Qué como hoy y qué tengo que añadirle? | **Hoy** |
| Tengo B1, B3 y B5 en el congelador, ¿qué recetas me salen? | **Qué puedo hacer** |
| Si quiero T1, T5 y T17 esta semana, ¿qué bases cocino y qué compro? | **Semana** |

---

## 2. Pantallas

### Hoy
Lo primero al abrir. Del menú de la semana:
- el plato de hoy, grande, con **🔥 calentar / 🌡️ frío** bien visible (importa en la oficina);
- **"añadir hoy"**: la lista corta de lo que no va congelado ni preparado — el huevo
  cocido de T1, el pepino cortado de T15, la salsa de yogur de T14. Es el fallo típico
  de un batch cooking y la app lo convierte en un checklist de 30 segundos;
- botón **"sacar del congelador"** para el plato de mañana (descuenta del inventario);
- avisos: *"quedan 2 almuerzos de reserva (el objetivo son 3–5)"*, *"las verduras
  asadas caducan mañana"*.

### Qué puedo hacer  ← el motor
Una rejilla de bases (B1…B10) que se encienden y apagan; arrancan marcadas las que el
inventario dice que tienes. Debajo, las recetas ordenadas por cercanía:

- 🟢 **Listas**: todas sus bases están y solo falta lo fresco.
- 🟡 **Te falta una base** (con cuál: *"T17 Lasaña — falta B6 boloñesa"*).
- ⚪ El resto, plegado.

Filtros de una fila: `tupper / finde` · `🌡️ frío` · `🧊 congela` · `≤20 min` ·
`con huevo / sin huevo` · por proteína (lenteja, tofu, soja, huevo, queso).
Cada receta muestra a la derecha lo fresco que hay que comprar, que es lo único que
realmente te separa de cocinarla.

### Receta (ficha)
Cabecera: raciones (3 tupper / 2 finde), tiempo, etiquetas 🔥🧊❄️🌡️.
Tres bloques: **Bases** (tocables, llevan a la base y dicen cuántas porciones gasta),
**Añadir** (lo fresco), **Cómo** (el texto que ya está escrito).
Abajo, en rojo, las notas de conservación literales del recetario —
*"no se congela: el huevo queda gomoso"*— porque son la mitad del valor del recetario.
Botón **Cocinar**: descuenta las porciones de base del inventario y mete N raciones
como platos hechos (nevera o congelador, según la etiqueta).

### Base (ficha)
Preparación, rendimiento (*"~1 kg = 10 porciones de 100 g"*), conservación y
**"desbloquea"**: la lista de recetas T y F, marcando cuáles tendrías listas del todo
si haces una tanda. Eso responde a "¿qué base me renta más este domingo?".
Botón **Hacer una tanda** → suma porciones al inventario con la fecha de hoy.

### Congelador / Inventario
Sustituye a `inventario.md`, que es una tabla que nadie actualiza a mano.
Lotes = `{ qué (base o plato), porciones, fecha, sitio (cajón/nevera) }`.
- Ordenado por antigüedad: **lo viejo arriba**, que es la regla que ya tienes escrita.
- Semáforo de caducidad según la etiqueta: 🧊 3 meses, ❄️ 3–4 días, huevos 5 días.
- Contador destacado: **almuerzos de reserva: 4** (verde entre 3 y 5).
- +/− de un toque; el botón *Cocinar* y el *sacar del congelador* de Hoy lo mueven solos.

### Semana (el planificador)
Lun–Vie + finde. Eliges receta por día (o **"rellenar"**: propone un menú que maximiza
bases compartidas y respeta que haya 1–2 platos 🌡️ fríos, sin repetir base tres días
seguidos). Al confirmar, la app calcula y genera tres cosas:

1. **Bases a preparar**, ya descontando lo que hay en el congelador
   (*"necesitas 5 porciones de B1, tienes 2 → haz una tanda"*).
2. **Sesión de cocina**: la tabla de minutos por horno / fuego 1 / fuego 2 / mesa,
   construida encadenando los tiempos de cada base. Modo **Exprés** y **Ampliada**,
   como en W40.
3. **Lista de la compra** agregada y agrupada **por tienda** (Mercadona / Carrefour ·
   Consum) y por pasillo (tarros, verdura, proteína y lácteos, despensa), sumando
   cantidades repetidas. Checklist con tachado, pensada para ir por el súper.

Cada semana se guarda; la de W40 entra como ejemplo.

### Ajustes
Tema, copia de seguridad (JSON con todo, automática/avisar/no, "compartir copia"),
objetivo de reserva del congelador, y los criterios fijos (ovolácteo, lentejas sí /
resto de legumbres solo finde) como filtros por defecto del buscador.

---

## 3. Modelo de datos

La distinción importante, y la que hace que la app se pueda actualizar sin miedo:

- **Catálogo** (bases, recetas, salsas): viene **dentro del código**, versionado con la
  app. Se actualiza al publicar.
- **Tus datos** (inventario, menús, compra, ajustes): `localStorage`, clave `comidas.v1`,
  con `schema` + `migrate()` y copias diarias, exactamente como Registrador.
  Solo guardan **ids** (`"T17"`, `"B6"`), nunca copias de la receta.

```js
Base   { id:"B1", nombre, prep, rinde:{porciones:10, gramos:100},
         conserv:"congela", recetas:[{id:"T1", porciones:1, anade:["lentejas","zanahoria"]}] }
Receta { id:"T17", nombre, tipo:"tupper", raciones:3, minutos:50,
         bases:[{id:"B6", porciones:1}], fresco:[...], anadirElDia:[...],
         etiquetas:["🔥","🧊"], congela:true, notas:"...", pasos:"..." }
Salsa  { id:"S3", nombre:"Cacahuete", conserv:{dias:7}, recetas:["T8","T15","T20","F10","F15"] }

// usuario
{ schema:1,
  inventario:[{id, ref:"B1", clase:"base", porciones:3, fecha:"2026-09-21", sitio:"cajón 1"}],
  menus:{"2026-W40":{lun:"T1", mar:"T3", ...,  finde:["F1","F2"]}},
  compra:{"2026-W40":[{texto:"5 tarros de lenteja", tienda:"mercadona", hecho:false}]},
  ajustes:{reservaObjetivo:[3,5], tema:"system"} }
```

El campo `fresco` merece estructura (`{ingrediente, cantidad, unidad, pasillo, tienda}`)
porque de él salen la lista de la compra agregada y el "qué me falta" del buscador.
Es el único trabajo de datos de verdad que hay que hacer una vez.

**Fuente de la verdad.** Propongo pasar el recetario a `datos/catalogo.json` y que los
`.md` de `recetario/` se generen desde ahí (o se queden como documentación congelada).
Mantener las dos cosas a mano se desincroniza a la segunda semana.

---

## 4. Técnica

Igual que Registrador, y por las mismas razones: `index.html` único, sin dependencias,
`manifest.webmanifest` + `sw.js` (red primero, caché de respaldo) para instalarla desde
Chrome en Android y abrirla sin cobertura, GitHub Pages desde `main`, y `tests/` con
`gjs` para la lógica que duele si se rompe: el cálculo de bases faltantes, la agregación
de la compra, el descuento de inventario y `migrate()`.

## 5. Por dónde empezar

1. `datos/catalogo.json` con las 10 bases, 29 tuppers, 19 findes y 6 salsas ya escritos.
2. Recetario + fichas + navegación bases ↔ recetas (ya es útil solo con esto en el móvil).
3. **Qué puedo hacer** con las bases marcadas a mano.
4. Inventario, y que alimente al buscador.
5. Semana → bases a preparar + lista de la compra.
6. Sesión de cocina (lo más complejo y lo último; hasta entonces, texto libre).

## 6. Dos decisiones abiertas

- **¿Catálogo editable desde el móvil?** Si un día quieres añadir T30 desde el sofá, hay
  que meter las recetas en `localStorage` y la actualización se complica (fusionar
  catálogo nuevo con el tuyo). Mi recomendación: **no** al principio — recetas en el
  código, y añadir desde el portátil.
- **¿Generar el menú automáticamente?** Empezar eligiendo a mano, con el "rellenar"
  como sugerencia que se puede ignorar. Un optimizador que decide por ti la semana
  entera se desobedece el primer martes.
