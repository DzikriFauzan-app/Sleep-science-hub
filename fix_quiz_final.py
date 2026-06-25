import os

CHANGELOG = []

def safe_replace(filepath, old, new, label):
    if not os.path.exists(filepath):
        print(f"⚠️  SKIP (file not found): {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    count = content.count(old)
    if count == 0:
        print(f"   - [{filepath}] pattern not found for: {label}")
        return
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ [{filepath}] {label} — {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))


F = "quiz.html"

# Remaining GPCR/receptor drug-like claim (core mechanism claim unchanged
# despite earlier wording softening)
safe_replace(
    F,
    "you can introduce high-potency, clean nutritional precursors that directly target your G-protein coupled receptors to suppress nocturnal cortisol spikes",
    "supporting your body's natural evening relaxation response may help calm an overactive stress signal",
    "Remove remaining GPCR/receptor drug-like claim"
)
safe_replace(
    F,
    "We recommend implementing an sleep support routine utilizing the molecular elements found inside Yu Sleep.",
    "We recommend trying an evening relaxation routine, alongside supportive ingredients like the ones found in Yu Sleep.",
    "Fix grammar + soften 'molecular elements' framing"
)

# Fake clinical audit label
safe_replace(
    F,
    "⚠️ BIOMARKER AUDIT DISPATCH",
    "📋 YOUR RESULTS",
    "Remove fake clinical audit label"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
