import os
import re
import glob

CHANGELOG = []

PATTERN = re.compile(
    r'<p class="mt-4[^"]*"[^>]*>\s*Auro-Signal:.*?audits completed.*?</p>\s*',
    re.DOTALL
)

def safe_replace(filepath, pattern, replacement, label):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content, count = pattern.subn(replacement, content)

    if count == 0:
        return 0

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"OK [{filepath}] {label} -- {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))
    return count


files = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))

total = 0
for filepath in files:
    total += safe_replace(filepath, PATTERN, "", "Remove fake 'Auro-Signal' audit counter")

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {total}")
print("=" * 60)
