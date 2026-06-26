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


# FIX 1: why-3am-wake.html — broken referent ("this surge") left dangling
# after an earlier softening pass removed the word "surge" from the
# preceding sentence, making the paragraph incoherent.
safe_replace(
    "blog/why-3am-wake.html",
    "When you consume sweet treats or high-carbohydrate snacks less than three hours before bed, blood glucose levels may fluctuate following late-evening nutrition. To clear this surge, insulin is released in large quantities. This insulin spike can inhibit your body's ability to burn fat as an alternative energy source at night, while potentially causing your glucose curve to fluctuate during early sleep hours while you are in your deepest sleep phase.",
    "When you consume sweet treats or high-carbohydrate snacks less than three hours before bed, blood glucose levels can rise sharply. To clear this surge, insulin is released in large quantities. This insulin spike can inhibit your body's ability to burn fat as an alternative energy source at night, and some researchers suggest it may contribute to a sharper glucose drop during your deepest sleep phase.",
    "Fix broken referent ('this surge') left dangling by earlier softening pass"
)

# FIX 2: hypoglycemia-sleep-maintenance.html — fabricated precision
# ("within less than a minute") with no supporting source.
safe_replace(
    "blog/hypoglycemia-sleep-maintenance.html",
    "If your late-evening eating routine accidentally drains these liver fuel stores early, your body fires off an emergency survival response that can cause you to wake up alert within less than a minute.",
    "If your late-evening eating routine accidentally drains these liver fuel stores early, your body can fire off an emergency survival response that may cause you to wake up alert before your sleep cycle completes.",
    "Remove fabricated 'within less than a minute' precision claim"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
