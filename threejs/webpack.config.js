const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebacpkPlugin = require("copy-webpack-plugin");

const path = require("path");
module.exports = {
  mode: "development",

  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      title: "threejs-start",
    }),
    new CopyWebacpkPlugin({
      patterns: [
        { from: "./src/assets", to: path.join(__dirname, "/dist/assets") },
      ],
    }),
  ],
  devServer: {
    open: true,
    port: 10086,
    hot: true,
  },
  devtool: "cheap-module-source-map",
};
