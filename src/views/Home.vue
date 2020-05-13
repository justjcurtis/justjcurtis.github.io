<template>
  <div>
    <div class="section landing" v-if="!hasLanded">
      <div class="hey">
        <div ref="a">
          <vue-typed-js
            @onComplete="cursorStep()"
            :typeSpeed="50"
            :startDelay="1000"
            :cursorChar="'|'"
            :strings="['Hey, I\'m Jacson.']"
          >
            <h1 class="typing"></h1>
          </vue-typed-js>
        </div>
        <div ref="b" style="visibility: hidden;">
          <vue-typed-js
            @onComplete="cursorStep()"
            :smartBackspace="true"
            :typeSpeed="50"
            :backSpeed="40"
            :startDelay="3000"
            :cursorChar="'|'"
            :strings="['I write code for <span style=\'color: #FF9C40;\'>Desktop<span>', 'I write code for <span style=\'color: #FF9C40;\'>Mobile</span>', 'I write code for <span style=\'color: #FF9C40;\'>Web</span>', 'I write code for <span style=\'color: #FF9C40;\'>Fun.</span>']"
          >
            <h1 class="typing"></h1>
          </vue-typed-js>
        </div>
      </div>
    </div>
    <div class="home section"></div>
    <div class="triggerSpacer" v-if="!hasLanded" />
    <span v-on:landed="landed()" ref="landertrigger" v-landertrigger v-if="!hasLanded" />
  </div>
</template>

<script>
var cursorPos = 0;
export default {
  data() {
    return {
      hasLanded: true
    };
  },
  name: "Home",
  methods: {
    cursorStep() {
      if (cursorPos == 0) {
        this.$refs.a.firstChild.lastChild.remove();
        this.$refs.b.style.visibility = "visible";
        cursorPos++;
      } else {
        setTimeout(() => {
          this.$refs.b.firstChild.lastChild.remove();
        }, 5500);
      }
    },
    landed() {
      this.hasLanded = true;
    }
  }
};
</script>

<style scoped>
.landing {
  position: fixed;
  background-color: #2f303a;
  overflow: hidden;
  z-index: 100;
}
.home {
  position: absolute;
  position: fixed;
  background-color: #242d83;
}
.triggerSpacer {
  z-index: -100;
  height: 200vh;
}
.hey {
  position: relative;
  top: 30vh;
  left: 10vw;
}
.lander-trigger {
  height: 1px;
  width: 100%;
}
</style>
