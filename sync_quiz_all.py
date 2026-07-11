import os, re, glob

# === FIX 1: quiz.html background ===
with open("quiz.html", "r", encoding="utf-8") as f:
    q = f.read()

# Fix container yang di-set bg-white oleh engine via JS (container.className)
# Ini di quiz.html baris 30 - body class
q = q.replace(
    'class="bg-slate-950 font-sans antialiased text-slate-200 min-h-screen flex items-center justify-center px-4 py-12"',
    'class="font-sans antialiased text-slate-200 min-h-screen flex items-center justify-center px-4 py-12"'
)

# Tambah style override yang lebih spesifik langsung di body tag
q = q.replace(
    '<body class="font-sans antialiased text-slate-200 min-h-screen flex items-center justify-center px-4 py-12">',
    '<body class="font-sans antialiased text-slate-200 min-h-screen flex items-center justify-center px-4 py-12" style="background-color:#0f172a !important;">'
)

# Override container bg-white yang di-set JS via inline style injection
OVERRIDE = """
<style>
body { background-color: #0f172a !important; }
.sleep-quiz-container, [class*="rounded-2xl"] {
  background-color: #1e293b !important;
  color: #e2e8f0 !important;
}
/* Override JS-injected bg-white on container */
.sleep-quiz-container * { color: inherit; }
</style>
"""
if "background-color:#0f172a" not in q:
    q = q.replace("</head>", OVERRIDE + "</head>")

with open("quiz.html", "w", encoding="utf-8") as f:
    f.write(q)
print("OK quiz.html background fixed")

# === FIX 2: JS engine — override container className setelah render ===
# Tambahkan CSS injection ke quiz.html yang override bg-white yang di-set engine
JS_OVERRIDE = """
<script>
// Override engine-injected bg-white after render
const _origCreate = document.createElement.bind(document);
document.createElement = function(tag) {
  const el = _origCreate(tag);
  if (tag === 'div' || tag === 'p' || tag === 'a') {
    const _origSet = Object.getOwnPropertyDescriptor(Element.prototype, 'className').set;
    // Monitor className changes
  }
  return el;
};

// Simpler: just watch for bg-white and fix it
const observer = new MutationObserver(() => {
  document.querySelectorAll('[class*="bg-white"]').forEach(el => {
    el.style.backgroundColor = '#1e293b';
    el.style.color = '#e2e8f0';
    el.className = el.className.replace(/bg-white/g, 'bg-slate-900');
  });
  document.querySelectorAll('[class*="text-slate-800"]').forEach(el => {
    el.style.color = '#e2e8f0';
    el.className = el.className.replace(/text-slate-800/g, 'text-slate-200');
  });
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
</script>
"""
with open("quiz.html", "r", encoding="utf-8") as f:
    q = f.read()
if "MutationObserver" not in q:
    q = q.replace("</body>", JS_OVERRIDE + "</body>")
    with open("quiz.html", "w", encoding="utf-8") as f:
        f.write(q)
    print("OK quiz.html MutationObserver injected")

# === FIX 3: Sync quiz widget di semua artikel blog ke format index.html ===
QUIZ_WIDGET = '''        <div class="my-12 rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl text-left sleep-quiz-container">
          <div class="text-center sm:text-left sleep-quiz-intro">
            <h2 class="text-lg font-bold text-white tracking-tight">Pinpoint Your Subcortical Sleep Blocker</h2>
            <p class="mt-2 text-slate-400 text-xs leading-relaxed">This algorithm is calibrated against peer-reviewed sleep science parameters to pinpoint whether your midnight waking is driven by cortisol surges, fluid stagnation, or adenosine backlog clearance.</p>
            <button type="button" class="sleep-quiz-start-btn mt-4 w-full text-center rounded-xl px-6 py-4 text-xs font-bold text-white shadow-lg transition-all active:scale-[0.99]" style="background-color:#10b981;">Why Do I Keep Waking Up? Take The Quiz &rarr;</button>
            <p class="text-[11px] text-slate-500 mt-2.5 text-center tracking-wide font-mono">&#9889; 45s Evaluation &bull; Immediate Breakdown &bull; No Email Required</p>
          </div>
          <div class="hidden sleep-quiz-engine">
            <div class="w-full bg-slate-800 h-1.5 rounded-full mb-6">
              <div class="h-1.5 rounded-full transition-all duration-300 sleep-quiz-progress" style="width:20%;background-color:#0284c7;"></div>
            </div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 sleep-quiz-counter">QUESTION 1 OF 5</div>
            <h3 class="text-base font-bold text-white mb-6 sleep-quiz-question">Loading question...</h3>
            <div class="space-y-3 sleep-quiz-options"></div>
          </div>
        </div>'''

# Pattern to match ANY existing quiz widget in blog articles
QUIZ_PATTERN = re.compile(
    r'<div class="my-12[^"]*sleep-quiz-container"[^>]*>.*?</div>\s*</div>\s*</div>',
    re.DOTALL
)

blog_files = glob.glob("blog/*.html")
blog_files = [f for f in blog_files if f != "blog/index.html"]

for filepath in blog_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "sleep-quiz-container" not in content:
        print(f"   - no quiz found: {filepath}")
        continue

    new_content, count = QUIZ_PATTERN.subn(QUIZ_WIDGET, content, count=1)
    if count > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"OK [{filepath}] quiz widget synced")
    else:
        print(f"   - pattern not matched: {filepath}")

print("\nDone.")
