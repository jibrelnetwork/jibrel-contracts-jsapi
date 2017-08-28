const webpack = require('webpack');
const path = require('path');

const entryPath = path.resolve(__dirname, '..', 'index.js');
const distPath = path.resolve(__dirname, '..', 'dist');

module.exports = {
  entry: entryPath,
  output: {
    filename: 'jibrel-contracts-jsapi.js',
    path: distPath,
    library: 'JibrelContractsApi',
    //libraryTarget: 'umd',
    //umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
