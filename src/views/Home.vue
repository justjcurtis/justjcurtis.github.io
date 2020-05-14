<template>
  <div>
    <div class="section landing" v-bind:class="{flyaway:hasLanded}"></div>
    <div class="section hey">
      <div ref="a">
        <vue-typed-js
          @onReset="reset()"
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
          :strings="[
            'I write code for <span style=\'color: #FF9C40;\'>Desktop.<span>', 
            'I write code for <span style=\'color: #FF9C40;\'>Mobile.</span>', 
            'I write code for <span style=\'color: #FF9C40;\'>Web.</span>', 
            'I write code for <span style=\'color: #FF9C40;\'>Fun.</span>'
            ]"
        >
          <h1 class="typing"></h1>
        </vue-typed-js>
      </div>
    </div>
    <div class="home section"></div>
    <div class="triggerSpacer" v-bind:class="{hide:hasLanded}" />
    <span
      v-on:landed="landed()"
      ref="landertrigger"
      v-landertrigger
      v-bind:class="{hide:hasLanded}"
    />
  </div>
</template>

<script>
var hlc = false;
export default {
  data() {
    return {
      hasLanded: hlc,
      cursorPos: 0
    };
  },
  name: "Home",
  methods: {
    cursorStep() {
      if (this.cursorPos == 0) {
        this.$refs.a.firstChild.lastChild.remove();
        this.$refs.b.style.visibility = "visible";
        this.cursorPos++;
      } else if (this.cursorPos == 1) {
        setTimeout(() => {
          this.$refs.b.firstChild.lastChild.remove();
        }, 5500);
      }
    },
    landed() {
      hlc = true;
      this.hasLanded = true;
    },
  }
};
</script>

<style scoped>
.landing {
  position: fixed;
  background-color: #2f303a;
  overflow: hidden;
  z-index: 20;
}
.home {
  position: fixed;
  background-color: #242d83;
}
.triggerSpacer {
  z-index: -100;
  height: 200vh;
}
.hey {
  z-index: 110;
  position: fixed;
  top: 30vh;
  left: 10vw;
}
.lander-trigger {
  height: 1px;
  width: 100%;
}
.hide {
  opacity: 0;
  z-index: -1000;
  height: 0;
}
.flyaway {
  animation-name: left, fade, offscreen;
  animation-delay: 0ms, 1s, 1.5s;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw) translateX(+60px);
  }
}
@keyframes offscreen {
  from {
    transform: translateX(-100vw) translateX(+60px);
  }
  to {
    transform: translateX(-100vw);
  }
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
