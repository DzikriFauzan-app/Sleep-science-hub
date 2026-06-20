#!/bin/bash
set -e
./.seo/validate.sh
python3 .seo/inject.py > .seo/output-ld.json
echo ">> Inject ready (output-ld.json)"
