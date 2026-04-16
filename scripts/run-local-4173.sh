#!/usr/bin/env bash
# Production-style local server on :4173. Frees the port first if something is listening.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
PORT=4173

if lsof -ti ":$PORT" >/dev/null 2>&1; then
  echo "Port $PORT is in use; stopping listener(s)..."
  lsof -ti ":$PORT" | xargs kill -9 2>/dev/null || true
  sleep 0.5
  if lsof -ti ":$PORT" >/dev/null 2>&1; then
    echo "Error: port $PORT is still in use after kill." >&2
    exit 1
  fi
else
  echo "Port $PORT is free."
fi

node scripts/next-build-with-progress.mjs
exec npx next start -p "$PORT"
