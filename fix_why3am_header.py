import re

filepath = "blog/why-3am-wake.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace entire <header> block inside the article
old_pattern = re.compile(
    r'<header class="mb-6 pb-6 border-b border-white/5">.*?</header>',
    re.DOTALL
)

new_header = '''<header class="mb-6 pb-6 border-b border-white/5">
  <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
    <div class="inline-block bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
      ⏰ WHY IT KEEPS HAPPENING
    </div>
    <div class="text-slate-500 text-xs font-medium flex items-center gap-1.5">
      ⏱️ <span>12 min read</span>
    </div>
  </div>
  <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 sleep-article-headline">
    Why You Wake Up Wide Awake at 3 AM
  </h1>
  <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
    You fell asleep fine. Then 3 AM hits and your brain is suddenly <em>on</em> — heart racing, mind spinning, can't get back down. It's not random. There are three specific biological reasons this keeps happening, and most people only have one of them.
  </p>
  <p class="text-xs text-slate-400 font-medium">By Mark, Sleep Research Writer • Updated July 2026</p>
</header>'''

if old_pattern.search(content):
    new_content = old_pattern.sub(new_header, content, count=1)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("OK header replaced")
else:
    print("WARN: header pattern not found — paste sed -n '95,130p' blog/why-3am-wake.html")
