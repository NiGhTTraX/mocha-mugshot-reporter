module.exports = {
  entry: './ui/entry.jsx',
  output: {
    filename: './statics/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'},
      {test: /\.jsx$/, loader: 'babel-loader'},
      {test: /\.css/, loader: 'style-loader!css-loader'}
    ]
  }
};
