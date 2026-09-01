const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name === '_category_.json') {
      const parentFolderName = path.basename(dir).toLowerCase();
      // If it's a chapter, remove the link so it just expands instead of having an index page
      if (parentFolderName.includes('chapter')) {
        try {
          const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (content.link) {
            delete content.link;
            fs.writeFileSync(fullPath, JSON.stringify(content, null, 2), 'utf8');
            console.log(`Removed link from ${fullPath}`);
          }
        } catch (e) {
          console.error(`Error parsing ${fullPath}: ${e}`);
        }
      }
    }
  }
}

processDirectory(path.join(__dirname, 'docs'));
