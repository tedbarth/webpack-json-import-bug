const fs = require('fs-extra');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = {
  cache: true,

  entry: {
    'index': './index.js',
  },
  output: {
    filename: `index-dist.js`,
  },
  plugins: [
    new WebpackBeforeBuildPlugin((stats, callback) => {
      // Clear output directory before build
      fs.emptyDirSync('./dist');

      // Copy file to simulate generated source
      fs.copySync('test.json', './dist/generated.test.json');

      callback();
    }, ['watch-run', 'run']),

    new ExtraWatchWebpackPlugin({
      files: [
        './test.json'
      ]
    })

  ],
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  watchOptions: {
    ignored: /node_modules|dist/, // dist: To not endlessly see changes on generated code/data
  }
};
