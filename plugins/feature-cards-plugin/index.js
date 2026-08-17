const fs = require('fs');
const path = require('path');

function formatTitle(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
      const topLevelItems = fs.readdirSync(docsDir, { withFileTypes: true });

      for (const item of topLevelItems) {
        if (!item.isDirectory() || item.name.startsWith('.')) {
          continue;
        }

        const folderName = item.name;
        const folderPath = path.join(docsDir, folderName);
        const categoryJsonPath = path.join(folderPath, '_category_.json');

        let title = formatTitle(folderName);
        let description = `Explore courses and tutorials on ${title}.`;
        let icon = 'undraw_docusaurus_react.svg'; // Default icon

        if (fs.existsSync(categoryJsonPath)) {
          try {
            const categoryData = JSON.parse(fs.readFileSync(categoryJsonPath, 'utf8'));
            if (categoryData.label) {
              title = categoryData.label;
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

        // Now look for sub-courses
        const courses = [];
        const subItems = fs.readdirSync(folderPath, { withFileTypes: true });

        for (const subItem of subItems) {
          if (subItem.name.startsWith('.') || subItem.name === '_category_.json') {
            continue;
          }
          
          let courseTitle = formatTitle(subItem.name.replace('.md', '').replace('.mdx', ''));
          let link = `/docs/${folderName}/${subItem.name.replace('.md', '').replace('.mdx', '')}`;
          
          if (subItem.isDirectory()) {
             const subCategoryPath = path.join(folderPath, subItem.name, '_category_.json');
             if (fs.existsSync(subCategoryPath)) {
                try {
                   const subCategoryData = JSON.parse(fs.readFileSync(subCategoryPath, 'utf8'));
                   if (subCategoryData.label) {
                     courseTitle = subCategoryData.label;
                   }
                } catch (e) {}
             }
          }

          courses.push({ title: courseTitle, link: link });
        }

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
