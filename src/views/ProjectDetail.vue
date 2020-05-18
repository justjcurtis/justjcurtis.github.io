<template>
  <div class="section">
    <div class="project-wrapper" v-if="(id == 'aMaze')">
      <aMaze />
    </div>
    <div class="project-wrapper" v-if="(id == 'RandomQuotes')">
      <randomQuotes />
    </div>
    <div class="project-wrapper" v-if="(id == 'SmartRockets')">
      <smartRockets />
    </div>
    <div class="project-wrapper" v-if="(id == 'SpaceJnvaders')">
      <spaceJnvaders />
    </div>
  </div>
</template>

<script>
import aMaze from "./project/aMaze/aMaze.vue";
import randomQuotes from "./project/randomQuotes/randomQuotes.vue";
import smartRockets from "./project/smartRockets/smartRockets.vue";
import spaceJnvaders from "./project/spaceJnvaders/spaceJnvaders.vue";
import { mapActions } from "vuex";
export default {
  name: "ProjectDetail",
  props: ["id"],
  components: {
    aMaze,
    randomQuotes,
    smartRockets,
    spaceJnvaders
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
h1 {
  color: black;
}
.projectWrapper {
  width: 100%;
}
.section {
  background: #191c31;
}
</style>