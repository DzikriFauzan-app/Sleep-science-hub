import re, os

# Canonical identity strings — does NOT touch quiz-container, quiz.html, or quiz-engine.js
FIXES = {
    "blog/adenosine-sleep-pressure.html": [
        ('"name": "Mark D"', '"name": "Mark"'),
    ],
    "blog/why-3am-wake.html": [
        ('"name": "Mark D"', '"name": "Mark"'),
    ],
    "blog/hypoglycemia-sleep-maintenance.html": [
        ('"name": "Mark D"', '"name": "Mark"'),
    ],
    "index.html": [
        ('<meta name="author" content="Mark Sleep Research Writer" />',
         '<meta name="author" content="Mark, Sleep Research Writer" />'),
        ('"name": "Mark Sleep Research Writer",', '"name": "Mark",'),
        ('By Mark, Sleep Research Writer Sleep Research Writer',
         'By Mark, Sleep Research Writer'),
        ('Reviewed by Mark Sleep Research Writer.',
         'Reviewed by Mark, Sleep Research Writer.'),
    ],
}

EXCLUDED = ["quiz.html", "assets/quiz-engine.js"]

total_changes = 0
for filepath, replacements in FIXES.items():
    if not os.path.exists(filepath):
        print(f"⚠️  SKIP (not found): {filepath}")
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    file_changes = 0
    for old, new in replacements:
        count = content.count(old)
        if count == 0:
            print(f"   - pattern not found in {filepath}: {old[:50]}...")
            continue
        content = content.replace(old, new)
        file_changes += count
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ {filepath}: {file_changes} replacement(s) applied")
        total_changes += file_changes
    else:
        print(f"➖ {filepath}: no changes needed")

print(f"\nTotal changes applied: {total_changes}")
print(f"Excluded from this script (quiz-related, untouched): {EXCLUDED}")
