#!/data/data/com.termux/files/usr/bin/bash

echo "=== POSSIBLE DIAGNOSTIC CLAIMS ==="
grep -RinE \
"diagnose|diagnosis|exact cause|exact blocker|clinical|treat|cure|reverse|heal" .

echo
echo "=== POSSIBLE FAKE SOCIAL PROOF ==="
grep -RinE \
"audits completed|customers|users|reviews|people helped" .

echo
echo "=== STRONG MEDICAL CLAIMS ==="
grep -RinE \
"causes|forces|prevents|eliminates|stops|fixes" .

echo
echo "=== AFFILIATE LINKS ==="
grep -Rin "sponsored" .

echo
echo "=== AUTHOR REFERENCES ==="
grep -Rin "Mark" .

echo
echo "=== DISCLAIMERS ==="
grep -RinE \
"educational|medical advice|doctor|physician" .
