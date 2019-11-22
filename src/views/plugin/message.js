import message from "./message.vue";

let mess = {};
mess.install = function(_Vue, opt) {
  // console.log(_Vue, opt);
  // this.$message("");
  // this.$message({ type: 'success', text: "成功" });
  _Vue.prototype.$message = function(options) {
    // 合并用户的参数和默认参数
    let opt = { ...opt, ...options };
    console.log(opt);
    let m = _Vue.extend(message);
    // 产生一个实例
    let instance = new _Vue({
      render: h => h(m)
    }).$mount();
    // 实例上的el会被$el替换
    document.body.appendChild(instance.$el);
  };
};

export default mess;
