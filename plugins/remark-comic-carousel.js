// Custom Remark plugin to auto-inject folder={require.context('./assets')} into <ComicStrip /> elements

function visit(node, callback) {
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    callback(node);
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child, callback);
    }
  }
}

function plugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.name === 'ComicStrip' || node.name === 'ComicCarousel') {
        const hasFolderAttr = node.attributes && node.attributes.some(attr => attr.name === 'folder');

        if (!hasFolderAttr) {
          if (!node.attributes) node.attributes = [];

          // Inject folder={require.context('./assets')} AST expression
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'folder',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: 'require.context("./assets")',
              data: {
                estree: {
                  type: 'Program',
                  body: [{
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: { type: 'Identifier', name: 'require' },
                        property: { type: 'Identifier', name: 'context' },
                        computed: false
                      },
                      arguments: [{ type: 'Literal', value: './assets', raw: '"./assets"' }],
                      optional: false
                    }
                  }],
                  sourceType: 'module'
                }
              }
            }
          });
        }
      }
    });
  };
}

module.exports = plugin;
