// 路由钩子
import store from "../store";
import * as Types from "../store/mutations-types";
// router.beforeEach 里面执行的
export default {
  // 取消请求
  CancelToken(to, from, next) {
    // 路由切换时取消请求
    store.commit(Types.CANCEL_TOKEN);
    next();
  },
  // 权限验证
  fn1(to, from, next) {
    next();
  }
};
