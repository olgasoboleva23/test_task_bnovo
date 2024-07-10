const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebPackPlugin = require('html-webpack-plugin');

// const path = require("path");

module.exports = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    webSocketServer: false,
    historyApiFallback: true
  },
  entry: {
    main: "./src/app.js",
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      // filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: [".*", ".js", ".vue", ".json", ".html"],
  },
};
