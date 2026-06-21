#!/bin/bash
set -e

echo ">> Menjalankan Python build engine anti-duplikasi..."

python3 -c "
import re
import sys

try:
    # 1. Ambil footer dari index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    footer_match = re.search(r'(<footer.*?>.*?</footer>)', index_content, re.DOTALL)
    if not footer_match:
        print('❌ Error: Elemen <footer> tidak ditemukan di index.html')
        sys.exit(1)
    footer_text = footer_match.group(1)

    # 2. Baca about.html
    with open('about.html', 'r', encoding='utf-8') as f:
        about_content = f.read()

    # 3. Bersihkan footer lama (jika ada) untuk mencegah duplikasi masif
    about_content = re.sub(r'<footer.*?>.*?</footer>', '', about_content, flags=re.DOTALL)

    # 4. Inject footer baru tepat pada posisi placeholder atau sebelum penutup body
    if '<!-- FOOTER_PLACEHOLDER -->' in about_content:
        about_content = about_content.replace('<!-- FOOTER_PLACEHOLDER -->', footer_text)
    else:
        about_content = about_content.replace('</body>', footer_text + '\n</body>')

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(about_content)
    print('✅ Sukses: Sinkronisasi footer about.html bersih tanpa duplikasi!')

except Exception as e:
    print(f'❌ Gagal memproses sinkronisasi: {str(e)}')
    sys.exit(1)
"
