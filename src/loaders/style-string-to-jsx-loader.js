module.exports = function (source) {
  // Replace style="something: value" with style={{something: 'value'}}
  return source.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleObj = {};
    p1.split(';').forEach(rule => {
      if (!rule.trim()) return;
      const parts = rule.split(':');
      if (parts.length >= 2) {
        // Convert kebab-case to camelCase
        const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        const value = parts.slice(1).join(':').trim();
        styleObj[key] = value;
      }
    });
    
    const objStr = Object.keys(styleObj)
      .map(k => `${k}: '${styleObj[k]}'`)
      .join(', ');
      
    return `style={{${objStr}}}`;
  });
};
