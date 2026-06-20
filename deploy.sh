#!/bin/bash
set -e
echo ">> Building..."
./.seo/build.sh

echo ">> Updating hash lock..."
sha256sum index.html | awk '{print $1}' > .hash-index.lock

echo ">> Committing..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')" || echo "nothing to commit"

echo ">> Pushing to gh-pages..."
git push origin dev-upgrade:gh-pages
echo "✅ Deploy complete"
