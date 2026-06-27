import re

with open("final_seo_scan.py", "r", encoding="utf-8") as f:
    content = f.read()

old_dict_end = '"vsl", "glp", "tid", "faq", "css", "doi", "og", "url", "json", "ld",\n}'
new_dict_end = '''"vsl", "glp", "tid", "faq", "css", "doi", "og", "url", "json", "ld",
    "arousals", "triphosphate", "excitatory", "methylxanthines",
    "chronobiology", "hyperarousal", "chronobiological", "desynchronization",
    "uncompromised", "unfragmented", "unbuffered", "neuroendocrine",
    "neurochemical", "neurobiological", "neuroscientists", "coeruleus",
    "glucocorticoids", "basolateral", "neurobiologists", "endfeet",
    "perivenous", "neuroimaging", "paravascular", "parenchyma",
    "overcorrects", "ventromedial", "counterregulation", "neuroanatomical",
    "terminalis", "macronutrient", "biomarker", "carb", "smartphone",
}'''
if old_dict_end in content:
    content = content.replace(old_dict_end, new_dict_end)
    print("Expanded custom dictionary with legitimate scientific terms")
else:
    print("WARN: Could not find dictionary insertion point")

old_extract = '''def extract_visible_text(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"&[a-z]+;", " ", text)
    return text'''

new_extract = '''def extract_visible_text(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.DOTALL)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"&[a-z]+;", " ", text)
    text = re.sub(r"\\b10\\.\\d{4,9}/\\S+", " ", text)
    text = re.sub(r"https?://\\S+", " ", text)
    text = re.sub(r"@\\w+", " ", text)
    text = re.sub(r"\\b[\\w.-]+\\.(com|io|org|net)\\b", " ", text)
    return text'''

if old_extract in content:
    content = content.replace(old_extract, new_extract)
    print("Added DOI/URL/@-handle stripping before word extraction")
else:
    print("WARN: Could not find extract_visible_text insertion point")

with open("final_seo_scan.py", "w", encoding="utf-8") as f:
    f.write(content)
