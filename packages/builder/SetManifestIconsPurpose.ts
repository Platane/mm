import type { Compiler } from "webpack";

type Options = {
  purpose: string;
  inject?: ((a: any) => boolean) | boolean | undefined;
};

class SetManifestIconsPurpose {
  purpose = "";
  inject: Options["inject"];

  constructor({ purpose, inject }: Options) {
    this.purpose = purpose;
    this.inject = inject;
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap("SetManifestIconsPurpose", (compilation) => {
      Object.keys(compilation.assets)
        .filter((a) => a.includes("manifest.json"))
        .forEach((a) => {
          const content = compilation.assets[a].source().toString();

          const m = JSON.parse(content);
          m.icons.forEach((i: any) => (i.purpose = this.purpose));

          compilation.assets[a].source = () => JSON.stringify(m);
        });
    });
  }
}

export default SetManifestIconsPurpose;
