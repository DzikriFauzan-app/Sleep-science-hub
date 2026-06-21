#!/bin/bash
set -e

echo ">> Menjalankan Python build engine untuk sinkronisasi komponen..."

python3 -c "
import re
import sys

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    # Perbaikan Regex: Mendukung tag footer dengan class atau atribut apa pun
    footer_match = re.search(r'(<footer.*?>.*?</footer>)', index_content, re.DOTALL)
    
    if not footer_match:
        print('❌ Error: Elemen <footer ...> tidak ditemukan di index.html')
        sys.exit(1)
        
    footer_text = footer_match.group(1)
    
    with open('about.html', 'r', encoding='utf-8') as f:
        about_content = f.read()
        
    if '' in about_content:
        updated_about = about_content.replace('', footer_text)
        with open('about.html', 'w', encoding='utf-8') as f:
            f.write(updated_about)
        print('✅ Sukses: Footer berhasil di-inject ke about.html')
    else:
        print('⚠️ Peringatan: tidak ditemukan di about.html (Mungkin sudah ter-inject)')

except Exception as e:
    print(f'❌ Terjadi kesalahan pada build engine: {str(e)}')
    sys.exit(1)
"

echo ">> Sinkronisasi HTML selesai."
