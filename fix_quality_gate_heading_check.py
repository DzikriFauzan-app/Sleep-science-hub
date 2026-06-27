import re

with open("quality_gate.py", "r", encoding="utf-8") as f:
    content = f.read()

old = '''    "Related Reads": "Missing the 'Related Reads' internal linking section.",'''

if old not in content:
    print("⚠️  Exact line not found — checking for already-patched version")
else:
    content = content.replace(old, "")
    print("✅ Removed 'Related Reads' from REQUIRED_SNIPPETS dict")

# Add a dedicated multi-variant check instead, inserted right after the
# REQUIRED_SNIPPETS loop in check_file()
marker = '''    for snippet, reason in REQUIRED_SNIPPETS.items():
        if snippet not in content:
            failures.append(f"MISSING REQUIRED ELEMENT: '{snippet}' — {reason}")'''

addition = '''    for snippet, reason in REQUIRED_SNIPPETS.items():
        if snippet not in content:
            failures.append(f"MISSING REQUIRED ELEMENT: '{snippet}' — {reason}")

    # Internal linking section heading varies across articles ("Related Reads"
    # on newer articles, "Continue Reading Sleep Physiology Research" on
    # older ones) — accept either variant.
    internal_link_headings = ["Related Reads", "Continue Reading Sleep Physiology Research"]
    if not any(h in content for h in internal_link_headings):
        failures.append(
            "MISSING REQUIRED ELEMENT: internal linking section — "
            f"expected one of {internal_link_headings}."
        )'''

if marker in content:
    content = content.replace(marker, addition)
    print("✅ Added flexible internal-linking-heading check")
else:
    print("⚠️  Could not find insertion marker — manual check needed")

with open("quality_gate.py", "w", encoding="utf-8") as f:
    f.write(content)
