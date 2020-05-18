<template>
  <div>
    <div class="section bg"></div>
    <div class="container">
      <div class="avatar-wrapper">
        <img id="avatar" src="../assets/avatar_1.jpg" />
      </div>
      <Timeline id="timeline" />
    </div>
  </div>
</template>

<script>
import Timeline from "../components/Timeline";
import { mapActions } from "vuex";
export default {
  name: "About",
  components: {
    Timeline
  },
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
  z-index: -1;
  position: Fixed;
  background: #191c31;
  overflow: hidden;
}
#avatar {
  position: fixed;
  margin-left: -100px;
  margin-top: 1em;
  width: 200px;
  border-radius: 50%;
}
.container {
  padding: 1em;
  top: 0;
}
.avatar-wrapper {
  z-index: 9;
  top: 0;
  position: fixed;
  height: 200px;
  background: linear-gradient(
    rgba(25, 28, 49, 1),
    rgba(25, 28, 49, 1),
    rgba(25, 28, 49, 1),
    rgba(25, 28, 49, 0)
  );
  width: 100%;
  margin-left: -60px;
  padding-left: 1em;
}
#timeline {
  margin-top: 220px;
}
@media (orientation: portrait) {
  #avatar {
    width: 160px;
  }
  .avatar-wrapper {
    top: 60px;
    margin-left: 0px;
    height: 200px;
  }
  #timeline {
    margin-top: 220px;
  }
}
@media (orientation: landscape) {
  .container {
    margin-left: 60px;
  }
}
</style>