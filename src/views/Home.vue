<template>
  <div class="home">
    <div>
      表单
      <!-- key vuedom 就地复用 -->
      <!-- 组件化要细分：提高性能；尽量减少dom操作 -->
      <button @click="showform = !showform">切换input</button>
      <input v-if="showform"
             type="text"
             placeholder="用户名"
             key="1">
      <input v-else
             type="password"
             placeholder="密码"
             key="2">
    </div>

    <!-- 头部组件 -->
    <HomeHeader />

    <!-- currentC 组件名或者组件对象 -->
    <component v-bind:is="currentC"></component>
    <button @click="changeCo">改变当前组件</button>

    <!-- 轮播图 -->
    <cube-slide :data="sliders" />
    <!-- 父子组件 -->
    <!-- <Son v-model="lala" /> -->
    <!-- 同步改变值 -->
    <Son :lala.sync='lala' />

    <Son1 :a="[1,2,3,4]"
          @c='fn'
          @input="changeV"
          :value='value' />

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
import Son from "./Son";
import Son1 from "./Son1";
import Son2 from "./Son2";
import GrandSon1 from "./GrandSon1";

export default {
  name: "home",
  provide() {
    return { msg: "provide" };
  },
  components: {
    HomeHeader,
    Son,
    Son1,
    Son2,
    GrandSon1
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
      currentC: "Son2",
      showform: true,

      lala: 100,
      size: 50, // 一次拉取多少条数据
      offset: 100, // 距离底部多远
      items: [],
      value: 300000
    };
  },
  methods: {
    changeCo() {
      // 改变动态组件的值
      this.currentC = "GrandSon1";
      Object.freeze({ a: 1 }); // 冻结数据 不会再被getter和setter劫持
    },
    changeV(val) {
      this.value = val;
    },
    fn() {
      alert("我是fn");
    },

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
    // dom更新完成
    this.$nextTick(() => {
      this.$bus.$on("bus", data => {
        console.log(data);
      });
    });
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
