const path = require("path");

require("@babel/register")({
  cache: false,
  extensions: [".ts"],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  presets: ["@babel/preset-typescript"],
});

module.exports = require("./webpack.config.ts");
