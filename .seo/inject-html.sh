#!/bin/bash
JSON=$(cat .seo/output-ld.json)
# hapus ld+json lama, sisipkan baru
sed -i '/<script type="application\/ld+json">/,/<\/script>/d' index.html
sed -i "s|</head>|<script type=\"application/ld+json\">\n$JSON\n</script>\n</head>|" index.html
