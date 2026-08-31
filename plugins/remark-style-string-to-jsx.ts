import { visit } from 'unist-util-visit';

export default function remarkStyleStringToJsx() {
  return (tree) => {
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (node.attributes) {
        for (const attr of node.attributes) {
          if (attr.type === 'mdxJsxAttribute' && attr.name === 'style' && typeof attr.value === 'string') {
            const styleString = attr.value;
            const styleObj = {};
            
            styleString.split(';').forEach(rule => {
              if (!rule.trim()) return;
              const parts = rule.split(':');
              if (parts.length >= 2) {
                const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                const value = parts.slice(1).join(':').trim();
                styleObj[key] = value;
              }
            });

            const objStr = Object.keys(styleObj).map(k => `${k}: '${styleObj[k]}'`).join(', ');

            attr.value = {
              type: 'mdxJsxAttributeValueExpression',
              value: `{${objStr}}`,
              data: {
                estree: {
                  type: 'Program',
                  body: [{
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ObjectExpression',
                      properties: Object.keys(styleObj).map(k => ({
                        type: 'Property',
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: { type: 'Identifier', name: k },
                        value: { type: 'Literal', value: styleObj[k], raw: `'${styleObj[k]}'` },
                        kind: 'init'
                      }))
                    }
                  }],
                  sourceType: 'module'
                }
              }
            };
          }
        }
      }
    });
  };
}
