import * as fs from "fs";
import * as url from "url";
import * as path from "path";
import * as webpack from "webpack";
import SetManifestIconsPurpose from "./SetManifestIconsPurpose";
import HtmlWebpackPluginInlineStyle from "./HtmlWebpackPluginInlineStyle";
import HtmlWebpackPluginPreload from "./HtmlWebpackPluginPreload";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { GenerateSW } from "workbox-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
// @ts-ignore
import RobotstxtPlugin from "robotstxt-webpack-plugin";

import * as themeGame from "../app-game/components/theme";
import * as themeSolver from "../app-solver/components/theme";

const mode =
  ("production" === process.env.NODE_ENV && "production") || "development";

const publicUrl = process.env.PUBLIC_URL || "";

const basePathname = (
  process.env.BASE_PATHNAME ||
  url.parse(publicUrl).pathname ||
  ""
)
  .split("/")
  .filter(Boolean);

const extractApp = (pkg: any) => ({
  url: pkg.homepage,
  name: pkg.description.split("__")[1] || pkg.name,
  description: pkg.description.split("__").slice(-1)[0],
  developer: pkg.author || {},
  version: pkg.version,
});

const appGame = {
  ...extractApp(
    JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../app-game/package.json"))
        .toString()
    )
  ),
  screenshot_1600x800:
    "/" + [...basePathname, "game", "screenshot_1600x800.jpg"].join("/"),
};
const appSolver = {
  ...extractApp(
    JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../app-solver/package.json"))
        .toString()
    )
  ),
  screenshot_1200x800:
    "/" + [...basePathname, "solver", "screenshot_1200x800.jpg"].join("/"),
};

const outputPath = path.join(__dirname, "../../dist");

const config: webpack.Configuration = {
  mode,
  entry: { game: "../app-game/index", solver: "../app-solver/index" },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    path: outputPath,
    filename: "[name]/[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/" + basePathname.map((x) => x + "/").join(""),
  },
  module: {
    rules: [
      {
        test: [/\.(bmp|gif|png|jpeg|jpg|svg)$/, /\.(otf|ttf|woff|woff2)$/],
        loader: "file-loader",
      },

      {
        exclude: /node_modules/,
        test: /\.(js|ts|tsx)$/,
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
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.BASE_PATHNAME": JSON.stringify(
        "/" + basePathname.map((x) => x + "/").join("")
      ),
    }),

    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({ React: ["react"] }),

    new SetManifestIconsPurpose({
      purpose: "any maskable",
    }),
    new HtmlWebpackPluginPreload(),
    new HtmlWebpackPluginInlineStyle(),

    // game
    new HtmlWebpackPlugin({
      preloadFileExtension: ["ttf", "otf", "woff", "woff2"],
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        min-height:100%;
        ${themeGame.backgroundStyle.styles}
      }`,
      title: appGame.name,
      filename: "game/index.html",
      chunks: ["game"],
      meta: {
        description: appGame.description,
        "og:type": "website",
        "og:title": appGame.name,
        "og:description": appGame.description,
        "og:image": appGame.screenshot_1600x800,
        "twitter:card": "summary_large_image",
        "twitter:title": appGame.name,
        "twitter:description": appGame.description,
        "twitter:creator": appGame.developer.twitter,
        "twitter:image": appGame.screenshot_1600x800,
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
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../app-game/assets/images/icon.png"),
      publicPath: "/" + basePathname.join("/"),
      prefix: "game/",
      inject: (htmlPlugin: any) => htmlPlugin.options.filename.includes("game"),
      favicons: {
        appName: appGame.name,
        appDescription: appGame.description,
        developerName: appGame.developer.name,
        developerURL: appGame.developer.url,
        version: appGame.version,
        background: themeGame.background,
        theme_color: themeGame.background,
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "../app-game/assets/images/screenshot_1600x800.jpg"
          ),
          to: "game/",
        },
        {
          from: path.resolve(
            __dirname,
            "../app-game/assets/images/screenshot_800x800.jpg"
          ),
          to: "game/",
        },
        {
          from: path.resolve(
            __dirname,
            "../app-solver/assets/images/screenshot_1200x800.jpg"
          ),
          to: "solver/",
        },
      ],
    }),

    // solver
    new HtmlWebpackPlugin({
      inlineStyle: `html{
        touch-action: none;
        user-select: none;
        min-height:100%;
        ${themeSolver.backgroundStyle.styles}
      }`,
      title: appSolver.name,
      filename: "solver/index.html",
      chunks: ["solver"],
      meta: {
        description: appSolver.description,
        "og:type": "website",
        "og:title": appSolver.name,
        "og:description": appSolver.description,
        "og:image": appSolver.screenshot_1200x800,
        "twitter:card": "summary_large_image",
        "twitter:title": appSolver.name,
        "twitter:description": appSolver.description,
        "twitter:image": appSolver.screenshot_1200x800,
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
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../app-solver/assets/images/icon.png"),
      publicPath: "/" + basePathname.join("/"),
      prefix: "solver/",
      inject: (htmlPlugin: any) =>
        htmlPlugin.options.filename.includes("solver"),
      favicons: {
        appName: appSolver.name,
        appDescription: appSolver.description,
        developerName: appSolver.developer.name,
        developerURL: appSolver.developer.url,
        version: appSolver.version,
        background: themeSolver.background,
        theme_color: themeSolver.background,
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
          allow: "/",
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
      cacheGroups: {
        vendors: {
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
