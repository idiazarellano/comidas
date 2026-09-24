# Comidas

Aplicación web para gestionar los almuerzos de tupper de la semana: qué bases hay
hechas, qué recetas permiten, qué toca cocinar el domingo y qué hay que comprar.

Ovolácteo vegetariano · sin legumbres entre semana salvo lentejas · batch cooking
por componentes. Los criterios completos están en `recetario/README.md`.

## La idea

El recetario es un grafo: **bases → recetas**. La app lo recorre en los dos sentidos
y lo cruza con lo que hay en el congelador.

```
Despensa (lo que hay) → Bases disponibles → Recetas posibles → Menú → Compra
      ↑                                                          │
      └──────────────── cocinar consume / repone ────────────────┘
```

## Pantallas

- **Hoy**: el plato del día con 🔥 calentar / 🌡️ frío, el checklist de lo que hay que
  añadir el mismo día (el huevo de T1, el pepino de T15, la salsa de yogur de T14),
  el contador de almuerzos de reserva y lo que está a punto de caducar.
- **Cocinar**: se marcan las bases que hay (arrancan marcadas según la despensa, pero
  se pueden tocar para simular) y salen las recetas en tres grupos: **listas**,
  **te falta una base** (diciendo cuál) y el resto. Filtros por tupper/finde, 🌡️ frío,
  🧊 congela, ≤20 min y ★ favoritas.
- **Semana**: se eligen los cinco almuerzos y los dos platos del finde. De ahí salen
  solas las **bases a preparar** (descontando lo que ya hay), la **sesión de cocina**
  y la **lista de la compra** agregada por pasillos.
- **Despensa**: lotes con porciones y fecha, semáforo de caducidad por etiqueta
  (🧊 3 meses, ❄️ 3–4 días, huevos 5 días) y consumo del lote más antiguo primero.
- **Recetario**: las 48 recetas, las 9 bases y las 6 salsas, con sus avisos de
  conservación.

## Favoritos y ediciones

La estrella marca favoritas; el filtro ★ las aísla y en los desplegables de la semana
salen las primeras.

Las recetas se pueden **editar** (nombre, raciones, tiempo, pasos, ingredientes,
"el mismo día", aviso de conservación) pero no crear. Cada edición se guarda como un
**parche** sobre la receta original, solo con los campos que cambian, así que
actualizar la app no la pisa y "Restaurar" siempre devuelve el original.

## Archivos

- `index.html`: toda la aplicación.
- `datos/catalogo.js`: el recetario — 9 bases, 29 tuppers, 19 findes y 6 salsas, con
  cantidades y pasillo de compra de cada ingrediente. Es la fuente de la verdad.
- `recetario/`: los documentos originales en Markdown, de los que salió el catálogo.
- `tests/`: comprobaciones del catálogo (referencias cruzadas entre recetas, bases y
  salsas; que ningún tupper lleve garbanzos o alubias; que nada marcado "congela"
  dependa de huevo cocido). Se ejecutan con `tests/run.sh`, que necesita `gjs`.
  `tests/raciones.py` estima peso, kcal y proteína por ración para comparar recetas
  (referencia aproximada: 400–550 kcal por tupper; 1 tarro de lentejas da para 3).
- `manifest.webmanifest`, `sw.js`, `icon-*.png`: lo que la hace instalable y capaz de
  abrirse sin conexión.
- `PROPUESTA.md`: el diseño del que salió todo esto.

## Publicar

Se sirve desde GitHub Pages, rama `main`, raíz del repositorio.

```bash
cd ~/Personal/Apps/Comidas
./tests/run.sh
git add -A && git commit -m "descripción del cambio" && git push
```

GitHub Pages tarda uno o dos minutos. En el móvil, cerrar y abrir la app la recarga.

## Instalar en el móvil

1. Abrir la dirección de GitHub Pages en Chrome (Android).
2. Menú ⋮ → "Instalar aplicación".

## Dónde viven los datos

En el navegador (`localStorage`, clave `comidas.v1`), ligados a la dirección desde la
que se abre la app. Solo guardan **ids** (`"T17"`, `"B6"`): favoritos, despensa,
menús, lista de la compra, ediciones y ajustes. El recetario va en el código, de modo
que publicar una versión nueva actualiza las recetas sin tocar nada de lo anterior.

`migrate()` en `index.html` (la función `migrar`) convierte estructuras antiguas a la
actual; cualquier cambio de formato se añade ahí.

La copia de seguridad es texto: Ajustes → Copiar, y se pega donde se quiera. Para
restaurar, "Restaurar desde texto".

## Añadir una receta

Se añade a mano en `datos/catalogo.js`, siguiendo la forma de las que ya están, y se
ejecuta `./tests/run.sh` antes de publicar. Una receta necesita id, nombre, tipo,
raciones, minutos, `bases`, `fresco` (con pasillo) y `pasos`; `alDia` para lo que se
añade el mismo día y `nota` para el aviso de conservación. Para comprobar que la ración
es razonable, añádela también a `tests/raciones.py` y ejecútalo.
