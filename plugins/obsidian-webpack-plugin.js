const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'obsidian-webpack-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              test: (modulePath) => {
                return modulePath.endsWith('.md') || modulePath.endsWith('.mdx');
              },
              enforce: 'pre',
              use: [
                {
                  loader: path.resolve(__dirname, 'obsidian-span-loader.js'),
                },
              ],
            },
          ],
        },
      };
    },
  };
};
