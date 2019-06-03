const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve('dist'),
    watchContentBase: true
  },
  devtool: (process.env.NODE_ENV === "production" ? null : 'inline-source-map'),
  entry: './src/js/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SDSA Signin",
      filename: 'index.html', //relative to root of the application
      template: './src/html/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
}
