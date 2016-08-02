module.exports = {
  entry: './ui/entry.jsx',
  output: {
    filename: './statics/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css/, loader: 'style-loader!css-loader'}
    ]
  }
};
