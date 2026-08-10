const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'docs', 'ai', 'gpt2-architecture-end-to-end');

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

const allFiles = getFiles(targetDir);

allFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Find the first heading that starts with # 
        const headingMatch = content.match(/^#\s+(.+)$/m);
        
        if (headingMatch && headingMatch[1]) {
            const headingTitle = headingMatch[1].trim();
            
            // Replace the title in frontmatter
            content = content.replace(/^title:\s*".*?"/m, `title: "${headingTitle}"`);
            
            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Updated frontmatter in: ${path.basename(file)} to "${headingTitle}"`);
            }
        }
    } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
    }
});

console.log("Done fixing titles.");
