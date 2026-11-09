#!/usr/bin/env bash
# Garantiza que el daemon de Docker esté disponible antes de build/run.
#
# Idempotente: si `docker info` ya responde, no toca nada. Si no responde e
# instalar Colima está disponible, ejecuta `colima start` y espera a que el
# daemon quede listo. Si Colima no está instalado o falla al iniciar, muestra un
# mensaje claro y sale con código != 0.
#
# En la máquina solo se asume git y docker (+ Colima como backend del daemon en
# macOS); todo lo demás corre en el contenedor.
set -euo pipefail

if docker info >/dev/null 2>&1; then
  exit 0
fi

echo "→ El daemon de Docker no responde. Intentando iniciar Colima…"

if ! command -v colima >/dev/null 2>&1; then
  cat >&2 <<'EOF'
✗ Docker no está corriendo y Colima no está instalado.

  En macOS, instala Colima y vuelve a intentar:
      brew install colima docker

  O arranca tu daemon de Docker (Docker Desktop, WSL) manualmente.
EOF
  exit 1
fi

if colima status >/dev/null 2>&1; then
  echo "→ Colima reporta estar activo; esperando a que el daemon responda…"
else
  echo "→ Arrancando Colima (colima start)…"
  if ! colima start; then
    echo "✗ 'colima start' falló. Revisa 'colima status'." >&2
    exit 1
  fi
fi

for _ in $(seq 1 30); do
  if docker info >/dev/null 2>&1; then
    echo "✓ Docker listo."
    exit 0
  fi
  sleep 2
done

echo "✗ El daemon de Docker no respondió tras 60 s. Revisa 'docker info'." >&2
exit 1
