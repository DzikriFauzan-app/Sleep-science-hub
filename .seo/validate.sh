#!/bin/bash
echo ">> Validasi JSON-LD..."
python3 -m json.tool .seo/schema-index.json > /dev/null && echo "✅ schema-index valid" || echo "❌ schema-index rusak"
grep -c "application/ld+json" index.html
grep -c "application/ld+json" blog/index.html
