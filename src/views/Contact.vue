<template>
  <div class="section bg">
    <div class="content"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "About",
  created() {
    this.land();
  },
  methods: {
    ...mapActions(["land"])
  }
};
</script>

<style scoped>
.bg {
  background: #191c31;
  overflow: hidden;
}
.content {
  height: 100vh;
}
</style>