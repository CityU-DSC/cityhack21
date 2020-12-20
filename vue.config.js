module.exports = {
  transpileDependencies: ["vuetify", "vue-tel-input-vuetify"],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
