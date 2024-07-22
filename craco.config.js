// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = { util: require.resolve("util/") };
      return webpackConfig;
    },
  },
};
