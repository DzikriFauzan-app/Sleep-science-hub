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
    "about.html",
    "<title>About Sleep Science Hub — Evidence-Based Circadian Health Expertise</title>",
    "<title>About Sleep Science Hub | Mark, Sleep Research Writer</title>",
    "Shorten about.html title (67->48 chars)"
)
safe_replace(
    "about.html",
    'content="Sleep Science Hub distills peer-reviewed research and clinical insights into clear, practical, evidence-based guidance to help you fix disrupted sleep and master your circadian rhythm."',
    'content="How Sleep Science Hub turns peer-reviewed sleep research into clear, practical guidance for better rest."',
    "Shorten about.html meta description (184->106 chars)"
)

safe_replace(
    "blog/adenosine-sleep-pressure.html",
    "<title>The Purinergic Sleep Drive: How Adenosine and Caffeine Govern Midnight Rest Continuity | Sleep Science Hub</title>",
    "<title>Adenosine, Caffeine, and Why You Wake at 3 AM</title>",
    "Shorten adenosine title (106->50 chars)"
)
safe_replace(
    "blog/adenosine-sleep-pressure.html",
    'content="Explore how adenosine accumulation drives homeostatic sleep pressure. Learn how caffeine receptor blockade disrupts this timing loop and triggers 3 AM awakenings."',
    'content="How adenosine builds sleep pressure, and how late caffeine can disrupt it and trigger 3 AM awakenings."',
    "Shorten adenosine meta description (162->109 chars)"
)

safe_replace(
    "blog/chronotype-circadian-misalignment.html",
    "<title>Chronotype Circadian Misalignment and Midnight Arousal | Sleep Science Hub</title>",
    "<title>Chronotype Misalignment and Midnight Waking</title>",
    "Shorten chronotype title (74->47 chars)"
)
safe_replace(
    "blog/chronotype-circadian-misalignment.html",
    'content="An educational analysis exploring genetic chronotypes, social jetlag, phase delays, and how intrinsic core body temperature cycles can prompt sudden 3:00 AM awakenings."',
    'content="How genetic chronotypes, social jetlag, and core temperature timing can lead to 3 AM awakenings."',
    "Shorten chronotype meta description (168->103 chars)"
)

safe_replace(
    "blog/cortisol-hpa-axis-awakening.html",
    "<title>Nocturnal Cortisol Resurgence and HPA-Axis Hyper-Reactivity | Sleep Science Hub</title>",
    "<title>Cortisol and HPA-Axis Activity Behind 3 AM Waking</title>",
    "Shorten cortisol title (79->53 chars)"
)
safe_replace(
    "blog/cortisol-hpa-axis-awakening.html",
    'content="An educational analysis exploring the relationship between daytime stress tracking, midnight hypothalamic-adrenal axis activation, and early morning sleep fragmentation."',
    'content="How daytime stress and HPA-axis activity can shift cortisol release into the middle of the night."',
    "Shorten cortisol meta description (169->104 chars)"
)

safe_replace(
    "blog/glymphatic-system.html",
    "<title>Glymphatic System: How Sleep Cleans Your Brain and Governs Midnight Awakenings | Sleep Science Hub</title>",
    "<title>The Glymphatic System and Why You Wake at 3 AM</title>",
    "Shorten glymphatic title (98->51 chars)"
)

safe_replace(
    "blog/hypoglycemia-sleep-maintenance.html",
    "<title>The Nighttime Sugar Drop: How Missing Liver Fuel Impacts Mid-Sleep Awakening | Sleep Science Hub</title>",
    "<title>Blood Sugar, Liver Glycogen, and 3 AM Waking</title>",
    "Shorten hypoglycemia title (97->50 chars)"
)

safe_replace(
    "blog/orexin-wake-stabilizer.html",
    "<title>Hypothalamic Orexin Regulation: Central Wake Stabilization and Midnight Awakening Cascades | Sleep Science Hub</title>",
    "<title>Orexin, the Sleep-Wake Switch, and Midnight Waking</title>",
    "Shorten orexin title (110->57 chars)"
)

safe_replace(
    "blog/why-3am-wake.html",
    "<title>Why Do I Wake Up Wide Awake at 3 AM? The Connection Between Stress, Food, and Sleep Cycles | Sleep Science Hub</title>",
    "<title>Why You Wake Up Wide Awake at 3 AM</title>",
    "Shorten why-3am-wake title (114->40 chars)"
)
safe_replace(
    "blog/why-3am-wake.html",
    'content="An educational analysis exploring why millions experience alert awakenings during the middle of the night window, mapping everyday lifestyle habits."',
    'content="Why so many people wake up alert around 3 AM, and the everyday habits behind it."',
    "Shorten why-3am-wake meta description (178->86 chars)"
)

safe_replace(
    "index.html",
    "<title>Sleep Science Hub — Waking Up at 3 AM? The Real Reason You Can't Stay Asleep</title>",
    "<title>Sleep Science Hub: Why You Wake Up at 3 AM</title>",
    "Shorten homepage title (76->49 chars)"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
