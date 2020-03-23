const getConfig = (env) => {
  const plugins = [];

  const presets = ["@babel/preset-typescript", "@babel/preset-react"];

  if (env === "test") {
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  if (env === "production") {
    presets.push([
      "@babel/preset-env",
      {
        targets: {
          firefox: "70",
          chrome: "79",
          edge: "18",
          safari: "13",
          ios: "13",
          // ie: '11',
        },
        useBuiltIns: false,
        modules: false,
      },
    ]);
  }

  return { plugins, presets };
};

module.exports = (api) => getConfig(api.env());
