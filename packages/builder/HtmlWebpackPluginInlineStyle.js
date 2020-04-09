const HtmlWebpackPlugin = require("html-webpack-plugin");
const { createHtmlTagObject } = require("html-webpack-plugin/lib/html-tags");

class HtmlWebpackPluginInlineStyle {
  constructor({ inlineStyle, inject }) {
    this.inlineStyle = inlineStyle;
    this.inject = inject;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "HtmlWebpackPluginInlineStyle",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
          "HtmlWebpackPluginInlineStyle",
          (data) => {
            if (
              this.inject === true ||
              this.inject === undefined ||
              (typeof this.inject === "function" && this.inject(data.plugin))
            ) {
              data.assetTags.styles.push(
                createHtmlTagObject("style", {}, this.inlineStyle)
              );
            }

            return data;
          }
        );
      }
    );
  }
}
module.exports = HtmlWebpackPluginInlineStyle;
