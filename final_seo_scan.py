#!/usr/bin/env python3
"""
Pre-indexing scanner for Sleep Science Hub.
Checks real, verifiable things Google's crawler and readers actually
care about: spelling errors, broken internal links, missing alt text,
title/meta length, heading structure, duplicate words.

Does NOT attempt to predict ranking or "page one probability" — that
isn't something any local script can know.
"""
import os
import re
import sys
import glob

try:
    from spellchecker import SpellChecker
except ImportError:
    print("Install pyspellchecker first:")
    print("  pip install pyspellchecker --break-system-packages")
    sys.exit(1)

# Domain-specific terms that are correct but not in a general English
# dictionary — prevents false positives on real medical/scientific words.
CUSTOM_DICTIONARY = {
    "adenosine", "glymphatic", "orexin", "orexins", "hypocretin", "hypocretins",
    "cortisol", "circadian", "chronotype", "chronotypes", "purinergic",
    "noradrenergic", "norepinephrine", "neuropeptide", "neuropeptides",
    "hypothalamus", "hypothalamic", "suprachiasmatic", "ventrolateral",
    "preoptic", "vlpo", "aquaporin", "astrocytes", "astrocytic", "astroglial",
    "cerebrospinal", "perivascular", "periarterial", "polysomnography",
    "glucocorticoid", "catecholamines", "allostatic", "homeostatic",
    "monoaminergic", "tuberomammillary", "raphe", "amygdala", "limbic",
    "melatonin", "leptin", "glycogen", "hypoglycemia", "hypoglycemic",
    "counter-regulatory", "nocturnal", "subcortical", "extracellular",
    "interstitial", "paraventricular", "vasopressin", "corticotropin",
    "pituitary", "adrenal", "adrenocorticotropin", "somogyi", "nedergaard",
    "iliff", "xie", "borbély", "borbely", "fredholm", "snyder", "sakurai",
    "yamanaka", "saper", "wittmann", "roenneberg", "czeisler", "cryer",
    "buckley", "schatzberg", "späth", "schwalbe", "walker", "endocrinology",
    "tau", "amyloid", "ox1r", "ox2r", "a1", "a2a", "atp", "adp", "amp",
    "crh", "avp", "aras", "scn", "pvn", "rem", "nrem", "hpa", "csf",
    "polygenic", "zeitgeber", "diaphragmatic", "vagus", "hub", "html",
    "vsl", "glp", "tid", "faq", "css", "doi", "og", "url", "json", "ld",
    "arousals", "triphosphate", "excitatory", "methylxanthines",
    "chronobiology", "hyperarousal", "chronobiological", "desynchronization",
    "uncompromised", "unfragmented", "unbuffered", "neuroendocrine",
    "neurochemical", "neurobiological", "neuroscientists", "coeruleus",
    "glucocorticoids", "basolateral", "neurobiologists", "endfeet",
    "perivenous", "neuroimaging", "paravascular", "parenchyma",
    "overcorrects", "ventromedial", "counterregulation", "neuroanatomical",
    "terminalis", "macronutrient", "biomarker", "carb", "smartphone",
}


def extract_visible_text(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"&[a-z]+;", " ", text)
    text = re.sub(r"\b10\.\d{4,9}/\S+", " ", text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"@\w+", " ", text)
    text = re.sub(r"\b[\w.-]+\.(com|io|org|net)\b", " ", text)
    return text


def check_spelling(filepath, html, spell):
    text = extract_visible_text(html)
    words = re.findall(r"[A-Za-z']+", text)
    issues = []
    seen = set()
    for w in words:
        wl = w.lower().strip("'")
        if len(wl) < 3 or wl in CUSTOM_DICTIONARY or wl in seen:
            continue
        if wl in spell:
            continue
        if w[0].isupper():
            continue
        seen.add(wl)
        issues.append(wl)
    return issues


def check_duplicate_words(filepath, html):
    text = extract_visible_text(html)
    matches = re.findall(r"\b(\w+)\s+\1\b", text, re.IGNORECASE)
    return list(set(m.lower() for m in matches))


def check_title_meta_length(filepath, html):
    issues = []
    title_match = re.search(r"<title>(.*?)</title>", html, re.DOTALL)
    if title_match:
        length = len(title_match.group(1).strip())
        if length > 60:
            issues.append(f"Title is {length} chars (recommended <=60): \"{title_match.group(1).strip()[:70]}...\"")
    desc_match = re.search(r'<meta name="description" content="([^"]*)"', html)
    if desc_match:
        length = len(desc_match.group(1))
        if length > 160:
            issues.append(f"Meta description is {length} chars (recommended <=160)")
        elif length < 70:
            issues.append(f"Meta description is only {length} chars (recommended >=70)")
    return issues


def check_single_h1(filepath, html):
    h1_count = len(re.findall(r"<h1[\s>]", html, re.IGNORECASE))
    if h1_count == 0:
        return ["No <h1> found"]
    if h1_count > 1:
        return [f"{h1_count} <h1> tags found (should be exactly 1)"]
    return []


def check_alt_text(filepath, html):
    imgs = re.findall(r"<img\b[^>]*>", html, re.IGNORECASE)
    missing = [img for img in imgs if "alt=" not in img.lower()]
    return [f"{len(missing)} <img> tag(s) missing alt attribute"] if missing else []


def check_internal_links(filepath, html, all_files):
    base_dir = os.path.dirname(filepath)
    hrefs = re.findall(r'href="([^"#h][^"]*\.html[^"]*)"', html)
    broken = []
    for href in hrefs:
        href_clean = href.split("#")[0].split("?")[0]
        if href_clean.startswith("http"):
            continue
        target = os.path.normpath(os.path.join(base_dir, href_clean))
        if not os.path.exists(target):
            broken.append(href)
    return broken


def main():
    files = sorted(glob.glob("*.html") + glob.glob("blog/*.html"))
    all_files = set(os.path.normpath(f) for f in files)

    print("Loading spell checker dictionary...")
    spell = SpellChecker()
    spell.word_frequency.load_words(CUSTOM_DICTIONARY)

    total_issues = 0

    for filepath in files:
        with open(filepath, "r", encoding="utf-8") as f:
            html = f.read()

        file_issues = []

        misspelled = check_spelling(filepath, html, spell)
        if misspelled:
            file_issues.append(f"Possible misspellings ({len(misspelled)}): {', '.join(misspelled[:15])}" + (" ..." if len(misspelled) > 15 else ""))

        dupes = check_duplicate_words(filepath, html)
        if dupes:
            file_issues.append(f"Duplicate consecutive words: {', '.join(dupes)}")

        file_issues.extend(check_title_meta_length(filepath, html))
        file_issues.extend(check_single_h1(filepath, html))
        file_issues.extend(check_alt_text(filepath, html))

        broken_links = check_internal_links(filepath, html, all_files)
        if broken_links:
            file_issues.append(f"Broken internal link(s): {', '.join(broken_links)}")

        print(f"\n{'='*60}")
        print(f"{filepath}")
        print(f"{'='*60}")
        if file_issues:
            for issue in file_issues:
                print(f"  WARN: {issue}")
            total_issues += len(file_issues)
        else:
            print("  OK: No issues found")

    print(f"\n{'='*60}")
    print(f"TOTAL ISSUES ACROSS SITE: {total_issues}")
    print("=" * 60)
    print("\nNote: spelling check may flag legitimate proper nouns or rare")
    print("technical terms not in the dictionary - review each flagged word,")
    print("don't blindly 'fix' all of them.")


if __name__ == "__main__":
    main()
