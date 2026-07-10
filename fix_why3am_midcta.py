import re

filepath = "blog/why-3am-wake.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Inject mid-article CTA right before <h2 id="section-3"
MID_CTA = '''
<div class="my-8 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950/40 border border-sky-500/20 p-5 text-left">
  <p class="text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">🎯 QUICK CHECK</p>
  <p class="text-white font-bold text-sm mb-2">Which of these sounds like you?</p>
  <ul class="text-slate-400 text-xs space-y-1 mb-4 list-none pl-0">
    <li>→ Wake up between 2:45–3:15 AM, mind suddenly racing</li>
    <li>→ Fall back asleep eventually but feel wrecked in the morning</li>
    <li>→ It happens more after stressful days or late meals</li>
  </ul>
  <p class="text-slate-400 text-xs mb-4">If any of these fit, the quiz below takes 60 seconds and tells you which biological trigger is most likely causing yours.</p>
  <a href="../quiz.html" class="inline-block w-full text-center rounded-xl bg-sky-600 hover:bg-sky-500 px-4 py-3 text-xs font-bold text-white transition" style="text-decoration:none; background-color:#0284c7;">
    Find My 3 AM Trigger →
  </a>
  <p class="text-slate-600 text-[10px] mt-2 text-center">Educational only. May contain affiliate links.</p>
</div>

'''

if '<h2 id="section-3"' in content:
    content = content.replace('<h2 id="section-3"', MID_CTA + '<h2 id="section-3"')
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("OK mid-article CTA injected before section-3")
else:
    print("WARN: section-3 anchor not found")
    # Fallback: try section-2 close
    if '<h2 id="section-2"' in content:
        content = content.replace('<h2 id="section-2"', MID_CTA + '<h2 id="section-2"')
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print("OK mid-article CTA injected before section-2 (fallback)")
