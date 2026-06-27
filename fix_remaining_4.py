import os

CHANGELOG = []

def safe_replace(filepath, old, new, label):
    if not os.path.exists(filepath):
        print(f"SKIP (file not found): {filepath}")
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
    print(f"OK [{filepath}] {label} -- {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))


safe_replace(
    "blog/hypoglycemia-sleep-maintenance.html",
    "<title>The Nighttime Sugar Drop: How Missing Liver Fuel Impacts Mid-Sleep Awakenings | Sleep Science Hub</title>",
    "<title>Blood Sugar, Liver Glycogen, and 3 AM Waking</title>",
    "Shorten hypoglycemia title"
)

safe_replace(
    "blog/why-3am-wake.html",
    "<title>Why Do I Wake Up Wide Awake at 3 AM? The Connection Between Stress, Food, and Your Sleep Cycle | Sleep Science Hub</title>",
    "<title>Why You Wake Up Wide Awake at 3 AM</title>",
    "Shorten why-3am-wake title"
)
safe_replace(
    "blog/why-3am-wake.html",
    'content="Discover why you may wake up wide awake at 3 AM. Learn how daily stress patterns, evening food choices, and natural sleep stage transitions can interact to disrupt midnight rest."',
    'content="Why so many people wake up alert around 3 AM, and the everyday habits behind it."',
    "Shorten why-3am-wake meta description"
)

safe_replace(
    "blog/glymphatic-system.html",
    'content="Discover how the glymphatic system cleans your brain during deep sleep. Learn how missing slow-wave rest can cause metabolic waste to pool and trigger 3 AM alert awakenings."',
    'content="How your brain'"'"'s glymphatic waste-clearance system works during sleep, and its link to nighttime waking."',
    "Shorten glymphatic meta description"
)

safe_replace(
    "index.html",
    'content="Irregular sleep patterns and circadian disruption affect millions. Discover the science behind middle-of-the-night waking and proven strategies to restore your natural sleep rhythm."',
    'content="The science behind middle-of-the-night waking, and practical strategies to restore natural sleep."',
    "Shorten homepage meta description"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
