const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'docs');

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
        
        // Remove excessive trailing blank lines (more than 1 blank line at end of file)
        content = content.replace(/\n{3,}$/, '\n\n');
        
        // Convert long hyphens (-----------) into markdown HR (---) IF they aren't inside code blocks
        // It's safer to just look for lines starting with at least 10 hyphens and replace with ---
        content = content.replace(/^[-]{10,}.*$/gm, '---');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Standardized formatting in: ${path.basename(file)}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
    }
});

console.log("Done standardizing files.");
