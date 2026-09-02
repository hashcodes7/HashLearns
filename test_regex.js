const str = `<span style="color:#1c7ed6">If you have a bunch of images named sequentially (like \`comic1.png\`, \`comic2.png\`, \`comic3.png\`), you don't need to type out every single filename! Use the \`filter\` prop to grab them all, and map them to a \`descriptions\` array.

*Note: The number of descriptions in the array will perfectly map to the images loaded by the filter, in numerical/alphabetical order.*</span>`;
const pattern = /<span\s+style="color:\s*([^"]+)"\s*>([\s\S]*?)<\/span>/gi;
console.log(str.match(pattern));
