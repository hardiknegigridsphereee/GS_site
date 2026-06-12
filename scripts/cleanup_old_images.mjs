import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
  path.join(__dirname, '../public')
];

const convertedFiles = [
  'DPIIT.jpeg',
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
  'Graphic era.png',
  'exploded.png',
  'first.png',
  'logo.png',
  'startup-india-registration-service.png',
  'TBI.png'
];

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'final_one') {
        processDirectory(fullPath);
      }
    } else {
      if (convertedFiles.includes(entry.name)) {
        const ext = path.extname(entry.name);
        const webpName = entry.name.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        const webpPath = path.join(dir, webpName);

        if (fs.existsSync(webpPath)) {
          fs.unlinkSync(fullPath);
          console.log(`Deleted original file: ${entry.name}`);
        }
      }
    }
  }
}

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
}

console.log('Cleanup complete!');
