#!/usr/bin/env bash
set -euo pipefail

JMX="${JMX:-Jmeter_orig/Test.jmx}"
OUT_DIR="${OUT_DIR:-artifacts/jmeter}"

mkdir -p "$OUT_DIR"

docker run --rm \
 -v "$(pwd):/test" \
 -w /test \
 justb4/jmeter:5.5 \
 -n -t "$JMX" \
 -l "$OUT_DIR/results.jtl" \
 -e -o "$OUT_DIR/HtmlReport"
