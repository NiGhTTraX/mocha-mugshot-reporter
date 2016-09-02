var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './ui/entry.jsx',
  output: {
    path: './statics/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader',
        'css-loader!postcss')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style',
        'css!postcss!less')},
      // handles the bootstrap glyphicons
      {test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=icons/icons.[ext]'}
    ]
  },
  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ],
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
