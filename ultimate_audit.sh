#!/data/data/com.termux/files/usr/bin/bash

echo "=================================================="
echo "      SLEEP SCIENCE HUB ULTIMATE AUDIT (v2)"
echo "=================================================="

SCORE=100
FAIL=0

# Only ever scan real content files — never the audit scripts themselves
HTML_FILES=(*.html blog/*.html)

# Lines containing these hedge markers are excluded from risk-pattern
# matches below, since they've already been qualified appropriately.
HEDGE_FILTER='may |can |could |might |suggest|hypothes|associated with|some research|some studies|some individuals|tends to|frequently|typically|often'

echo
echo "[1] META DESCRIPTION"
missing=$(grep -L 'meta name="description"' "${HTML_FILES[@]}" 2>/dev/null)
if [ -n "$missing" ]; then
    echo "❌ Missing meta description:"
    echo "$missing"
    SCORE=$((SCORE-3)); FAIL=$((FAIL+1))
else
    echo "✅ All pages have description"
fi

echo
echo "[2] CANONICAL"
missing=$(grep -L 'rel="canonical"' "${HTML_FILES[@]}" 2>/dev/null)
if [ -n "$missing" ]; then
    echo "❌ Missing canonical:"
    echo "$missing"
    SCORE=$((SCORE-3)); FAIL=$((FAIL+1))
else
    echo "✅ Canonical present"
fi

echo
echo "[3] AUTHOR"
missing=$(grep -L '"author"' "${HTML_FILES[@]}" 2>/dev/null)
if [ -n "$missing" ]; then
    echo "⚠ Missing author schema:"
    echo "$missing"
    SCORE=$((SCORE-2)); FAIL=$((FAIL+1))
else
    echo "✅ Author found"
fi

echo
echo "[4] MEDICAL DISCLAIMER"
count=$(grep -ilE 'medical advice|informational purposes|consult your physician' "${HTML_FILES[@]}" 2>/dev/null | wc -l)
if [ "$count" -eq 0 ]; then
    echo "❌ No medical disclaimer"
    SCORE=$((SCORE-10)); FAIL=$((FAIL+1))
else
    echo "✅ Medical disclaimer present ($count file(s))"
fi

echo
echo "[5] ABSOLUTE/UNHEDGED MEDICAL CLAIMS"
# Specific multi-word red-flag combos only — not single common verbs.
matches=$(grep -RinE \
  'guarantee(s|d)? (a |to )?(cure|fix|relief)|completely (cures|eliminates|reverses)|100% (effective|guaranteed)|will (cure|reverse|eliminate)|permanently (cures|fixes|reverses)|instantly (cures|heals|fixes)' \
  "${HTML_FILES[@]}" 2>/dev/null | grep -viE "$HEDGE_FILTER")
if [ -n "$matches" ]; then
    echo "$matches"
    echo "❌ Unhedged absolute medical claim found"
    SCORE=$((SCORE-15)); FAIL=$((FAIL+1))
else
    echo "✅ No unhedged absolute claims"
fi

echo
echo "[6] GOOGLE SPAM / MARKETING HYPE"
# Removed generic words like "overnight" (core sleep vocabulary) and bare
# "instant"/"breakthrough" — now requires a spam-specific combination.
matches=$(grep -RinE \
  'miracle (cure|fix|solution)|secret (formula|trick|method)|click here now|buy now|act now|limited time offer|guaranteed results overnight' \
  "${HTML_FILES[@]}" 2>/dev/null)
if [ -n "$matches" ]; then
    echo "$matches"
    echo "❌ Spam/marketing wording found"
    SCORE=$((SCORE-8)); FAIL=$((FAIL+1))
else
    echo "✅ No spam wording"
fi

echo
echo "[7] OVERCONFIDENT CERTAINTY LANGUAGE (informational only)"
# Narrowed from generic words (must/always/never) which are normal English,
# to phrases that specifically overclaim scientific certainty.
matches=$(grep -RinE \
  'scientifically proven to|definitively proven|100% proven|clinically proven to (cure|fix|reverse)|always (cures|fixes|works)|never fails' \
  "${HTML_FILES[@]}" 2>/dev/null | grep -viE "$HEDGE_FILTER")
if [ -n "$matches" ]; then
    echo "$matches"
    echo "⚠ Overconfident certainty language found (review, not auto-penalized)"
else
    echo "✅ No overconfident certainty language"
fi

echo
echo "[8] AFFILIATE DISCLOSURE"
if grep -liq "affiliate" "${HTML_FILES[@]}" 2>/dev/null; then
    if grep -liqE 'affiliate disclosure|may earn (a |an )?commission' "${HTML_FILES[@]}" 2>/dev/null; then
        echo "✅ Affiliate disclosure found"
    else
        echo "❌ Affiliate disclosure missing"
        SCORE=$((SCORE-8)); FAIL=$((FAIL+1))
    fi
else
    echo "No affiliate detected"
fi

echo
echo "[9] REL ATTRIBUTES ON EXTERNAL LINKS"
# FIXED: was scanning '.' (the whole repo, including this very script's
# source code, causing a false self-match). Now scoped to HTML files only.
bad=$(grep -RinE 'target="_blank"' "${HTML_FILES[@]}" 2>/dev/null \
  | grep -v 'noopener' \
  | grep -v 'noreferrer')
if [ -n "$bad" ]; then
    echo "$bad"
    echo "❌ External links missing rel attributes:"
    SCORE=$((SCORE-4)); FAIL=$((FAIL+1))
else
    echo "✅ Link security OK"
fi

echo
echo "[10] FAQ SCHEMA"
missing=$(grep -L 'FAQPage' blog/*.html 2>/dev/null)
if [ -n "$missing" ]; then
    echo "⚠ Missing FAQ schema:"
    echo "$missing"
else
    echo "✅ FAQ schema present on all blog articles"
fi

echo
echo "[11] RISKY MECHANISM-AS-FACT PHRASING (informational only)"
# Same narrowing logic as [5]/[7]: only flag verbs combined with an
# absolute modifier, not the bare verb (which is normal physiology prose).
matches=$(grep -RinE \
  'always (prevents|forces|causes|triggers)|will definitely (cause|trigger)|guarantees (a|an|the)' \
  blog/*.html 2>/dev/null | grep -viE "$HEDGE_FILTER")
if [ -n "$matches" ]; then
    echo "$matches"
    echo "⚠ Risky absolute mechanism phrasing found (review, not auto-penalized)"
else
    echo "✅ No risky absolute mechanism phrasing"
fi

echo
echo "[12] DOI LINKS"
doi=$(grep -R "doi.org" blog/*.html 2>/dev/null | wc -l)
articles_with_citations=$(grep -lR "doi.org" blog/*.html 2>/dev/null | wc -l)
total_articles=$(ls blog/*.html 2>/dev/null | grep -v index.html | wc -l)
echo "DOI links found: $doi (across $articles_with_citations of $total_articles articles)"
echo "ℹ Citation count is informational only — use citation_verifier.py to confirm validity."

echo
echo "[13] AUTHOR SOCIAL"
if grep -liq "threads.com" "${HTML_FILES[@]}" 2>/dev/null; then
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
    SCORE=$((SCORE-5)); FAIL=$((FAIL+1))
fi

echo
echo "[15] ROBOTS"
if [ -f robots.txt ]; then
    echo "✅ Robots exists"
else
    echo "❌ Missing robots"
    SCORE=$((SCORE-5)); FAIL=$((FAIL+1))
fi

echo
echo "=================================================="
echo "FINAL SCORE: $SCORE / 100"
echo "ISSUES (score-impacting): $FAIL"

if [ "$SCORE" -ge 95 ]; then
    echo "GRADE: A+"
elif [ "$SCORE" -ge 85 ]; then
    echo "GRADE: A"
elif [ "$SCORE" -ge 75 ]; then
    echo "GRADE: B"
else
    echo "GRADE: NEEDS WORK"
fi
echo "=================================================="
