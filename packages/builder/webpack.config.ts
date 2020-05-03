import * as path from "path";
import * as webpack from "webpack";
import SetManifestIconsPurpose from "./SetManifestIconsPurpose";
import HtmlWebpackPluginInlineStyle from "./HtmlWebpackPluginInlineStyle";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
// @ts-ignore
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin";
// @ts-ignore
import { GenerateSW } from "workbox-webpack-plugin";
// @ts-ignore
import TerserPlugin from "terser-webpack-plugin";
// @ts-ignore
import RobotstxtPlugin from "robotstxt-webpack-plugin";
// @ts-ignore
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

import * as pkgGame from "../app-game/package.json";
import * as pkgSolver from "../app-solver/package.json";

const mode =
  ("production" === process.env.NODE_ENV && "production") || "development";

const basePathname = (process.env.BASE_PATHNAME || "")
  .split("/")
  .filter(Boolean);

const extractApp = (pkg: any) => ({
  url: pkg.homepage,
  name: pkg.description.split("__")[1] || pkg.name,
  description: pkg.description.split("__").slice(-1)[0],
  developer: pkg.author || {},
  version: pkg.version,
});

const appGame = extractApp(pkgGame);
const appSolver = extractApp(pkgSolver);

const config: webpack.Configuration = {
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

      // for webworker
      {
        exclude: /./,
        loader: "workerize-loader",
      },

      // for shared worker
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
    new SetManifestIconsPurpose({
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("game"),
      purpose: "any maskable",
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
      // @ts-ignore
      logo: path.resolve(__dirname, "../app-game/assets/images/icon192.png"),
      prefix: "/" + [...basePathname, "game"].join("/"),
      inject: (htmlPlugin: any) => htmlPlugin.options.filename.includes("game"),
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
        start_url: "/" + [...basePathname, "game"].join("/") + "/",
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
      inject: (htmlPlugin: any) =>
        htmlPlugin.options.filename.includes("solver"),
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        height:100%;
        background-image: radial-gradient(ellipse at center, rgba(69, 36, 99, 0) 0, rgba(69, 36, 99, 0.5) 130%);
        background-color: #aa4bf2;
      }`,
    }),
    new SetManifestIconsPurpose({
      inject: (htmlPlugin) => htmlPlugin.options.filename.includes("solver"),
      purpose: "any maskable",
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../app-solver/assets/images/icon192.png"),
      prefix: "/" + [...basePathname, "solver"].join("/"),
      inject: (htmlPlugin: any) =>
        htmlPlugin.options.filename.includes("solver"),
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
        start_url: "/" + [...basePathname, "solver"].join("/") + "/",
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

    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          disallow: "/",
          crawlDelay: 10,
        },
      ],
    }),

    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
      analyzerMode: "static",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,

      // @ts-ignore
      filename: "[contenthash].js",

      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

    ...(mode === "production" && {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: true })],
    }),
  },

  devtool: false,

  // @ts-ignore
  devServer: {
    https: true,
    useLocalIp: false,
    open: true,
    openPage: "game",
  },
};

export default config;
