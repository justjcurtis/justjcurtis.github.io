<template>
  <div>
    <div class="section root">
    </div>
      <div class="grid">
        <ImageCard 
          :src="'https://picsum.photos/300/480'"
          :title="'aMaze'"
          :short="'A maze generation and solving demonstration.'"
          :long="'I used random walk and A* algorithms to generate mazes that are random, solvable and find the optimal path in the least amount of search steps.'"
        />
        <ImageCard 
          :src="'https://picsum.photos/300/380'"
          :title="'RandomQuotes'"
          :short="'A random quote generator.'"
          :long="'With twitter and clipboard itergration, you get random quotes to share, remember or save.'"
        />
        <ImageCard 
          :src="'https://picsum.photos/300/380'"
          :title="'SmartRockets'"
          :short="'Genetically smart rockets.'"
          :long="'I created a simple neuro-evolution implementation which allows the rockets to find and optimise their path to the target over generations.'"
        />
        <ImageCard 
          :src="'https://picsum.photos/300/380'"
          :title="'SpaceJnvaders'"
          :short="'A custom SpaceInvaders implementation.'"
          :long="'A simple SpaceInvaders clone I made from scratch with a custom physics and game engine.'"
        />
        <ImageCard 
          :src="'https://picsum.photos/300/480'"
          :title="'BoneMeal'"
          :short="'A dividend growth companion for Freetrade.io'"
          :long="'I use BoneMeal to help me find and pick stocks to add to my dividend growth portfolio. I made this public for the freetrade community and my friends.'"
          :goto="'https://bonemeal.app'"
        />
        <ImageCard 
          :src="'https://picsum.photos/300/380'"
          :title="'Funemployed'"
          :short="'An online Funemployed clone'"
          :long="'During the Covid-19 lockdown I created this Funemployed clone to take allow people to play together over video call or in their homes.'"
          :goto="'https://justjcurtis.dev/funemployed'"
        />
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ImageCard from '../components/ImageCard.vue';
export default {
  name: "Projects",
  components:{
    ImageCard,
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
  z-index: -1;
  position: fixed;
  background: #191c31;
}
.grid {
  top:0;
  z-index: 1;
  padding: 1em;
  column-count: 3;
}

@media all and (orientation:portrait) {
  .grid{
    margin:0;
    margin-top: 60px;
  }
}

@media all and (orientation:landscape) {
  .grid{
    margin:0;
    margin-left: 60px;
  }
}
@media(max-width: 900px){
  .grid{
    column-count: 3;
  }
}
@media(max-width: 640px){
  .grid{
    column-count: 2;
  }
}
@media(max-width: 400px){
  .grid{
    column-count: 1;
  }
}
</style>