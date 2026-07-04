import os
import re
import glob

OLD_DOMAIN = "https://dzikrifauzan-app.github.io/Sleep-science-hub"
NEW_DOMAIN = "https://circadianblueprint.com"

CHANGELOG = []

files = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    content = content.replace(OLD_DOMAIN, NEW_DOMAIN)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        count = original.count(OLD_DOMAIN)
        print(f"OK [{filepath}] {count} replacement(s)")
        CHANGELOG.append(filepath)
    else:
        print(f"-- [{filepath}] no changes")

print(f"\n{'='*60}")
print(f"TOTAL FILES MODIFIED: {len(CHANGELOG)}")
print("="*60)
