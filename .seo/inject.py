import json, sys
with open('.seo/schema-index.json') as f:
    schema = json.load(f)
print('<script type="application/ld+json">%s</script>' % json.dumps(schema, separators=(',',':')))
