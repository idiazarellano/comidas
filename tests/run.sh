#!/bin/sh
# Pruebas de la lógica del catálogo. Necesita gjs (viene con GNOME).
cd "$(dirname "$0")/.." || exit 1
exec gjs -c "$(cat datos/catalogo.js tests/tests.js)"
