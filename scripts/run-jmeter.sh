#!/usr/bin/env bash
set -euo pipefail

JMX="${JMX:-Jmeter_orig/Test.jmx}"
OUT_DIR="${OUT_DIR:-artifacts/jmeter}"

mkdir -p "$OUT_DIR"

cmd.exe //c "C:\apache-jmeter-5.5\bin\jmeter.bat -n -t $JMX -l $OUT_DIR\\results.jtl -e -o $OUT_DIR\\HtmlReport"

