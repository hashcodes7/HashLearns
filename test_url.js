const { parseLocalURLPath } = require('@docusaurus/utils');

console.log("With spaces:");
console.log(parseLocalURLPath('./assets/Pasted image 20260824211053.png'));

console.log("With %20:");
console.log(parseLocalURLPath('./assets/Pasted%20image%2020260824211053.png'));
