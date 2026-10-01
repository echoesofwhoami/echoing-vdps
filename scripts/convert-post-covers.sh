#!/usr/bin/env bash
# Rasterize per-post cover SVGs to 1200×675 PNGs for og:image / social embeds.
# Source: public/images/posts/<slug>.svg
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/images/posts"

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "error: rsvg-convert not found (install librsvg)" >&2
  exit 1
fi

mkdir -p "$DIR"

shopt -s nullglob
svgs=("$DIR"/*.svg)
if ((${#svgs[@]} == 0)); then
  echo "no post cover SVGs in $DIR"
  exit 0
fi

for f in "${svgs[@]}"; do
  base="$(basename "$f" .svg)"
  out="$DIR/${base}.png"
  rsvg-convert -w 1200 -h 675 "$f" -o "$out"
  echo "wrote $out"
done
