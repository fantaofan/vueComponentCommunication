<template>
  <div>
    {{ value }}
    这是son1组件
    <button @click="changeT">子调用父的input事件</button>
    <button @click="$listeners.c">子组件调用父组件的fn</button>
    <!-- attrs 如果再往下级组件传值 需要使用v-bind -->
    <!-- listeners 如果再往下级组件传递方法 需要使用v-on -->
    <GrandSon v-bind="$attrs"
              v-on="$listeners"></GrandSon>
    <div v-for="x in $attrs.a"
         :key="x">
      {{ x }}
    </div>
  </div>
</template>

<script>
import GrandSon from "./GrandSon";
export default {
  // props: ["value"],
  props: {
    value: {
      type: Number
    }
  },
  methods: {
    changeT() {
      // this.$parent.value = 50000;
      this.$emit("input", 50000);
    }
  },
  inheritAttrs: false, // 不显示继承的attrs（在控制台Elements可以查看）
  components: {
    GrandSon
  }
};
</script>
