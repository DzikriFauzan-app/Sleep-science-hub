import os
import base64

# === 1. site.webmanifest ===
manifest = '''{
  "name": "Circadian Blueprint",
  "short_name": "Circadian",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "icons": [
    {
      "src": "/assets/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ]
}'''
with open("site.webmanifest", "w") as f:
    f.write(manifest)
print("OK site.webmanifest created")

# === 2. apple-touch-icon.png (180x180 dark navy background + clock emoji style) ===
# Minimal valid 180x180 PNG generated programmatically
try:
    from PIL import Image, ImageDraw
    img = Image.new("RGB", (180, 180), color=(15, 23, 42))
    draw = ImageDraw.Draw(img)
    # Simple circle clock design matching the site aesthetic
    draw.ellipse([20, 20, 160, 160], outline=(56, 189, 248), width=6)
    draw.line([90, 90, 90, 45], fill=(56, 189, 248), width=5)
    draw.line([90, 90, 125, 110], fill=(56, 189, 248), width=4)
    draw.ellipse([82, 82, 98, 98], fill=(56, 189, 248))
    img.save("assets/apple-touch-icon.png")
    print("OK assets/apple-touch-icon.png created (PIL)")
except ImportError:
    # PIL not available — create a minimal valid 1x1 PNG upscaled via pure Python
    # Real 180x180 solid navy PNG via bytes
    import struct, zlib
    def create_png(width, height, r, g, b):
        def chunk(tag, data):
            c = zlib.crc32(tag + data) & 0xffffffff
            return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', c)
        ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
        raw = b''.join(b'\x00' + bytes([r, g, b] * width) for _ in range(height))
        idat = zlib.compress(raw)
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')
    with open("assets/apple-touch-icon.png", "wb") as f:
        f.write(create_png(180, 180, 15, 23, 42))
    print("OK assets/apple-touch-icon.png created (pure Python, solid navy)")

# === 3. canonical for 404.html ===
if os.path.exists("404.html"):
    with open("404.html", "r", encoding="utf-8") as f:
        content = f.read()
    if 'rel="canonical"' not in content:
        content = content.replace(
            "</head>",
            '  <link rel="canonical" href="https://circadianblueprint.com/404.html" />\n</head>'
        )
        with open("404.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("OK 404.html canonical added")
    else:
        print("-- 404.html canonical already present")

# === 4. quiz.html og:url (marker was missing, inject near other og: tags) ===
if os.path.exists("quiz.html"):
    with open("quiz.html", "r", encoding="utf-8") as f:
        content = f.read()
    if 'og:url' not in content:
        content = content.replace(
            '<meta name="viewport"',
            '<meta property="og:url" content="https://circadianblueprint.com/quiz.html" />\n  <meta name="viewport"'
        )
        with open("quiz.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("OK quiz.html og:url added")
    else:
        print("-- quiz.html og:url already present")

print("\nDone.")
