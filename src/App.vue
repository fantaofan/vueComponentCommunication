<template>
  <div id="app">
    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <div class="footer">
      <cube-tab-bar v-model="selectedLabelDefault"
                    :data="tabs"
                    @change="tabChange">
      </cube-tab-bar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: "/", // 默认选中的导航
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home" // icon样式
        },
        {
          label: "About",
          value: "/about",
          icon: "cubeic-like"
          // icon: "iconfont icon-zhuye"
        }
      ]
    };
  },
  watch: {
    $route: {
      // 如果有立即执行，需要写成对象形式
      handler(to, from) {
        this.selectedLabelDefault = to.path;
      },
      immediate: true // 立即执行
    }
  },
  methods: {
    // 切换路由
    tabChange(label) {
      this.$router.push(label);
    }
  }
};
</script>
<style lang="less">
#app,
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1;
}
.footer {
  height: 58px;
  border-top: 1px solid #e3e3e3;
}
</style>
