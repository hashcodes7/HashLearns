const fs = require('fs');
const path = require('path');

function formatTitle(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/\s+/g, ' ').trim();
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getNumberPrefix(str) {
  const match = str.match(/^([0-9]+)[\s-]*/);
  return match ? `${match[1]}. ` : '';
}

module.exports = function featureCardsPlugin(context, options) {
  const docsDir = path.join(context.siteDir, 'docs');

  return {
    name: 'feature-cards-plugin',

    getPathsToWatch() {
      // Tell Docusaurus to watch the docs folder for new directories and category.json files
      return [
        path.join(docsDir, '**/*'),
      ];
    },

    async loadContent() {
      if (!fs.existsSync(docsDir)) {
        return [];
      }

      const features = [];
      let topLevelItems = [];
      try {
        topLevelItems = fs.readdirSync(docsDir, { withFileTypes: true });
      } catch (err) {
        console.warn(`[feature-cards-plugin] Could not read docs directory:`, err.message);
        return [];
      }

      for (const item of topLevelItems) {
        if (!item.isDirectory() || item.name.startsWith('.')) {
          continue;
        }

        const folderName = item.name;
        const folderPath = path.join(docsDir, folderName);
        const categoryJsonPath = path.join(folderPath, '_category_.json');

        const numPrefix = getNumberPrefix(folderName);
        let title = formatTitle(folderName.replace(/^[0-9]+[\s-]*/, ''));
        let description = `Explore courses and tutorials on ${title}.`;
        let icon = 'undraw_docusaurus_react.svg'; // Default icon

        if (fs.existsSync(categoryJsonPath)) {
          try {
            const categoryData = JSON.parse(fs.readFileSync(categoryJsonPath, 'utf8'));
            if (categoryData.label) {
              title = categoryData.label.replace(/^[0-9]+[\s-]*\.\s*/, ''); // strip any existing number from label to prevent duplicates
            }
            if (categoryData.customProps) {
              if (categoryData.customProps.description) {
                description = categoryData.customProps.description;
              }
              if (categoryData.customProps.icon) {
                icon = categoryData.customProps.icon;
              }
            }
          } catch (e) {
            console.error(`Error reading _category_.json in ${folderName}:`, e);
          }
        }

        // Re-attach the number prefix to the final title
        title = numPrefix + title;

        // Now look for sub-courses
        const courses = [];
        let subItems = [];
        try {
          subItems = fs.readdirSync(folderPath, { withFileTypes: true });
        } catch (err) {
          console.warn(`[feature-cards-plugin] Could not read folder ${folderPath}:`, err.message);
          continue;
        }

        for (const subItem of subItems) {
          if (subItem.name.startsWith('.') || subItem.name === '_category_.json') {
            continue;
          }
          
          let courseName = subItem.name.replace('.md', '').replace('.mdx', '');
          const courseNumPrefix = getNumberPrefix(courseName);
          let courseTitle = formatTitle(courseName.replace(/^[0-9]+[\s-]*/, ''));
          let link = `/docs/${toSlug(folderName)}/${toSlug(courseName)}`;
          
          if (subItem.isDirectory()) {
             const subCategoryPath = path.join(folderPath, subItem.name, '_category_.json');
             if (fs.existsSync(subCategoryPath)) {
                try {
                   const subCategoryData = JSON.parse(fs.readFileSync(subCategoryPath, 'utf8'));
                   if (subCategoryData.label) {
                     courseTitle = subCategoryData.label.replace(/^[0-9]+[\s-]*\.\s*/, '');
                   }
                } catch (e) {}
             }
          }

          // Re-attach number prefix
          courseTitle = courseNumPrefix + courseTitle;

          courses.push({ title: courseTitle, link: link });
        }

        // Only add feature if it actually has courses or we successfully parsed it
        features.push({
          title,
          icon,
          description,
          courses
        });
      }

      return features;
    },

    async contentLoaded({ content, actions }) {
      // Inject the generated features list into global data
      actions.setGlobalData(content);
    },
  };
}
