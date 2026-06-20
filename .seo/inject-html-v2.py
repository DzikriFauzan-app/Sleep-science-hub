import pathlib, re
html = pathlib.Path('index.html').read_text()
jsonld = pathlib.Path('.seo/output-ld.json').read_text().strip()
# hapus semua script ld+json lama
html = re.sub(r'<script type="application/ld\+json">.*?</script>', '', html, flags=re.DOTALL)
# sisipkan baru
html = html.replace('</head>', f'<script type="application/ld+json">{jsonld}</script>\n</head>')
pathlib.Path('index.html').write_text(html)
print('injected')
