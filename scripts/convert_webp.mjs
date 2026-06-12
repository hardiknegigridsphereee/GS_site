import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/final_one');

async function convertToWebp() {
  try {
    const files = fs.readdirSync(directoryPath);
    let converted = 0;

    for (const file of files) {
      if (file.endsWith('.jpg')) {
        const filePath = path.join(directoryPath, file);
        const newFilePath = path.join(directoryPath, file.replace('.jpg', '.webp'));

        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newFilePath);

        console.log(`Converted ${file} to WebP`);
        converted++;
      }
    }
    console.log(`Successfully converted ${converted} images to WebP.`);
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

convertToWebp();
