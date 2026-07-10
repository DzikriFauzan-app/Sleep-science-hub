from PIL import Image
import os

files = [
    "assets/faq-caffeine.webp",
    "assets/glymphatic-system.webp",
    "assets/quiz-hormone.webp"
]

for file_path in files:
    if os.path.exists(file_path):
        # Buka gambar mentah 1MB
        img = Image.open(file_path)
        
        # Hitung rasio aspek untuk resize lebar ke 800px secara proporsional
        w_percent = (800 / float(img.size[0]))
        h_size = int((float(img.size[1]) * float(w_percent)))
        
        # Eksekusi downscaling dengan filter kualitas tinggi
        img = img.resize((800, h_size), Image.Resampling.LANCZOS)
        
        # Overwrite file asli dengan kompresi lossy 75%
        img.save(file_path, "WEBP", quality=75)
        print(f"✅ Terkompresi: {file_path} -> {os.path.getsize(file_path) // 1024} KB")
    else:
        print(f"⚠️ Berkas tidak ditemukan: {file_path}")
