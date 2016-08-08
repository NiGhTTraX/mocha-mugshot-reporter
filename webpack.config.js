var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './ui/entry.jsx',
  output: {
    filename: './statics/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css/, loader: 'style-loader!css-loader!postcss'},
      {test: /\.less$/, loader: 'style!css!postcss!less'}
    ]
  },
  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ]
};
