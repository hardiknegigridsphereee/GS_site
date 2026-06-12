import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// Files to explicitly ignore from WebP conversion (e.g. Open Graph images, favicons, or already-optimized files)
const IGNORE_FILES = [
  'og-image.png',
  'og-image.jpg',
  'favicon.ico',
  'favicon.png',
  'apple-icon.png',
  'icon.png'
];

async function convertDirectoryToWebp(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Recursively process directories, but skip the 'final_one' directory since we already converted it
    if (entry.isDirectory()) {
      if (entry.name !== 'final_one') {
        await convertDirectoryToWebp(fullPath);
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    
    // Skip if not a target format, or if it's explicitly ignored
    if (!['.jpg', '.jpeg', '.png'].includes(ext) || IGNORE_FILES.includes(entry.name)) {
      continue;
    }

    const newFilePath = path.join(dir, entry.name.replace(new RegExp(`\\${ext}$`, 'i'), '.webp'));

    try {
      // Don't convert if the WebP version already exists
      if (!fs.existsSync(newFilePath)) {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(newFilePath);
        console.log(`Converted: ${entry.name} -> WebP`);
      }
    } catch (err) {
      console.error(`Failed to convert ${entry.name}:`, err);
    }
  }
}

async function run() {
  console.log('Starting WebP conversion for public directory...');
  await convertDirectoryToWebp(publicDir);
  console.log('Conversion complete!');
}

run();
