import os
import re

CHANGELOG = []

def safe_replace(filepath, old, new, label, is_regex=False):
    if not os.path.exists(filepath):
        print(f"⚠️  SKIP (file not found): {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if is_regex:
        new_content, count = re.subn(old, new, content, flags=re.DOTALL)
    else:
        count = content.count(old)
        new_content = content.replace(old, new)

    if count == 0:
        print(f"   - [{filepath}] pattern not found for: {label}")
        return

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ [{filepath}] {label} — {count} replacement(s)")
    CHANGELOG.append((filepath, label, count))


F = "blog/orexin-wake-stabilizer.html"

safe_replace(
    F,
    '''        </div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2" id="quiz-counter">QUESTION 1 OF 5</div>
            <h3 class="text-sm font-bold text-white mb-5" id="quiz-question">Loading question...</h3>
            <div class="space-y-3" id="quiz-options"></div>
          </div>
        </div>

        <!-- COMPLIANT SOLUTIONS DISCLOSURE BLOCK''',
    '''        </div>

        <!-- COMPLIANT SOLUTIONS DISCLOSURE BLOCK''',
    "Remove orphan duplicate quiz HTML fragment (invalid duplicate IDs)"
)

safe_replace(
    F,
    "\n          <li class='text-xs text-slate-500 mt-1'>• Supplemental indexing verified via official biomedical data streams. <a href='https://pubmed.ncbi.nlm.nih.gov/' rel='noopener noreferrer' target='_blank' class='text-sky-400 underline'>PubMed Central Link</a></li>\n",
    "\n",
    "Remove generic 'Supplemental indexing' filler junk (all occurrences)"
)

safe_replace(
    F,
    "style-src 'self' 'unsafe-inline' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "Dedupe CSP style-src duplicate 'unsafe-inline'"
)

safe_replace(
    F,
    '''  <!-- Related Reads Section -->
  <section class="mt-12 border-t border-slate-800 pt-8 max-w-2xl mx-auto px-4">
    <h3 class="text-xl font-bold text-slate-200 mb-4">Related Reads</h3>
    <ul class="space-y-2 list-disc pl-5 text-sky-400">
      <li><a href="why-3am-wake.html" class="hover:underline">Understanding the 3:00 AM Awakening Loop</a></li>
      <li><a href="glymphatic-system.html" class="hover:underline">The Glymphatic System and Deep Sleep Quality</a></li>
    </ul>
  </section>
''',
    "",
    "Remove orphan duplicate 'Related Reads' section after scripts"
)

print("\n" + "=" * 60)
print(f"TOTAL REPLACEMENTS: {sum(c[2] for c in CHANGELOG)}")
print("=" * 60)
