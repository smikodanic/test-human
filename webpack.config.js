const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // remove folders: https://github.com/johnagan/clean-webpack-plugin

const nodeModules = {};



fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });



module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    // poll: 1000,
    ignored: /node_modules/
  },
  context: path.resolve(__dirname, 'src'),
  entry: {
    server: './index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: [/node_modules/, /dist/]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "src": path.resolve('./src') // for import config from 'src/app/config'; instead of import config from '../../config';
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  target: 'node',
  externals: nodeModules,
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: {
    nodeEnv: process.env.NODE_ENV // override mode:'development' so it will be process.env.NODE_ENV='someOtherEnvironment'
  }
};
