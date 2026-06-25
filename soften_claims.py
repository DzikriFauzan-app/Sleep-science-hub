import os, re

files = {
    "quiz.html": [
        (r'Diagnosis:', 'Pattern:'),
        (r'completely shut down', 'may help support'),
        (r'rapidly restore', 'support'),
        (r'emergency sirkadian mitigation protocol', 'sleep support routine'),
        (r'clinical-grade formulation', 'formulation'),
        (r'professional-grade clinical framework', 'educational framework'),
    ],
    "blog/glymphatic-system.html": [
        (r'can trigger a localized inflammatory response', 'may be associated with localized responses'),
        (r'active metabolic threat to your brain health', 'metabolic activity'),
    ]
}

for path, fixes in files.items():
    if not os.path.exists(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    
    original = c
    for old, new in fixes:
        c = re.sub(old, new, c, flags=re.I)
    
    if c != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"✅ Softened: {path}")

print("\nDone - claims disoftenkan untuk YMYL compliance")
