#!/usr/bin/env python3
"""
Quality gate for Sleep Science Hub blog articles.
Checks a given HTML file against the standards established for this site.
Exit code 0 = pass. Exit code 1 = fail (commit should be blocked).
"""
import sys
import re
import os
import json
import hashlib

CACHE_FILE = ".citation_verification_cache.json"

# ============================================================
# HARD-BANNED PATTERNS
# ============================================================
BANNED_PATTERNS = [
    (r"G-protein coupled receptors", "Drug-mechanism claim attached to a supplement (GPCR targeting). Reword to 'natural relaxation response' style language."),
    (r"clinically clean", "Pseudo-clinical marketing jargon. Use plain language instead."),
    (r"\bDiagnosis\s*:", "Implies real medical diagnosis. Use 'Pattern:' or 'Likely Pattern:' instead."),
    (r"BIOMARKER AUDIT", "Fake clinical audit framing. Use a neutral label like 'YOUR RESULTS'."),
    (r"suppress nocturnal cortisol spikes", "Drug-mechanism claim. Reword to general wellness language."),
    (r"\bguarantee(s|d)?\b", "Absolute guarantee claims are an FTC risk for supplement marketing."),
    (r"corrective prescription", "Implies a medical prescription. Reword to 'educational summary' or similar."),
    (r"Secured redirection link encrypted", "Fake security/clinical theater language with no real meaning."),
    (r"Compiling Neurochemical Survey Profiles", "Fake biomarker-processing language; this is a styled setTimeout, not real analysis."),
    (r"dzikrifauzan-app\.github\.io", "Domain mismatch — legacy github pages domain detected."),
    (r"\bMark D,\s*Sleep Science Analyst\b", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"Sleep Science Researcher", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"Mark Sullivan", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"\bMark Sleep Researcher\b", "Old author persona variant (no comma) — unify to 'Mark, Sleep Research Writer'."),
    (r"within less than a minute", "Fabricated precision timing claim with no source."),
]

SUSPICIOUS_TYPO_WORDS = ["corporate"]

REQUIRED_SNIPPETS = {
    'rel="canonical"': "Missing canonical link tag.",
    '<meta property="og:title"': "Missing Open Graph og:title tag.",
    '<meta property="og:image"': "Missing Open Graph og:image tag.",
    '<meta name="twitter:card"': "Missing Twitter Card meta tag.",
    '"@type": "BlogPosting"': "Missing JSON-LD BlogPosting schema.",
    '"@type": "FAQPage"': "Missing JSON-LD FAQPage schema.",
    '"@type": "BreadcrumbList"': "Missing JSON-LD BreadcrumbList schema.",
    "Mark, Sleep Research Writer": "Missing or inconsistent author byline (must say 'Mark, Sleep Research Writer').",
    "Educational Disclosure": "Missing the Educational Disclosure block used on every other article.",
    "Table of Contents": "Missing Table of Contents nav block.",

    "Scientific References": "Missing the Scientific References / Citations section.",
    'rel="nofollow sponsored noopener noreferrer"': "Affiliate link is missing required rel attributes.",
}

REQUIRED_QUIZ_CLASSES = [
    "sleep-quiz-container", "sleep-quiz-intro", "sleep-quiz-start-btn",
    "sleep-quiz-engine", "sleep-quiz-progress", "sleep-quiz-counter",
    "sleep-quiz-question", "sleep-quiz-options",
]

REQUIRED_AUDIT_COUNT = "1,204"


def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def get_citations_hash(content):
    """Hash just the citation list content, so unrelated edits elsewhere
    in the article don't invalidate a prior citation verification."""
    citation_lines = re.findall(r"<li>•\s*<strong>.*?</strong>.*?</li>", content)
    joined = "\n".join(citation_lines)
    return hashlib.sha256(joined.encode("utf-8")).hexdigest()


def check_file(filepath, mark_verified=False):
    if not os.path.exists(filepath):
        print(f"❌ FILE NOT FOUND: {filepath}")
        return False

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    failures = []
    warnings = []

    for pattern, reason in BANNED_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            failures.append(f"BANNED PHRASE found matching /{pattern}/ — {reason}")

    for snippet, reason in REQUIRED_SNIPPETS.items():
        if snippet not in content:
            failures.append(f"MISSING REQUIRED ELEMENT: '{snippet}' — {reason}")

    # Internal linking section heading varies across articles ("Related Reads"
    # on newer articles, "Continue Reading Sleep Physiology Research" on
    # older ones) — accept either variant.
    internal_link_headings = ["Related Reads", "Continue Reading Sleep Physiology Research"]
    if not any(h in content for h in internal_link_headings):
        failures.append(
            "MISSING REQUIRED ELEMENT: internal linking section — "
            f"expected one of {internal_link_headings}."
        )

    if "sleep-quiz-container" in content or "quiz-container" in content:
        for cls in REQUIRED_QUIZ_CLASSES:
            if cls not in content:
                failures.append(f"QUIZ WIDGET BROKEN: missing class '{cls}' — quiz-engine.js won't find this element, button will not work.")

    if "sleep-quiz-audit-count" in content and REQUIRED_AUDIT_COUNT not in content:
        failures.append(f"INCONSISTENT AUDIT COUNTER: expected '{REQUIRED_AUDIT_COUNT}' somewhere near the quiz widget.")

    for word in SUSPICIOUS_TYPO_WORDS:
        for line_no, line in enumerate(content.splitlines(), 1):
            if re.search(rf"\b{word}\b", line, re.IGNORECASE):
                warnings.append(f"Line {line_no}: contains '{word}' — verify this isn't the cortisol/corporate autocomplete bug:\n      {line.strip()[:120]}")

    # ---- Citation cache check ----
    citation_lines = re.findall(r"<li>•\s*<strong>.*?</strong>.*?</li>", content)
    if citation_lines:
        cache = load_cache()
        current_hash = get_citations_hash(content)
        cached_hash = cache.get(filepath)

        if mark_verified:
            cache[filepath] = current_hash
            save_cache(cache)
            warnings.append(f"{len(citation_lines)} citation(s) verified and CACHED for {filepath} (hash recorded).")
        elif cached_hash == current_hash:
            warnings.append(f"{len(citation_lines)} citation(s) match a previously verified cache entry — skipping re-verification.")
        else:
            failures.append(
                f"CITATION CHECK REQUIRED: found {len(citation_lines)} citation(s), and none match the verification "
                f"cache (citations are new or have changed since last verification). "
                "Ask Claude to web-search-verify each one, then re-run "
                "this script with --citations-verified to cache the result permanently."
            )

    print(f"\n{'='*60}")
    print(f"QUALITY GATE REPORT: {filepath}")
    print(f"{'='*60}")

    if warnings:
        print(f"\n⚠️  WARNINGS ({len(warnings)}) — review, but won't block commit:")
        for w in warnings:
            print(f"   - {w}")

    if failures:
        print(f"\n❌ FAILURES ({len(failures)}) — commit will be BLOCKED:")
        for f_ in failures:
            print(f"   - {f_}")
        print(f"\n🚫 RESULT: REJECTED. Fix the above before committing.")
        return False

    print(f"\n✅ RESULT: PASSED. No standards violations found.")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 quality_gate.py <file1.html> [file2.html ...] [--citations-verified]")
        sys.exit(1)

    mark_verified = "--citations-verified" in sys.argv
    files = [a for a in sys.argv[1:] if not a.startswith("--")]

    all_passed = True
    for filepath in files:
        if not check_file(filepath, mark_verified):
            all_passed = False

    sys.exit(0 if all_passed else 1)
