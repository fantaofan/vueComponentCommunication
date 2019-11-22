<template>
  <div>
    888888
    <GrandSon1 ref="GrandSon1"></GrandSon1>
  </div>
</template>
<script>
import GrandSon1 from "./GrandSon1";
export default {
  name: "Son2",
  components: {
    GrandSon1
  },
  mounted() {
    console.log(this.$refs.GrandSon1.name);
  }
};
</script>
