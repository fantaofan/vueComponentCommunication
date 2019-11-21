<template>
  <div>这是孙子组件
    {{ $attrs.a }}
    <button @click="fn1">孙子调用爷爷的input事件</button>
    <button @click="$listeners.c">孙子组件调用fn</button>
  </div>
</template>

<script>
export default {
  name: "GrandSon",
  methods: {
    fn1() {
      this.$parent.$emit("input", 700);
    }
  }
};
</script>