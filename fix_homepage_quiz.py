import re

filepath = "index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Fix 1: Button - ganti onclick dengan class yang dicari quiz-engine.js
old_btn = 'onclick="startQuiz()"'
new_btn = 'class="sleep-quiz-start-btn"'

# Fix 2: Pastikan semua elemen quiz punya class yang benar
fixes = [
    # Button
    (
        'onclick="startQuiz()"',
        'class="sleep-quiz-start-btn" style="background-color:#0284c7; border:none; cursor:pointer;"'
    ),
    # Quiz intro div - tambah class sleep-quiz-intro kalau belum ada
    (
        '<div id="quiz-intro"',
        '<div id="quiz-intro" class="sleep-quiz-intro"'
    ),
    # Quiz engine div
    (
        '<div id="quiz-engine" class="hidden"',
        '<div id="quiz-engine" class="hidden sleep-quiz-engine"'
    ),
    # Progress bar
    (
        '<div id="quiz-progress"',
        '<div id="quiz-progress" class="sleep-quiz-progress"'
    ),
    # Counter
    (
        '<div class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2" id="quiz-counter">',
        '<div class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 sleep-quiz-counter" id="quiz-counter">'
    ),
    # Question
    (
        '<h3 class="text-sm font-bold text-white mb-5" id="quiz-question">',
        '<h3 class="text-sm font-bold text-white mb-5 sleep-quiz-question" id="quiz-question">'
    ),
    # Options
    (
        '<div class="space-y-3" id="quiz-options">',
        '<div class="space-y-3 sleep-quiz-options" id="quiz-options">'
    ),
]

changes = 0
for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"OK fixed: {old[:50]}...")
        changes += 1
    else:
        print(f"   - not found: {old[:50]}...")

if changes > 0:
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"\nTotal: {changes} fix(es) applied")
else:
    print("No changes made")
