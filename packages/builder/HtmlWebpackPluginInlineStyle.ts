import type { Compiler, Plugin } from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

// @ts-ignore
import { createHtmlTagObject } from "html-webpack-plugin/lib/html-tags";

type Options = {
  inlineStyle: string;
  inject?: ((a: any) => boolean) | boolean | undefined;
};

class HtmlWebpackPluginInlineStyle {
  inlineStyle = "";
  inject: Options["inject"];

  constructor({ inlineStyle, inject }: Options) {
    this.inlineStyle = inlineStyle;
    this.inject = inject;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      "HtmlWebpackPluginInlineStyle",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation as any).alterAssetTags.tap(
          "HtmlWebpackPluginInlineStyle",
          (data: any) => {
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

export default HtmlWebpackPluginInlineStyle;
