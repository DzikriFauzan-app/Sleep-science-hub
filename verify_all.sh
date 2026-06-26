#!/data/data/com.termux/files/usr/bin/bash

for f in blog/*.html
do
    echo
    echo "================================"
    echo "$f"
    echo "================================"

    python3 citation_verifier.py "$f"
done
