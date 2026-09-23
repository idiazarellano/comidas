// Pruebas de la lógica del catálogo. Se ejecutan con tests/run.sh (necesita gjs).
let fallos = 0, hechas = 0;
function ok(cond, msg) { hechas++; if (!cond) { fallos++; print("✗ " + msg); } }

const ids = new Set();
for (const r of CATALOGO.recetas) {
  ok(!ids.has(r.id), "id repetido: " + r.id); ids.add(r.id);
  ok(r.nombre && r.pasos, r.id + " sin nombre o sin pasos");
  ok(r.raciones > 0 && r.minutos > 0, r.id + " sin raciones o minutos");
  ok(r.tipo === "tupper" || r.tipo === "finde", r.id + " tipo raro");
  ok(r.tipo !== "tupper" || r.raciones === 3, r.id + " tupper debería dar 3 raciones");
  for (const b of r.bases || [])
    ok(CATALOGO.bases.some(x => x.id === b.id), r.id + " apunta a base inexistente " + b.id);
  for (const s of r.salsas || [])
    ok(CATALOGO.salsas.some(x => x.id === s), r.id + " apunta a salsa inexistente " + s);
  for (const f of r.fresco || [])
    ok(["tarros","verdura","proteina","despensa"].includes(f.p), r.id + " pasillo raro: " + f.n);
}

for (const b of CATALOGO.bases) {
  ok(b.porciones > 0 && b.minutos > 0, b.id + " sin rendimiento o tiempo");
  ok(["congela","nevera4","nevera5","nevera7","nevera14"].includes(b.conserv), b.id + " conserv rara");
  ok(["horno","fuego","mesa"].includes(b.puesto), b.id + " puesto raro");
  ok(CATALOGO.recetas.some(r => (r.bases || []).some(x => x.id === b.id)), b.id + " no la usa nadie");
  for (const u of b.usa || [])
    ok(CATALOGO.bases.some(x => x.id === u.id), b.id + " usa base inexistente " + u.id);
}

for (const s of CATALOGO.salsas)
  for (const rid of s.recetas)
    ok(ids.has(rid), s.id + " apunta a receta inexistente " + rid);

// Criterios del recetario: entre semana, solo lentejas
const PROHIBIDAS = ["garbanzo", "alubia", "judía blanca"];
for (const r of CATALOGO.recetas.filter(x => x.tipo === "tupper"))
  for (const f of r.fresco || [])
    ok(!PROHIBIDAS.some(p => f.n.toLowerCase().includes(p)),
       r.id + " es tupper y lleva legumbre de fin de semana: " + f.n);

// Congelado: nada marcado "congela" puede depender de huevo cocido (B7)
for (const r of CATALOGO.recetas.filter(x => x.congela))
  ok(!(r.bases || []).some(b => b.id === "B7"),
     r.id + " dice que congela pero lleva huevo cocido");

print(fallos ? `\n${fallos} fallos de ${hechas} comprobaciones` : `✓ ${hechas} comprobaciones, todo bien`);
if (fallos) imports.system.exit(1);
