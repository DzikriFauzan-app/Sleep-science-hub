#!/bin/bash
# hapus semua ld+json
sed '/<script type="application\/ld+json">/,/<\/script>/d' index.html > index.tmp
# insert
awk -v json="$(cat .seo/output-ld.json | tr -d '\n')" '
  /<\/head>/ {print "<script type=\"application/ld+json\">" json "</script>"}
  {print}
' index.tmp > index.html
rm index.tmp
