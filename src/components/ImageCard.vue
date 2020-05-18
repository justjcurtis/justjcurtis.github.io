<template>
  <div>
    <div v-masonry-tile class="item">
      <div class="scroll-tracker"></div>
      <div ref="card" class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img ref="img" class="pointer" @click="flip()" :src="src" />
          </div>
          <div ref="cardBack" class="flip-card-back pointer" @click="flip()">
            <h1>{{title}}</h1>
            <p>{{short}}</p>
            <p>{{long}}</p>
            <div class="icon-wrapper">
              <router-link v-if="!goto" :to="{name:'projectDetail', params: { id: title }}">
                <fa-icon class="icon" :icon="['fas', 'rocket']" />
              </router-link>
              <a v-if="goto" :href="goto" target="_blank">
                <fa-icon class="icon" :icon="['fas', 'rocket']" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCard",
  props: ["src", "title", "short", "long", "goto"],
  data() {
    return {
      flipped: false
    };
  },
  methods: {
    onResize() {
      this.setHeights();
    },
    flip() {
      if (!this.flipped) {
        this.setHeights();
        this.$refs.card.classList.add("flip-card-clicked");
      } else {
        this.$refs.card.classList.remove("flip-card-clicked");
      }
      this.flipped = !this.flipped;
    },
    setHeights() {
      var h = this.$refs.img.clientHeight;
      this.$refs.card.style.height = `${h}px`;
      this.$refs.cardBack.style.height = `${h}px`;
      this.$refs.cardBack.style.marginTop = `-${h}px`;
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.onResize);
    // setTimeout(this.setHeights(), 500)
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped>
.item {
  width: 23%;
  margin-left: 1em;
  margin-top: 1em;
}

h1 {
  font-size: 1.5vw;
}
p {
  font-size: 1.1vw;
}
.icon {
  font-size: 3vw;
}
@media (max-width: 1000px) {
  .item {
    width: 30%;
  }
  h1 {
    font-size: 1.2em;
  }
  p {
    font-size: 0.8em;
  }
  .icon {
    font-size: 5vw;
  }
}
@media (max-width: 640px) {
  .item {
    width: 45%;
  }
  h1 {
    font-size: 1.2em;
  }
  p {
    font-size: 0.8em;
  }
  .icon {
    font-size: 7vw;
  }
}
@media (max-width: 400px) {
  .item {
    width: 90%;
  }
  h1 {
    font-size: 1.2em;
  }
  p {
    font-size: 0.8em;
  }
  .icon {
    font-size: 9vw;
  }
}
img {
  width: 100%;
}

.flip-card {
  text-align: justify;
  width: 100%;
  height: 100%;
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  margin-bottom: 1em;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card-clicked .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-back {
  height: 0;
  margin: 0;
  padding: 0;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: transparent;
  color: black;
}

/* Style the back side */
.flip-card-back {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ff9c40;
  font-weight: bold;
  color: #191c31;
  transform: rotateY(180deg);
}

.icon {
  display: block;
  position: relative;
  color: #191c31;
}
.before-enter + .flip-card {
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s ease-out;
}
.enter + .flip-card {
  opacity: 1;
  transform: translateY(0);
}
p,
h1,
.icon-wrapper {
  display: flex;
  margin: 0.5em;
  justify-content: center;
}
.scroll-tracker {
  height: 1px;
  background: transparent;
  margin: 0;
  padding: 0;
  width: 1px;
}
a {
  z-index: 1;
  display: inline-block;
}
</style>