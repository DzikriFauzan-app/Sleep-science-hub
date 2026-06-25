import os
import re

files = {
    "index.html": "Home",
    "about.html": "About",
    "blog/adenosine-sleep-pressure.html": "Adenosine",
    "blog/glymphatic-system.html": "Glymphatic",
    "blog/orexin-wake-stabilizer.html": "Orexin",
    "blog/why-3am-wake.html": "Why 3AM",
    "blog/hypoglycemia-sleep-maintenance.html": "Hypoglycemia"
}

print("====================================================")
print("🚀 VERIFIED 2026 AUDIT: NO-FAKE-DATA COMPLIANCE")
print("====================================================\n")

for path, name in files.items():
    if not os.path.exists(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
        
    score = 100
    issues = []
    
    # 1. E-E-A-T Check
    if "Sullivan" in c or "Researcher" in c or "Analyst" in c:
        score -= 20
        issues.append("❌ Inconsistent Author Naming / Fake Credentials Found")
        
    # 2. Fake Data Counter Check
    if "4,812" in c or "150" in c:
        score -= 15
        issues.append("❌ Discrepancy in Fake Social Proof Figures")
        
    # 3. Domain Branding Check
    if "circadianblueprint.com" in c:
        score -= 15
        issues.append("❌ Legacy Template Domain Mismatch")
        
    # 4. Funnel Leak Check
    if name == "Orexin" and "getyusleep.com" not in c:
        score -= 20
        issues.append("❌ Affiliate Revenue Pathway Missing")

    status = "👑 PERFECT" if score == 100 else "🚨 CRITICAL FAILURE"
    print(f"[{status}] {name}: {score}/100")
    for i in issues:
        print(f"   {i}")
    print("-" * 52)
