import os

target_path = "blog/glymphatic-system.html"
with open(target_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_text = '<li>• <strong>Nedergaard, M.</strong> (2013). Garbage clearance of the brain. <em>Science</em>, 340(6139), 1521-1522. Baseline macroscopic waste pathway maps.</li>'
new_text = '<li>• <strong>Nedergaard, M.</strong> (2013). Garbage Truck of the Brain. <em>Science</em>, 340(6140), 1529-1530. <a href="https://doi.org/10.1126/science.1240514" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline">DOI: 10.1126/science.1240514</a> Baseline macroscopic waste pathway maps.</li>'

if old_text in content:
    content = content.replace(old_text, new_text)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("[SUCCESS] Nedergaard citation corrected (title, issue, pages, DOI added)")
else:
    print("[WARN] Target text not found — paste output of grep again")
