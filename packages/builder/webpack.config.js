const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const pkgGame = require("../app-game/package.json");
const pkgSolver = require("../app-solver/package.json");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginInlineStyle = require("./HtmlWebpackPluginInlineStyle");
const { GenerateSW } = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const mode =
  ("production" === process.env.NODE_ENV && "production") || "development";

const basePathname = (process.env.BASE_PATHNAME || "")
  .split("/")
  .filter(Boolean);

const extractApp = (pkg) => ({
  name: pkg.description.split("__")[1] || pkg.name,
  description: pkg.description.split("__").slice(-1)[0],
  developer: pkg.author || {},
  version: pkg.version,
});

const appGame = extractApp(require("../app-game/package.json"));
const appSolver = extractApp(require("../app-solver/package.json"));

module.exports = {
  mode,
  entry: { game: "../app-game/index", solver: "../app-solver/index" },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    path: path.join(__dirname, "../../dist"),
    filename: "[name]/[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/" + basePathname.map((x) => x + "/").join(""),
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
      },
      {
        exclude: /./,
        loader: "worker-plugin",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({ React: ["react"] }),

    // game
    new HtmlWebpackPlugin({
      title: appGame.name,
      filename: "game/index.html",
      chunks: ["game"],
      meta: {
        description: appGame.description,
        "og:type": "website",
        "og:title": appGame.name,
        "og:description": appGame.description,
        "og:image": "",
        "twitter:card": "summary_large_image",
        "twitter:title": appGame.name,
        "twitter:description": appGame.description,
        "twitter:image": "",
        "twitter:creator": appGame.developer.twitter,
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
    new HtmlWebpackPluginInlineStyle({
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("game"),
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        height:100%;
        background-image: radial-gradient(ellipse at center, rgba(99, 36, 40, 0) 0, rgba(99, 36, 40, 0.5) 130%);
        background-color: #f24b55;
      }`,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../app-game/assets/images/icon192.png"),
      prefix: "/" + [...basePathname, "game"].join("/"),
      output: "game/",
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("game"),
      favicons: {
        appName: appGame.name,
        appDescription: appGame.description,
        developerName: appGame.developer.name,
        developerURL: appGame.developer.url,
        version: appGame.version,
        background: "#f24b55",
        theme_color: "#f24b55",
        display: "standalone",
        orientation: "portrait",
        start_url: "/" + [...basePathname, "game"].join("/"),
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

    // solver
    new HtmlWebpackPlugin({
      title: appSolver.name,
      filename: "solver/index.html",
      chunks: ["solver"],
      meta: {
        description: appSolver.description,
        "og:type": "website",
        "og:title": appSolver.name,
        "og:description": appSolver.description,
        "og:image": "",
        "twitter:card": "summary_large_image",
        "twitter:title": appSolver.name,
        "twitter:description": appSolver.description,
        "twitter:image": "",
        "twitter:creator": appSolver.developer.twitter,
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
    new HtmlWebpackPluginInlineStyle({
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("solver"),
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        height:100%;
        background-image: radial-gradient(ellipse at center, rgba(69, 36, 99, 0) 0, rgba(69, 36, 99, 0.5) 130%);
        background-color: #aa4bf2;
      }`,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../app-solver/assets/images/icon192.png"),
      prefix: "/" + [...basePathname, "solver"].join("/"),
      output: "solver/",
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("solver"),
      favicons: {
        appName: appSolver.name,
        appDescription: appSolver.description,
        developerName: appSolver.developer.name,
        developerURL: appSolver.developer.url,
        version: appSolver.version,
        background: "#aa4bf2",
        theme_color: "#aa4bf2",
        display: "standalone",
        orientation: "portrait",
        start_url: "/" + [...basePathname, "solver"].join("/"),
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

    new GenerateSW({
      // swDest: '',
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
