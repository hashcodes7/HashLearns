const fs = require('fs');
const path = require('path');

const ch17Dir = path.join(__dirname, 'docs', 'ai', 'gpt2-architecture-end-to-end', 'Chapter-17-Optional-Alternatives-Modern-Variants');

const files = fs.readdirSync(ch17Dir);

files.forEach(file => {
    if (file.startsWith('Chapter-14.') && file.endsWith('.mdx')) {
        const oldPath = path.join(ch17Dir, file);
        
        // Extract the sub-number (e.g. "1" from "Chapter-14.1---...")
        const match = file.match(/^Chapter-14\.(\d+)---(.+?\.mdx)$/);
        if (match) {
            const subNum = match[1];
            const rest = match[2];
            const newFile = `Chapter-17.${subNum}---${rest}`;
            const newPath = path.join(ch17Dir, newFile);
            
            // Read content and replace instances of "Chapter 14." with "Chapter 17."
            let content = fs.readFileSync(oldPath, 'utf8');
            content = content.replace(/Chapter 14\./g, 'Chapter 17.');
            
            fs.writeFileSync(oldPath, content, 'utf8');
            
            // Rename file
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed ${file} -> ${newFile}`);
        }
    }
});
