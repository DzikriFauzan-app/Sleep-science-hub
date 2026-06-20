import json, pathlib
schema = json.loads(pathlib.Path('.seo/schema-index.json').read_text())
pathlib.Path('.seo/output-ld.json').write_text(json.dumps(schema, separators=(',', ':')))
print('json generated')
