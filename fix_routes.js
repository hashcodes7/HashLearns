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
const linkMapping = {};

// Build the mapping from Next.js slug to Docusaurus route
allFiles.forEach(file => {
    // Relative path from docs directory
    const relPath = path.relative(docsDir, file).replace(/\\/g, '/');
    const ext = path.extname(relPath);
    const relPathNoExt = relPath.substring(0, relPath.length - ext.length);
    
    // Docusaurus URL (default lowercase in URLs)
    const docUrl = '/docs/' + relPathNoExt.toLowerCase();
    
    // Original Next.js URL
    const nextUrl = '/learn/courses/' + relPathNoExt.toLowerCase().replace(/\./g, '-').replace(/\(|\)/g, '');
    
    linkMapping[nextUrl] = docUrl;
});

// Now replace in all files
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    for (const [nextUrl, docUrl] of Object.entries(linkMapping)) {
        // Regex to match exact href strings
        const regex = new RegExp(`href="${nextUrl.replace(/[.*+?^$\{}()|[\\]\\\\]/g, '\\\\$&')}"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `href="${docUrl}"`);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated links in: ${file}`);
    }
});

console.log("Done fixing routes.");
