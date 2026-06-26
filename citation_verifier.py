#!/usr/bin/env python3
"""
Verifies citations in a blog article against the Crossref API (real DOI
metadata registry). Checks if the title/journal/year cited in the HTML
actually matches what's registered for that DOI.
"""
import sys
import re
import json
from difflib import SequenceMatcher

try:
    import requests
except ImportError:
    print("Install requests first: pip install requests --break-system-packages")
    sys.exit(1)


def similarity(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def extract_citations(html):
    """Find each <li>...</li> citation block and pull out the stated
    title, journal, year, and DOI (if a doi.org link is present)."""
    citations = []
    li_blocks = re.findall(r"<li>•.*?</li>", html, re.DOTALL)
    for block in li_blocks:
        doi_match = re.search(r"doi\.org/([^\"'\s<]+)", block)
        if not doi_match:
            continue
        doi = doi_match.group(1)
        title_match = re.search(r"\)\.\s*(.*?)\.\s*<em>", block)
        journal_match = re.search(r"<em>(.*?)</em>", block)
        year_match = re.search(r"\((\d{4})\)", block)
        citations.append({
            "doi": doi,
            "stated_title": title_match.group(1).strip() if title_match else "",
            "stated_journal": journal_match.group(1).strip() if journal_match else "",
            "stated_year": year_match.group(1) if year_match else "",
        })
    return citations


def verify_doi(doi):
    """Query Crossref's public API for the real metadata behind a DOI."""
    url = f"https://api.crossref.org/works/{doi}"
    try:
        resp = requests.get(url, timeout=15, headers={"User-Agent": "SleepScienceHub-CitationCheck/1.0"})
        if resp.status_code != 200:
            return None
        data = resp.json()["message"]
        real_title = data.get("title", [""])[0]
        real_journal = data.get("container-title", [""])[0] if data.get("container-title") else ""
        real_year = None
        if "published-print" in data:
            real_year = str(data["published-print"]["date-parts"][0][0])
        elif "published-online" in data:
            real_year = str(data["published-online"]["date-parts"][0][0])
        return {"title": real_title, "journal": real_journal, "year": real_year}
    except Exception as e:
        print(f"   ⚠️  Network/parse error for DOI {doi}: {e}")
        return None


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 citation_verifier.py <article.html>")
        sys.exit(1)

    filepath = sys.argv[1]
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    citations = extract_citations(html)
    if not citations:
        print("No DOI-linked citations found in this file.")
        sys.exit(0)

    print(f"Found {len(citations)} DOI-linked citation(s). Verifying against Crossref...\n")

    all_passed = True
    for c in citations:
        print(f"DOI: {c['doi']}")
        print(f"  Stated: \"{c['stated_title']}\" — {c['stated_journal']} ({c['stated_year']})")
        real = verify_doi(c["doi"])
        if real is None:
            print(f"  ❌ COULD NOT VERIFY — DOI does not resolve on Crossref. This citation may be fabricated.")
            all_passed = False
            print()
            continue

        title_score = similarity(c["stated_title"], real["title"]) if real["title"] else 0
        journal_score = similarity(c["stated_journal"], real["journal"]) if real["journal"] else 0
        year_match = (c["stated_year"] == real["year"]) if real["year"] else True

        print(f"  Actual: \"{real['title']}\" — {real['journal']} ({real['year']})")

        if title_score > 0.75 and journal_score > 0.6 and year_match:
            print(f"  ✅ MATCH (title similarity {title_score:.0%}, journal similarity {journal_score:.0%})")
        else:
            print(f"  ❌ MISMATCH (title similarity {title_score:.0%}, journal similarity {journal_score:.0%}, year match: {year_match})")
            print(f"     This citation's DOI is real, but doesn't match what's claimed in the article text.")
            all_passed = False
        print()

    if all_passed:
        print("✅ All citations verified against real Crossref records.")
        sys.exit(0)
    else:
        print("🚫 One or more citations failed verification. Do not publish until fixed.")
        sys.exit(1)


if __name__ == "__main__":
    main()
