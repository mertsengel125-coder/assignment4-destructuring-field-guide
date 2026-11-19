#!/usr/bin/env bash
# Arif Mert Şengel - 2024501012
set -eu
project_dir="$(cd "$(dirname "$0")/.." && pwd)"
cd "$project_dir"
compiler_bin="${TECTONIC_BIN:-tectonic}"
"$compiler_bin" -X compile --keep-logs --outdir latex latex/main.tex
