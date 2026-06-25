#!/bin/bash

echo "=== TITLE ==="
grep -o "<title>.*</title>" *.html blog/*.html

echo
echo "=== MISSING META DESCRIPTION ==="
grep -L "meta name=\"description\"" *.html blog/*.html

echo
echo "=== MISSING CANONICAL ==="
grep -L "rel=\"canonical\"" *.html blog/*.html

echo
echo "=== MISSING FAQ SCHEMA ==="
grep -L "FAQPage" blog/*.html

echo
echo "=== MISSING AUTHOR ==="
grep -L "author" *.html blog/*.html

echo
echo "=== AFFILIATE LINKS ==="
grep -R "nofollow sponsored" .

echo
echo "=== EXTERNAL LINKS WITHOUT REL ==="
grep -R "target=\"_blank\"" . | grep -v "noopener"

echo
echo "=== MEDICAL RISK WORDS ==="
grep -R -i -E "cure|treat|prevent|guarantee|diagnose|forces|causes|will" blog/

echo
echo "=== MISSING DISCLOSURE ==="
grep -L "educational" blog/*.html

echo
echo "Audit complete."
