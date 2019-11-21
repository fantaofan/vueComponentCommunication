<template>
  <div>这是儿子组件
    {{msg}}
    <!-- {{value}} -->
    {{lala}}
    <button @click="change">点击改变</button>
    <!-- <button @click="busChange">eventbus</button> -->
  </div>
</template>

<script>
export default {
  inject: ["msg"],
  mounted() {
    console.log(1);
    this.$bus.$emit("bus", 1000);
  },
  props: {
    // value: {
    //   type: Number
    // }
    lala: {
      type: Number
    }
  },
  methods: {
    // change() {
    //   this.$emit("input", 200);
    // }
    change() {
      this.$emit("update:lala", 200);
    }
    // busChange() {
    //   this.$bus.$emit("bus", 1000);
    // }
  }
};
</script>
