<template>
  <div>
    <div class="section root">
    </div>
      <div class="grid">
        <div>
          <img src="https://unsplash.it/200/330" />
        </div>
        <div>
          <img src="https://unsplash.it/300/380" />
        </div>
        <div>
          <img src="https://unsplash.it/300/200" />
        </div>
        <div>
          <img src="https://unsplash.it/200/300" />
        </div>
        <div>
          <img src="https://unsplash.it/200/400" />
        </div>
        <div>
          <img src="https://unsplash.it/280/350" />
        </div>
        <div>
          <img src="https://unsplash.it/200/360" />
        </div>
        <div>
          <img src="https://unsplash.it/200/300" />
        </div>
        <div>
          <img src="https://unsplash.it/250/320" />
        </div>
        <div>
          <img src="https://unsplash.it/200/200" />
        </div>
        <div>
          <img src="https://unsplash.it/200/330" />
        </div>
        <div>
          <img src="https://unsplash.it/200/340" />
        </div>
        <div>
          <img src="https://unsplash.it/200/350" />
        </div>
        <div>
          <img src="https://unsplash.it/200/250" />
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Contact",
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
  background: #191c91;
}
.grid {
  top:0;
  z-index: 1;
  padding: 1em;
  column-count: 4;
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
@media(max-width: 800px){
  .grid{
    column-count: 3;
  }
}
@media(max-width: 600px){
  .grid{
    column-count: 2;
  }
}
@media(max-width: 400px){
  .grid{
    column-count: 1;
  }
}
img {
  width: 100%;
  margin-bottom: 1em;
}
</style>