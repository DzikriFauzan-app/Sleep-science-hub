const fs = require('fs');
const path = require('path');

async function run() {
  // Install dependency WASM secara lokal di runtime instant
  console.log("📦 Mengunduh engine WebAssembly Image Processor...");
  const { execSync } = require('child_process');
  execSync('npm install --no-save @img/sharp-wasm32 sharp');

  const sharp = require('sharp');
  const files = [
    "assets/faq-caffeine.webp",
    "assets/glymphatic-system.webp",
    "assets/quiz-hormone.webp"
  ];

  for (const file of files) {
    if (fs.existsSync(file)) {
      const tmpFile = file + '.tmp.webp';
      await sharp(file)
        .resize(800)
        .webp({ quality: 75 })
        .toFile(tmpFile);
      
      fs.renameSync(tmpFile, file);
      console.log(`✅ Sukses Kompresi (WASM): ${file} -> ${fs.statSync(file).size // 1024} KB`);
    }
  }
}

run().catch(console.error);
