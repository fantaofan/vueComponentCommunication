<template>
  <div class="home">
    <!-- 头部组件 -->
    <HomeHeader />
    <!-- 轮播图 -->
    <cube-slide :data="sliders" />
    <!-- 列表 -->
    <div class="view-wrapper">
      <cube-recycle-list class="list"
                         :size="size"
                         :on-fetch="onFetch"
                         :offset="offset"
                         ref="list">
        <template slot="item"
                  slot-scope="{ data }">
          <div :id="data.id"
               class="item"
               @click="handleClick(data)">
            <div>{{ data.price | money("$") }}</div>
            <div>{{ data.time }}</div>
          </div>
        </template>
      </cube-recycle-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as Types from "../store/mutations-types";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("home");
import HomeHeader from "../components/HomeHeader";

export default {
  name: "home",
  components: {
    HomeHeader
  },
  created() {
    // 异步请求 不需要被监控的数据 初始化数据
    // this.$store.dispatch(`home/${Types.SET_SLIDER}`);
    this[Types.SET_SLIDER]();
  },
  computed: {
    ...mapState(["sliders"])
  },
  mounted() {
    // dom挂载完成 this.$el 替换el
  },
  // beforeUpdate、updated两个合起来相当于watch
  beforeUpdate() {},
  updated() {},
  // 只能在当前组件使用
  // filters: {
  //   money(val, currency) {
  //     return val + currency;
  //   }
  // },
  data() {
    return {
      size: 50, // 一次拉取多少条数据
      offset: 100, // 距离底部多远
      items: []
    };
  },
  methods: {
    ...mapActions([Types.SET_SLIDER]),

    // 到底部的时候触发的事件
    onFetch() {
      let items = [];
      return new Promise(resolve => {
        // 模拟请求 50 条数据，因为 size 设置为 50
        setTimeout(() => {
          for (let i = 0; i < 50; i++) {
            items.push({
              id: i,
              avatar:
                "https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg",
              price: "123",
              time: "Thu Oct 25 2018 15:02:12 GMT+0800 (中国标准时间)"
            });
          }
          resolve(items);
        }, 1000);
      });
    },
    handleClick(data) {
      console.log("Item:" + data);
    }
  },
  mounted() {
    // 给列表绑定滚动事件
    this.$refs.list.$el.addEventListener("scroll", () => {
      // 做防抖：直到最后一次执行
      let timer;
      if (timer) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(() => {
          // 拿到当前滚动条的高度
          sessionStorage.setItem("listTop", this.$refs.list.$el.scrollTop);
        }, 500);
      }
    });
  },
  // keepAlive的组件生命周期activated、deactivated
  activated() {
    const listTop = sessionStorage.getItem("listTop");
    // console.log(listTop);
    this.$refs.list.scrollTop = listTop || 0;
  },
  deactivated() {}
};
</script>

<style lang="less" scoped>
.view-wrapper {
  position: fixed;
  width: 100%;
  height: calc(100vh - 270px);
}
</style>
