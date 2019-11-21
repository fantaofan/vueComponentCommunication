<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    // dom更新完成
    this.$nextTick(() => {
      this.$bus.$on("bus", data => {
        console.log(data);
      });
    });
  }
};
</script>