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

if [[ "${FORCE_BUILD:-0}" == "1" ]]; then
  echo "FORCE_BUILD=1, running production build..."
  node scripts/next-build-with-progress.mjs
elif [[ "${SKIP_BUILD:-0}" == "1" ]]; then
  echo "SKIP_BUILD=1, skipping build and reusing current .next output."
elif [[ -f ".next/BUILD_ID" ]]; then
  echo "Found existing .next build, skipping rebuild for faster startup."
else
  echo "No existing .next build found, running production build..."
  node scripts/next-build-with-progress.mjs
fi

exec npx next start -p "$PORT"
