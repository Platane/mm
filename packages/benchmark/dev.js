const path = require("path");

require("@babel/register")({
  cache: false,
  extensions: [".ts", ".tsx"],
  cwd: path.join(__dirname, "..", ".."),
  rootMode: "upward",
});

require("./run").run(+process.argv[2]);
