import re
import os

CHANGELOG = []

def safe_replace(filepath, old, new, label, is_regex=False):
    """Replace text in a file. Warns (doesn't crash) if pattern not found."""
    if not os.path.exists(filepath):
        print(f"⚠️  SKIP (file not found): {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if is_regex:
        new_content, count = re.subn(old, new, content, flags=re.DOTALL)
    else:
        count = content.count(old)
        new_content = content.replace(old, new)

    if count == 0:
        print(f"   - [{filepath}] pattern not found for: {label}")
        return

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ [{filepath}] {label} — {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))


# ============================================================
# FIX 1: Unify author identity to "Mark, Sleep Research Writer"
# ============================================================
safe_replace(
    "blog/glymphatic-system.html",
    "Mark D, Sleep Science Analyst",
    "Mark, Sleep Research Writer",
    "Unify glymphatic author persona"
)

safe_replace(
    "blog/orexin-wake-stabilizer.html",
    "Thoroughly Researched By Mark (Sleep Science Researcher)",
    "Reviewed by Mark, Sleep Research Writer",
    "Align orexin byline phrasing"
)
safe_replace(
    "blog/orexin-wake-stabilizer.html",
    'content="Mark"',
    'content="Mark, Sleep Research Writer"',
    "Align orexin meta author tag"
)

safe_replace(
    "index.html",
    'content="Mark Sleep Research Writer"',
    'content="Mark, Sleep Research Writer"',
    "Fix index.html meta author"
)
safe_replace(
    "index.html",
    '"name": "Mark Sleep Research Writer",',
    '"name": "Mark",',
    "Fix index.html JSON-LD name"
)
safe_replace(
    "index.html",
    "By Mark, Sleep Research Writer Sleep Research Writer",
    "By Mark, Sleep Research Writer",
    "Fix index.html duplicated byline text"
)
safe_replace(
    "index.html",
    "Reviewed by Mark Sleep Research Writer.",
    "Reviewed by Mark, Sleep Research Writer.",
    "Fix index.html footer byline"
)

for f in [
    "blog/adenosine-sleep-pressure.html",
    "blog/why-3am-wake.html",
    "blog/hypoglycemia-sleep-maintenance.html",
]:
    safe_replace(f, '"name": "Mark D"', '"name": "Mark"', "Fix residual JSON-LD name")


# ============================================================
# FIX 2: Domain mismatch in about.html footer
# ============================================================
safe_replace(
    "about.html",
    "© 2026 Sleep Science Hub (circadianblueprint.com). All rights reserved.",
    "© 2026 Sleep Science Hub. All rights reserved.",
    "Remove mismatched domain reference in about.html footer"
)


# ============================================================
# FIX 3: Misattributed PubMed citations in orexin-wake-stabilizer.html
# ============================================================
OREXIN_FILE = "blog/orexin-wake-stabilizer.html"

orexin_fixes = [
    (
        r'<a[^>]*href="https://pubmed\.ncbi\.nlm\.nih\.gov/25501484/?"[^>]*>([^<]*)</a>',
        "research",
        "Iliff misattribution (orexin projection mapping)"
    ),
    (
        r'<a[^>]*href="https://pubmed\.ncbi\.nlm\.nih\.gov/28849646/?"[^>]*>([^<]*)</a>',
        "some sleep physiology studies",
        "Holtzman misattribution (OX1R/OX2R down-regulation)"
    ),
    (
        r'<a[^>]*href="https://pubmed\.ncbi\.nlm\.nih\.gov/29339372/?"[^>]*>([^<]*)</a>',
        "general sleep medicine literature",
        "Deane misattribution (nutritional/lifestyle interventions)"
    ),
    (
        r'<a[^>]*href="https://pubmed\.ncbi\.nlm\.nih\.gov/26245963/?"[^>]*>([^<]*)</a>',
        "preliminary research",
        "Hedok Lee misattribution (orexin nutrition strategy)"
    ),
    (
        r'<a[^>]*href="https://pubmed\.ncbi\.nlm\.nih\.gov/22896675/?"[^>]*>([^<]*)</a>',
        "classic sleep neuroanatomy research",
        "Nedergaard misattribution (VLPO/GABA circuit mapping)"
    ),
]

for pattern, replacement, label in orexin_fixes:
    safe_replace(OREXIN_FILE, pattern, replacement, label, is_regex=True)

safe_replace(
    OREXIN_FILE,
    "requires targeted nutritional and lifestyle interventions to stabilize",
    "may benefit from targeted nutritional and lifestyle adjustments, according to general sleep medicine literature",
    "Hedge absolute claim about receptor destabilization fix"
)


# ============================================================
# FIX 4: Standardize quiz social-proof counter text (static copy only,
# NOT quiz.html or quiz-engine.js)
# ============================================================
AUDIT_COUNT_FILES = [
    "index.html",
    "blog/hypoglycemia-sleep-maintenance.html",
    "blog/glymphatic-system.html",
    "blog/adenosine-sleep-pressure.html",
    "blog/orexin-wake-stabilizer.html",
    "blog/why-3am-wake.html",
]
for f in AUDIT_COUNT_FILES:
    safe_replace(f, ">4,812</span>", ">1,204</span>", "Standardize audit counter (4,812 -> 1,204)")
    safe_replace(f, ">150</span>", ">1,204</span>", "Standardize audit counter (150 -> 1,204)")


# ============================================================
print("\n" + "=" * 60)
print(f"TOTAL FILES MODIFIED: {len(set(c[0] for c in CHANGELOG))}")
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
print("\nNOT TOUCHED (by design): quiz.html, assets/quiz-engine.js")
