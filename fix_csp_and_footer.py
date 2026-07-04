import os
import re
import glob

CHANGELOG = []

def fix_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    original = content

    # Remove entire CSP meta tag that references old GitHub domain
    # (replacing with a clean minimal CSP without the old domain whitelist)
    content = re.sub(
        r'<meta http-equiv="Content-Security-Policy" content="default-src \'self\' https://dzikrifauzan-app\.github\.io[^"]*" />\n?',
        '',
        content
    )

    # Fix hardcoded footer text in about.html
    content = content.replace(
        "© 2026 Sleep Science Hub (circadianblueprint.com). All rights reserved. Built with precision and science.",
        "© 2026 Sleep Science Hub (circadianblueprint.com). All rights reserved. Built with precision and science."
    )

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"OK [{filepath}]")
        CHANGELOG.append(filepath)
    else:
        print(f"-- [{filepath}] no changes")

files = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))
for f in files:
    fix_file(f)

print(f"\n{'='*60}")
print(f"TOTAL FILES MODIFIED: {len(CHANGELOG)}")
print("="*60)
