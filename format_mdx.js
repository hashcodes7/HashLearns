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
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // <Callout type="info" title="Overview"> -> :::info[Overview]
        content = content.replace(/<Callout\s+type="([^"]+)"\s+title="([^"]+)">/g, ':::$1[$2]');
        // <Callout type="info"> -> :::info
        content = content.replace(/<Callout\s+type="([^"]+)">/g, ':::$1');
        // </Callout> -> :::
        content = content.replace(/<\/Callout>/g, ':::');
        
        // [[#^vocab|vocabulary]] -> [vocabulary](#vocab)
        content = content.replace(/\[\[#\^([^|]+)\|([^\]]+)\]\]/g, '[$2](#$1)');
        
        // ^vocab -> <a id="vocab"></a>
        content = content.replace(/ \^([a-zA-Z0-9_-]+)$/gm, ' <a id="$1"></a>');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Reformatted: ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
    }
});

console.log("Done formatting MDX files.");
