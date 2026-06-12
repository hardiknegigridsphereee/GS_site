import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../components')
];

// These are the exact files that were converted.
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
      processDirectory(fullPath);
    } else if (['.tsx', '.ts', '.jsx', '.js', '.css'].includes(path.extname(entry.name))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const file of convertedFiles) {
        // Create regex to match the filename exactly, accounting for possible URI encoding like %20 for spaces
        // We look for /filename.ext or just filename.ext inside quotes
        
        // Escape characters for regex
        const escapedFile = file.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const encodedFile = encodeURI(file).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        
        const ext = path.extname(file);
        const base = file.substring(0, file.length - ext.length);
        
        // Replace unencoded versions
        const regexUnencoded = new RegExp(escapedFile, 'gi');
        if (regexUnencoded.test(content)) {
          content = content.replace(regexUnencoded, `${base}.webp`);
          modified = true;
        }

        // Replace encoded versions (like Graphic%20era.png)
        if (file !== encodedFile) {
           const regexEncoded = new RegExp(encodedFile, 'gi');
           if (regexEncoded.test(content)) {
             content = content.replace(regexEncoded, `${encodeURI(base)}.webp`);
             modified = true;
           }
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated references in: ${fullPath}`);
      }
    }
  }
}

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
}

console.log('Finished updating references.');
