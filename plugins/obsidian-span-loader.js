module.exports = function (source) {
  const pattern = /<span\s+style="color:\s*([^"]+)"\s*>([\s\S]*?)<\/span>/gi;
  
  const result = source.replace(pattern, (match, colorVal, innerContent) => {
    let cleanInner = innerContent.replace(/\r?\n|\r/g, ' ');
    
    let prefix = '';
    let suffix = '';
    
    // Check for unbalanced asterisks
    const starCount = (cleanInner.match(/\*/g) || []).length;
    if (starCount % 2 !== 0) {
      if (cleanInner.endsWith('*')) {
        cleanInner = cleanInner.slice(0, -1);
        suffix += '*';
      } else if (cleanInner.startsWith('*')) {
        cleanInner = cleanInner.slice(1);
        prefix += '*';
      }
    }
    
    // Check for unbalanced underscores
    const underCount = (cleanInner.match(/_/g) || []).length;
    if (underCount % 2 !== 0) {
      if (cleanInner.endsWith('_')) {
        cleanInner = cleanInner.slice(0, -1);
        suffix += '_';
      } else if (cleanInner.startsWith('_')) {
        cleanInner = cleanInner.slice(1);
        prefix += '_';
      }
    }

    // Check for unbalanced backticks
    const tickCount = (cleanInner.match(/`/g) || []).length;
    if (tickCount % 2 !== 0) {
      if (cleanInner.endsWith('`')) {
        cleanInner = cleanInner.slice(0, -1);
        suffix += '`';
      } else if (cleanInner.startsWith('`')) {
        cleanInner = cleanInner.slice(1);
        prefix += '`';
      }
    }
    
    return `${prefix}<span style={{color: "${colorVal}"}}>${cleanInner}</span>${suffix}`;
  });
  
  return result;
};
