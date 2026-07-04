import os
import re
import glob

ORPHAN_PATTERN = re.compile(
    r'\s*<!-- Related Reads Section -->\s*'
    r'<section class="mt-12 border-t border-slate-800 pt-8 max-w-2xl mx-auto px-4">\s*'
    r'<h3 class="text-xl font-bold text-slate-200 mb-4">Related Reads</h3>\s*'
    r'<ul class="space-y-2 list-disc pl-5 text-sky-400">.*?</ul>\s*'
    r'</section>\s*',
    re.DOTALL
)

files = sorted(glob.glob("blog/*.html"))
total = 0

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content, count = ORPHAN_PATTERN.subn("", content)

    if count > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"OK [{filepath}] removed {count} orphan block(s)")
        total += count
    else:
        print(f"-- [{filepath}] clean")

print(f"\n{'='*60}")
print(f"TOTAL ORPHAN BLOCKS REMOVED: {total}")
print("="*60)
