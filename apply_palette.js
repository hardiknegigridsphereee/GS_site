const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css'))) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
        walkSync(dirPath, function(filePath) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replace tailwind arbitrary colors
            content = content.replace(/\[#10b981\]/g, 'jade');
            // Replace hex code in quotes (e.g., SVG color props)
            content = content.replace(/"#10b981"/g, '"#2a7f5e"');
            content = content.replace(/'#10b981'/g, "'#2a7f5e'");
            
            // Warnings / Errors colors
            content = content.replace(/red-500/g, 'honey');
            content = content.replace(/amber-500/g, 'amber');
            
            // White to Canvas for text and borders/bgs
            content = content.replace(/text-white/g, 'text-canvas');
            content = content.replace(/bg-white\//g, 'bg-canvas/');
            content = content.replace(/border-white\//g, 'border-canvas/');
            content = content.replace(/border-t-white\//g, 'border-t-canvas/');
            
            // In globals.css
            if (filePath.endsWith('globals.css')) {
                content = content.replace(/#10b981/g, '#2a7f5e');
            }

            // Glow specific replace in GridSphereSequence
            if (filePath.includes('GridSphereSequence.tsx')) {
                content = content.replace(
                    /rgba\(255,255,255,0\.15\)/g,
                    'rgba(19,47,32,0.8)'
                );
                content = content.replace(
                    /rgba\(255,255,255,0\)/g,
                    'rgba(19,47,32,0)'
                );
            }

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated', filePath);
            }
        });
    }
});
