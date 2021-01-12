module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  devServer: {
    disableHostCheck: true,
    host: '192.168.72.1',
  },
};
