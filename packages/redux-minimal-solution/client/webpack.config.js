const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.tsx'),
  mode: 'development',
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
