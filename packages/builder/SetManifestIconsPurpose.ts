import type { Compiler } from "webpack";

type Options = {
  purpose: string;
};

class SetManifestIconsPurpose {
  purpose = "";

  constructor({ purpose }: Options) {
    this.purpose = purpose;
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
