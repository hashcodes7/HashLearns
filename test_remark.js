const { unified } = require('unified');
const remarkParse = require('remark-parse');

const processor = unified().use(remarkParse);
const tree = processor.parse('![[Pasted image 20260824211150.png]]');

console.log(JSON.stringify(tree, null, 2));
