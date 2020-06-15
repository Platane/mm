import type { Compiler } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

// @ts-ignore
import { createHtmlTagObject } from "html-webpack-plugin/lib/html-tags";

class HtmlWebpackPluginPreload {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      "HtmlWebpackPluginPreload",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation as any).alterAssetTags.tap(
          "HtmlWebpackPluginPreload",
          (data) => {
            const fontExtensions = ["ttf", "otf", "woff", "woff2"];

            const { preloadFileExtension = [] } = (data.plugin as any).options;

            const { publicPath } = (compilation as any).options.output;

            Object.keys(compilation.assets).forEach((asset) => {
              const extension = path.extname(asset).slice(1);
              if (
                fontExtensions.includes(extension) &&
                preloadFileExtension.includes(extension)
              ) {
                const rel = "preload";
                const href = path.join(publicPath, asset);
                const as = "font";
                const type = "font/" + extension;
                const crossorigin = true;

                data.assetTags.styles.push(
                  createHtmlTagObject("link", {
                    rel,
                    href,
                    as,
                    type,
                    crossorigin,
                  })
                );
              }
            });

            return data;
          }
        );
      }
    );
  }
}

export default HtmlWebpackPluginPreload;
