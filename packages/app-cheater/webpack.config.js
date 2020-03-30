const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode =
  ("production" === process.env.NODE_ENV && "production") || "development";

const basePathname = process.env.BASE_PATHNAME || "";

module.exports = {
  mode,
  entry: { app: "./index" },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[hash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath:
      "/" +
      basePathname
        .split("/")
        .filter(Boolean)
        .map((x) => x + "/")
        .join(""),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js)|(ts)|(tsx)$/,
        loader: "babel-loader",
        options: { rootMode: "upward" },
      },
      {
        exclude: /./,
        loader: "workerize-loader",
        options: { inline: true },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({ React: ["react"] }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      hash: true,
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      minify: mode === "production" && {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  devtool: false,
};
