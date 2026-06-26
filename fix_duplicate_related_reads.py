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


F = "blog/chronotype-circadian-misalignment.html"

duplicate_block = '''  <!-- Related Reads Section -->
  <section class="mt-12 border-t border-slate-800 pt-8 max-w-2xl mx-auto px-4">
    <h3 class="text-xl font-bold text-slate-200 mb-4">Related Reads</h3>
    <ul class="space-y-2 list-disc pl-5 text-sky-400">
      <li><a href="why-3am-wake.html" class="hover:underline">Understanding the 3:00 AM Awakening Loop</a></li>
      <li><a href="glymphatic-system.html" class="hover:underline">The Glymphatic System and Deep Sleep Quality</a></li>
    </ul>
  </section>
'''

safe_replace(
    F,
    duplicate_block,
    "",
    "Remove duplicate orphan 'Related Reads' section after scripts"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
