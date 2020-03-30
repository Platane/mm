const HtmlWebpackPlugin = require("html-webpack-plugin");
const { createHtmlTagObject } = require("html-webpack-plugin/lib/html-tags");

class HtmlWebpackPluginInlineStyle {
  constructor({ inlineStyle }) {
    this.inlineStyle = inlineStyle;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "HtmlWebpackPluginInlineStyle",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
          "HtmlWebpackPluginInlineStyle",
          (data) => {
            data.assetTags.styles.push(
              createHtmlTagObject("style", {}, this.inlineStyle)
            );

            return data;
          }
        );
      }
    );
  }
}
module.exports = HtmlWebpackPluginInlineStyle;
