const { ProvidePlugin } = require("webpack");

module.exports = {
  staticDirs: ["../public"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@react-theming/storybook-addon",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  // FIXME: Temporary fix for: https://github.com/facebook/create-react-app/issues/11756
  webpackFinal: async (config, { configType }) => {
    config.plugins.push(
      new ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
      zlib: false,
      buffer: require.resolve("buffer"),
      url: require.resolve("url"),
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    };

    return config;
  },
};
