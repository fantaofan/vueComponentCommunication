let mockData = require("./mockData");

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },
  lintOnSave: false, // 是否开启ESLint
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      // app express提供的
      mockData(app);
    }
  }
};
