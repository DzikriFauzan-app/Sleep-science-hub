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


F = "blog/index.html"

safe_replace(
    F,
    '<span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">🆕 NEW RESEARCH</span>',
    '<span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">🧬 CIRCADIAN BIOLOGY</span>',
    "Fix card tag to match site style"
)

safe_replace(
    F,
    '<h2 class="text-lg font-bold text-white mb-2 tracking-tight">Chronotype Circadian Misalignment: Why Late-Phase Profiles Encounter Sleep Maintenance Vulnerability Near 3:00 AM</h2>',
    '<h2 class="text-lg font-bold text-white mb-2 tracking-tight">Chronotype Misalignment & Midnight Arousal</h2>',
    "Shorten card title"
)

safe_replace(
    F,
    '<p class="text-slate-400 text-xs leading-relaxed mb-4">An educational analysis exploring genetic chronotypes, social jetlag, phase delays, and how intrinsic core body temperature cycles can...</p>',
    '<p class="text-slate-400 text-xs leading-relaxed mb-4">How genetic night-owl chronotypes and core temperature phase delays can set the stage for 3 AM fragmentation.</p>',
    "Shorten card description"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
