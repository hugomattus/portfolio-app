const fs = require('fs');
const path = require('path');

// Função para criar um arquivo PNG simples com cor cinza
function createPlaceholderImage(filename, width = 800, height = 800) {
  // Cria um buffer PNG cinzento simples
  // Isto é um PNG 1x1 pixel cinzento base64
  const grayPixel = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, // IHDR chunk size
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, // width = 1
    0x00, 0x00, 0x00, 0x01, // height = 1
    0x08, 0x02, // bit depth = 8, color type = 2 (RGB)
    0x00, 0x00, 0x00, // compression, filter, interlace
    0x90, 0x77, 0x53, 0xde, // CRC
    0x00, 0x00, 0x00, 0x0c, // IDAT chunk size
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00, 0x00, 0x00, 0x03, 0x00, 0x01,
    0xf5, 0x5f, 0xf4, 0xc4, // CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk size
    0x49, 0x45, 0x4e, 0x44, // IEND
    0xae, 0x42, 0x60, 0x82  // CRC
  ]);
  
  fs.writeFileSync(filename, grayPixel);
  console.log(`Created ${filename}`);
}

const assetsDir = path.join(__dirname, 'public', 'assets');

// Criar diretório se não existir
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Gerar as 4 imagens placeholder
for (let i = 1; i <= 4; i++) {
  createPlaceholderImage(path.join(assetsDir, `photo-${i}.jpg`));
}

console.log('Placeholder images created!');
