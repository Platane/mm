import type { Compiler } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

// @ts-ignore
import { createHtmlTagObject } from "html-webpack-plugin/lib/html-tags";

class HtmlWebpackPluginInlineStyle {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      "HtmlWebpackPluginInlineStyle",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation as any).alterAssetTags.tap(
          "HtmlWebpackPluginInlineStyle",
          (data) => {
            const { inlineStyle } = (data.plugin as any).options;

            if (inlineStyle) {
              data.assetTags.styles.push(
                createHtmlTagObject("style", {}, inlineStyle)
              );
            }

            return data;
          }
        );
      }
    );
  }
}

export default HtmlWebpackPluginInlineStyle;
