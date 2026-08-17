// A simple AST visitor to avoid ESM require issues with unist-util-visit
function visit(tree, type, callback) {
  function traverse(node, index, parent) {
    if (node.type === type) {
      // If callback returns a new index, use it to skip inserted nodes
      const nextIndex = callback(node, index, parent);
      if (typeof nextIndex === 'number') {
        return nextIndex;
      }
    }
    
    if (node.children && Array.isArray(node.children)) {
      let i = 0;
      while (i < node.children.length) {
        const next = traverse(node.children[i], i, node);
        if (typeof next === 'number') {
          i = next;
        } else {
          i++;
        }
      }
    }
  }
  traverse(tree, null, null);
}

function plugin() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      // Obsidian image syntax: ![[image.png]] or ![[image.png|alt text]]
      const regex = /!\[\[(.*?)\]\]/g;
      const value = node.value;
      
      if (!value.match(regex)) return;

      const newNodes = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index)
          });
        }

        const inner = match[1];
        let url = inner;
        let alt = inner;
        
        // Handle ![[image.png|alt text]]
        if (inner.includes('|')) {
          const parts = inner.split('|');
          url = parts[0];
          alt = parts[1];
        }
        
        newNodes.push({
          type: 'image',
          url: url,
          alt: alt
        });

        lastIndex = regex.lastIndex;
      }

      // Text after the last match
      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(lastIndex)
        });
      }

      // Replace the original text node with the new array of nodes
      if (parent && parent.children) {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length; // Tell visitor to skip the new nodes
      }
    });
  };
}

module.exports = plugin;
