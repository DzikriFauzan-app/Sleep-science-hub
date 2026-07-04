import os

CHANGELOG = []

def safe_replace(filepath, old, new, label):
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    count = content.count(old)
    if count == 0:
        print(f"   - not found: {label}")
        return
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK [{filepath}] {label}")
    CHANGELOG.append(filepath)


# why-3am-wake: align og:title with shortened <title> tag
safe_replace(
    "blog/why-3am-wake.html",
    '<meta property="og:title" content="Why Do I Wake Up Wide Awake at 3 AM? The Science of Midnight Rest" />',
    '<meta property="og:title" content="Why You Wake Up Wide Awake at 3 AM | Sleep Science Hub" />',
    "Align og:title with <title> tag"
)

# Also check twitter:title
safe_replace(
    "blog/why-3am-wake.html",
    '<meta name="twitter:title" content="Why Do I Wake Up Wide Awake at 3 AM? The Science of Midnight Rest" />',
    '<meta name="twitter:title" content="Why You Wake Up Wide Awake at 3 AM" />',
    "Align twitter:title with <title> tag"
)

print(f"\nFiles modified: {len(CHANGELOG)}")
