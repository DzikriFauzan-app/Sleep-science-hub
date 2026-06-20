#!/bin/bash
set -e

# ambil 2 deploy terakhir
DEPLOYS=($(git log --grep="^deploy:" --format="%H" -n 2))

if [ ${#DEPLOYS[@]} -lt 2 ]; then
  echo "❌ Belum ada deploy sebelumnya untuk rollback"
  exit 1
fi

BAD=${DEPLOYS[0]}
GOOD=${DEPLOYS[1]}

echo ">> Tagging bad deploy..."
git tag bad-$(date +%H%M) $BAD

echo ">> Rolling back to previous good deploy: $(git log -1 --oneline $GOOD)"
git push origin $GOOD:gh-pages --force
git push origin $GOOD:dev-upgrade --force

echo "✅ Rollback complete (no history rewrite on dev-upgrade)"
