import os

CHANGELOG = []

def safe_replace(filepath, old, new, label):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    count = content.count(old)
    if count == 0:
        print(f"   - [{filepath}] pattern not found for: {label}")
        return
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK [{filepath}] {label} -- {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))


F = "blog/hypoglycemia-sleep-maintenance.html"

old_block = '''            <p class="mt-4 text-[11px] text-sky-400/90 font-semibold tracking-wide flex items-center gap-1.5 justify-center sm:justify-start">
              🟢 <span class="sleep-quiz-audit-count">1,204</span> audits completed • Avg. completion 47s
            </p>
'''

safe_replace(F, old_block, "", "Remove fake audit counter (no 'Auro-Signal' text variant)")

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
