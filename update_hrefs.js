const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const allFiles = getFiles(docsDir);

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    content = content.replace(/href="(\/docs\/[^"]+)"/g, (match, p1) => {
        return `href="${p1.replace(/\(|\)/g, '')}"`;
    });
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated links in: ${file}`);
    }
});
