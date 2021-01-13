module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
