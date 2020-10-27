<template>
  <div>
    <div class="section root"></div>
    <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" class="masonry">
      <ImageCard
        :src="'/aMaze.png'"
        :title="'aMaze'"
        :short="'A maze generation and solving demonstration.'"
        :long="'I used random walk and A* algorithms to generate mazes that are random, solvable and find the optimal path in the least amount of search steps.'"
      />
      <ImageCard
        :src="'/randomquotes.png'"
        :title="'RandomQuotes'"
        :short="'A random quote generator.'"
        :long="'With twitter and clipboard itergration, you get random quotes to share, remember or save.'"
        :goto="'https://justjcurtis.dev/randomquotes'"
      />
      <!-- <ImageCard
        :src="'https://picsum.photos/200/300'"
        :title="'SmartRockets'"
        :short="'Genetically smart rockets.'"
        :long="'I created a simple neuro-evolution implementation which allows the rockets to find and optimise their path to the target over generations.'"
      /> -->
      <ImageCard
        :src="'/spacejnvaders.png'"
        :title="'SpaceJnvaders'"
        :short="'A custom SpaceInvaders implementation.'"
        :long="'A simple SpaceInvaders clone I made from scratch with a custom physics and game engine.'"
        :goto="'https://justjcurtis.dev/spaceJnvaders'"
      />
      <ImageCard
        :src="'/sort.png'"
        :title="'Sort'"
        :short="'Sorting algorithms demonstrated visually.'"
        :long="'A visual demo of selection, bubble & quick sort. All slowed down to allow comprehensible viewing.'"
        :goto="'https://justjcurtis.dev/sort'"
      />
      <ImageCard
        :src="'/bonemeal.png'"
        :title="'BoneMeal'"
        :short="'A dividend growth companion for Freetrade.io'"
        :long="'I use BoneMeal to help me find and pick stocks to add to my dividend growth portfolio. I made this public for the freetrade community and my friends.'"
        :goto="'https://bonemeal.app'"
      />
      <ImageCard
        :src="'/funemployed.png'"
        :title="'Funemployed'"
        :short="'An online Funemployed clone'"
        :long="'During the first Covid-19 lockdown I created this Funemployed clone to enable people to play together over video call or in their homes.'"
        :goto="'https://justjcurtis.dev/funemployed'"
      />
    </div>
    <div class="grid" v-if="false">
      
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ImageCard from "../components/ImageCard.vue";
export default {
  name: "Projects",
  components: {
    ImageCard
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
.root {
  top: 0;
  z-index: -1;
  position: fixed;
  background: #191c31;
}
@media all and (orientation: portrait) {
  .masonry {
    margin-top: 60px;
  }
}

@media all and (orientation: landscape) {
  .masonry {
    margin-left: 60px;
  }
}
</style>