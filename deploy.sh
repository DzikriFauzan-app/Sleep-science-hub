#!/bin/bash
set -e
echo ">> cek hash..."
CURRENT=$(sha256sum index.html | awk '{print $1}')
BASE=$(awk '{print $1}' .hash-index.lock)
if [ "$CURRENT" != "$BASE" ]; then
  echo "❌ DRIFT DETECTED! index.html berubah tanpa lock"
  echo "current: $CURRENT"
  echo "locked : $BASE"
  exit 1
fi
echo "✅ hash OK ($CURRENT)"
echo ">> push ke gh-pages..."
git push origin dev-upgrade:gh-pages --force
echo ">> deploy selesai - cek dalam 5 detik:"
echo "https://dzikrifauzan-app.github.io/Sleep-science-hub/?v=$(date +%s)"

# VALIDATION GATE
./.seo/validate.sh || exit 1
