let mockData = require("./mockData");
let SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
let path = require("path");

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
  },
  configureWebpack: config => {
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/Skeleton.js") // 骨架屏入口
          }
        },
        minimize: true,
        quiet: true
      })
    );
  },
  productionSourceMap: false // 不产生sourcemap文件
};
