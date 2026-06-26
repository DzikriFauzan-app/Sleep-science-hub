#!/usr/bin/env python3
"""
Quality gate for Sleep Science Hub blog articles.
Checks a given HTML file against the standards established for this site.
Exit code 0 = pass. Exit code 1 = fail (commit should be blocked).
"""
import sys
import re
import os

# ============================================================
# HARD-BANNED PATTERNS — these caused real compliance/FTC risk
# before and must never reappear. Case-insensitive.
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
    (r"circadianblueprint\.com", "Domain mismatch — site is hosted at dzikrifauzan-app.github.io."),
    (r"\bMark D,\s*Sleep Science Analyst\b", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"Sleep Science Researcher", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"Mark Sullivan", "Old author persona variant — unify to 'Mark, Sleep Research Writer'."),
    (r"\bMark Sleep Researcher\b", "Old author persona variant (no comma) — unify to 'Mark, Sleep Research Writer'."),
]

# Words that previously appeared due to an autocomplete/typo bug
# (cortisol -> corporate). Flagged for manual read, not auto-failed,
# since "corporate" has legitimate uses (e.g. "corporate compliance").
SUSPICIOUS_TYPO_WORDS = ["corporate"]

# ============================================================
# REQUIRED STRUCTURAL ELEMENTS — every article must have these
# ============================================================
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
    "Related Reads": "Missing the 'Related Reads' internal linking section.",
    "Scientific References": "Missing the Scientific References / Citations section.",
    'rel="nofollow sponsored noopener noreferrer"': "Affiliate link is missing required rel attributes.",
}

# Quiz widget must use these exact classes to match assets/quiz-engine.js
# selectors — otherwise the button will render but do nothing on click.
REQUIRED_QUIZ_CLASSES = [
    "sleep-quiz-container", "sleep-quiz-intro", "sleep-quiz-start-btn",
    "sleep-quiz-engine", "sleep-quiz-progress", "sleep-quiz-counter",
    "sleep-quiz-question", "sleep-quiz-options",
]

REQUIRED_AUDIT_COUNT = "1,204"


def check_file(filepath, citations_verified=False):
    if not os.path.exists(filepath):
        print(f"❌ FILE NOT FOUND: {filepath}")
        return False

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    failures = []
    warnings = []

    # 1. Banned patterns
    for pattern, reason in BANNED_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            failures.append(f"BANNED PHRASE found matching /{pattern}/ — {reason}")

    # 2. Required structural elements
    for snippet, reason in REQUIRED_SNIPPETS.items():
        if snippet not in content:
            failures.append(f"MISSING REQUIRED ELEMENT: '{snippet}' — {reason}")

    # 3. Quiz widget wiring
    if "sleep-quiz-container" in content or "quiz-container" in content:
        for cls in REQUIRED_QUIZ_CLASSES:
            if cls not in content:
                failures.append(f"QUIZ WIDGET BROKEN: missing class '{cls}' — quiz-engine.js won't find this element, button will not work.")

    # 4. Audit counter consistency
    if "sleep-quiz-audit-count" in content and REQUIRED_AUDIT_COUNT not in content:
        failures.append(f"INCONSISTENT AUDIT COUNTER: expected '{REQUIRED_AUDIT_COUNT}' somewhere near the quiz widget.")

    # 5. Typo bug watch (warning only, not a hard fail)
    for word in SUSPICIOUS_TYPO_WORDS:
        for line_no, line in enumerate(content.splitlines(), 1):
            if re.search(rf"\b{word}\b", line, re.IGNORECASE):
                warnings.append(f"Line {line_no}: contains '{word}' — verify this isn't the cortisol/corporate autocomplete bug:\n      {line.strip()[:120]}")

    # 6. Citation manual-verification gate
    citation_lines = re.findall(r"<li>•\s*<strong>.*?</strong>.*?</li>", content)
    if citation_lines:
        if not citations_verified:
            failures.append(
                f"CITATION CHECK REQUIRED: found {len(citation_lines)} citation(s). "
                "These must be manually verified as real papers (correct title/journal/DOI) "
                "before this passes. Ask Claude to web-search-verify each one, then re-run "
                "this script with --citations-verified."
            )
        else:
            warnings.append(f"{len(citation_lines)} citation(s) marked as manually verified (--citations-verified flag used).")

    # ---- Report ----
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

    citations_verified = "--citations-verified" in sys.argv
    files = [a for a in sys.argv[1:] if not a.startswith("--")]

    all_passed = True
    for filepath in files:
        if not check_file(filepath, citations_verified):
            all_passed = False

    sys.exit(0 if all_passed else 1)
