import Vue from "vue";
import "./cube-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import filters from "./util/filters";
import mess from "./views/plugin/message.js";

// Vue.use() 使用哪个插件 自动调用插件上面install方法
Vue.use(mess, { time: 3000 });

// 创建一个vue实例
Vue.prototype.$bus = new Vue();

// 定义全局过滤器
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
