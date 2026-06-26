#!/data/data/com.termux/files/usr/bin/bash

echo "=================================================="
echo "      SLEEP SCIENCE HUB ULTIMATE AUDIT"
echo "=================================================="

SCORE=100
FAIL=0

echo
echo "[1] META DESCRIPTION"
missing=$(grep -L 'meta name="description"' *.html blog/*.html 2>/dev/null)

if [ -n "$missing" ]; then
    echo "❌ Missing meta description:"
    echo "$missing"
    SCORE=$((SCORE-3))
    FAIL=$((FAIL+1))
else
    echo "✅ All pages have description"
fi

echo
echo "[2] CANONICAL"

missing=$(grep -L 'rel="canonical"' *.html blog/*.html 2>/dev/null)

if [ -n "$missing" ]; then
    echo "❌ Missing canonical:"
    echo "$missing"
    SCORE=$((SCORE-3))
else
    echo "✅ Canonical present"
fi

echo
echo "[3] AUTHOR"

missing=$(grep -L '"author"' *.html blog/*.html 2>/dev/null)

if [ -n "$missing" ]; then
    echo "⚠ Missing author schema:"
    echo "$missing"
    SCORE=$((SCORE-2))
else
    echo "✅ Author found"
fi

echo
echo "[4] MEDICAL DISCLAIMER"

count=$(grep -Ril "medical advice\|informational purposes\|consult your physician" . | wc -l)

if [ "$count" -eq 0 ]; then
    echo "❌ No medical disclaimer"
    SCORE=$((SCORE-10))
else
    echo "✅ Medical disclaimer present"
fi

echo
echo "[5] ABSOLUTE CLAIMS"

grep -RinE \
'cures|treats|prevents|reverses|heals|guarantees|eliminates|fixes|permanently' \
blog *.html 2>/dev/null

if [ $? -eq 0 ]; then
    echo "❌ Dangerous medical claim found"
    SCORE=$((SCORE-15))
else
    echo "✅ No dangerous claims"
fi

echo
echo "[6] GOOGLE SPAM"

grep -RinE \
'miracle|secret|instant|overnight|breakthrough|buy now|click here now' \
blog *.html 2>/dev/null

if [ $? -eq 0 ]; then
    echo "❌ Spam wording found"
    SCORE=$((SCORE-8))
else
    echo "✅ No spam wording"
fi

echo
echo "[7] YMYL WORDS"

grep -RinE \
'must|always|never|definitively|certainly|proven' \
blog/*.html 2>/dev/null

echo
echo "[8] AFFILIATE DISCLOSURE"

if grep -Riq "affiliate" blog *.html; then

    if grep -Riq "affiliate disclosure\|may earn commissions" .; then
        echo "✅ Affiliate disclosure found"
    else
        echo "❌ Affiliate disclosure missing"
        SCORE=$((SCORE-8))
    fi

else
    echo "No affiliate detected"
fi

echo
echo "[9] REL ATTRIBUTES"

bad=$(grep -Rin 'target="_blank"' . \
| grep -v 'noopener' \
| grep -v 'noreferrer')

if [ -n "$bad" ]; then
    echo "❌ External links missing rel:"
    echo "$bad"
    SCORE=$((SCORE-4))
else
    echo "✅ Link security OK"
fi

echo
echo "[10] FAQ SCHEMA"

missing=$(grep -L 'FAQPage' blog/*.html 2>/dev/null)

if [ -n "$missing" ]; then
    echo "⚠ Missing FAQ schema:"
    echo "$missing"
fi

echo
echo "[11] MEDICAL RISK PHRASES"

grep -RinE \
'prevents|forces|causes|triggers|will cause|guarantees' \
blog/*.html

echo
echo "[12] DOI LINKS"

doi=$(grep -R "doi.org" blog/*.html | wc -l)

echo "DOI links found: $doi"

if [ "$doi" -lt 10 ]; then
    echo "⚠ Low DOI count"
fi

echo
echo "[13] AUTHOR SOCIAL"

if grep -Riq "threads.com" .; then
    echo "✅ Author social found"
else
    echo "⚠ No author social"
fi

echo
echo "[14] SITEMAP"

if [ -f sitemap.xml ]; then
    echo "✅ Sitemap exists"
else
    echo "❌ Missing sitemap"
    SCORE=$((SCORE-5))
fi

echo
echo "[15] ROBOTS"

if [ -f robots.txt ]; then
    echo "✅ Robots exists"
else
    echo "❌ Missing robots"
    SCORE=$((SCORE-5))
fi

echo
echo "=================================================="
echo "FINAL SCORE: $SCORE / 100"
echo "ISSUES: $FAIL"

if [ "$SCORE" -ge 98 ]; then
    echo "GRADE: A+"
elif [ "$SCORE" -ge 95 ]; then
    echo "GRADE: A"
elif [ "$SCORE" -ge 90 ]; then
    echo "GRADE: B"
else
    echo "GRADE: NEEDS WORK"
fi

echo "=================================================="
