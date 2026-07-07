import os
import re
import glob

CHANGELOG = []

def safe_replace(filepath, old, new, label):
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    count = content.count(old)
    if count == 0:
        print(f"   - not found: {label} in {filepath}")
        return
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK [{filepath}] {label}")
    CHANGELOG.append(filepath)


def inject_after(filepath, marker, injection, label):
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if injection.strip() in content:
        print(f"   - already present: {label} in {filepath}")
        return
    if marker not in content:
        print(f"   - marker not found: {label} in {filepath}")
        return
    content = content.replace(marker, marker + "\n" + injection)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK [{filepath}] {label}")
    CHANGELOG.append(filepath)


FAVICON_TAG = '  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />'
APPLE_TAG   = '  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />'
MANIFEST_TAG= '  <link rel="manifest" href="/site.webmanifest" />'

# === FIX 1: Add favicon/apple-touch-icon/manifest to all pages missing them ===
all_html = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))

for filepath in all_html:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine correct relative path for blog/ subdirectory
    is_blog = filepath.startswith("blog/")
    favicon  = '  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />' if is_blog else FAVICON_TAG
    apple    = '  <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png" />' if is_blog else APPLE_TAG
    manifest = '  <link rel="manifest" href="../site.webmanifest" />' if is_blog else MANIFEST_TAG

    # Skip if already has favicon (about.html and quiz.html already have it)
    if 'rel="icon"' not in content:
        inject_after(filepath, "  <meta charset=\"UTF-8\" />", favicon, "Add favicon")

    if 'apple-touch-icon' not in content:
        inject_after(filepath, "  <meta charset=\"UTF-8\" />", apple, "Add apple-touch-icon")

    if 'rel="manifest"' not in content:
        inject_after(filepath, "  <meta charset=\"UTF-8\" />", manifest, "Add web manifest")


# === FIX 2: hreflang — homepage only (self-referencing, standard for mono-language sites) ===
HREFLANG_HOME = '''\
  <link rel="alternate" hreflang="en" href="https://circadianblueprint.com/" />
  <link rel="alternate" hreflang="x-default" href="https://circadianblueprint.com/" />'''

inject_after("index.html", '  <link rel="canonical"', "\n" + HREFLANG_HOME, "Add hreflang to homepage")

for filepath in glob.glob("blog/*.html"):
    if filepath == "blog/index.html":
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    canonical_match = re.search(r'<link rel="canonical" href="([^"]+)"', content)
    if canonical_match and 'hreflang' not in content:
        url = canonical_match.group(1)
        hreflang = f'  <link rel="alternate" hreflang="en" href="{url}" />\n  <link rel="alternate" hreflang="x-default" href="{url}" />'
        inject_after(filepath, '  <link rel="canonical"', "\n" + hreflang, "Add hreflang")


# === FIX 3: blog/index.html canonical → /blog/ (not /blog/index.html) ===
safe_replace(
    "blog/index.html",
    '<link rel="canonical" href="https://circadianblueprint.com/blog/index.html" />',
    '<link rel="canonical" href="https://circadianblueprint.com/blog/" />',
    "Fix blog/index.html canonical to /blog/"
)


# === FIX 4: quiz.html — add og:url ===
inject_after(
    "quiz.html",
    '<meta property="og:type" content="website" />',
    '  <meta property="og:url" content="https://circadianblueprint.com/quiz.html" />',
    "Add og:url to quiz.html"
)


# === FIX 5: about.html — add twitter card tags if missing ===
with open("about.html", "r", encoding="utf-8") as f:
    about = f.read()

if 'twitter:card' not in about:
    twitter_block = '''\
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Sleep Science Hub | Mark, Sleep Research Writer" />
  <meta name="twitter:description" content="How Sleep Science Hub turns peer-reviewed sleep research into clear, practical guidance for better rest." />
  <meta name="twitter:image" content="https://circadianblueprint.com/assets/clock-3am.webp" />'''
    inject_after("about.html", '  <meta name="author"', "\n" + twitter_block, "Add Twitter Card to about.html")


print(f"\n{'='*60}")
print(f"TOTAL FILES MODIFIED: {len(set(CHANGELOG))}")
print("="*60)
