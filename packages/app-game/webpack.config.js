const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginInlineStyle = require("./HtmlWebpackPluginInlineStyle");
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

const mode =
  ("production" === process.env.NODE_ENV && "production") || "development";

const basePathname = process.env.BASE_PATHNAME || "";

const app = {
  name: pkg.description.split("__")[1] || pkg.name,
  description: pkg.description.split("__").slice(-1)[0],
  developer: pkg.author || {},
};

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
        loader: "worker-plugin",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({ React: ["react"] }),

    new HtmlWebpackPluginInlineStyle({
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        height:100%;
        background-image: radial-gradient(ellipse at center, rgba(99, 36, 40, 0) 0, rgba(99, 36, 40, 0.5) 130%);
        background-color: #f24b55;
      }`,
    }),

    new HtmlWebpackPlugin({
      title: app.name,
      filename: "index.html",
      meta: {
        description: app.description,

        "og:type": "website",
        "og:title": app.name,
        "og:description": app.description,
        "og:image": "",

        "twitter:card": "summary_large_image",
        "twitter:title": app.name,
        "twitter:description": app.description,
        "twitter:image": "",
        "twitter:creator": app.developer.twitter,

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

    new GenerateSW({
      exclude: [
        //
        /manifest\.json$/,
        /robots\.txt$/,

        /apple-touch-icon.*\.png$/,
        /android-chrome-.*\.png$/,
        /favicon-.*\.png$/,
        /favicon\.ico$/,

        /\.cache$/,
        /iconstats-.*\.json$/,
        /\.js\.LICENSE$/,
      ],
    }),

    new AppManifestWebpackPlugin({
      logo: path.resolve(__dirname, "assets", "images", "icon192.png"),
      prefix: "/" + basePathname.split("/").filter(Boolean).join("/"),
      inject: true,
      config: {
        appName: app.name,
        appDescription: app.description,
        developerName: app.developer.name,
        developerURL: app.developer.url,
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/" + basePathname.split("/").filter(Boolean).join("/"),
        version: pkg.version,
        logging: false,
        icons: {
          android: true,
          favicons: true,
          appleIcon: true,
          appleStartup: false,
          firefox: false,
          windows: false,
          yandex: false,
          coast: false,
        },
      },
    }),
  ],
  optimization:
    mode === "production"
      ? {
          minimize: true,
          minimizer: [new TerserPlugin({ extractComments: true })],
        }
      : {},
  devtool: false,
};
