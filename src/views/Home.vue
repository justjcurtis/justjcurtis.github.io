<template>
  <div>
    <div
      class="section landing"
      v-if="!this.preLanded"
      v-bind:class="{ flyaway: hasLanded }"
    ></div>
    <div class="section hey" v-if="this.preLanded || this.typingFinished">
      <h1 class="typing">Hey, I'm Jacson.</h1>
      <div>
        <vue-typed-js
          :loop="true"
          :smartBackspace="true"
          :typeSpeed="50"
          :backSpeed="40"
          :cursorChar="'|'"
          :strings="['Desktop.', 'Mobile.', 'Web.', 'Fun.']"
        >
          <h1>
            I write code for <span class="typing" style="color: #ff9c40; background-color: #191c31;"></span>
          </h1>
        </vue-typed-js>
      </div>
    </div>
    <div class="section hey" v-if="!this.preLanded && !this.typingFinished">
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
      <div ref="b" style="visibility: hidden">
        <vue-typed-js
          @onComplete="cursorStep()"
          :smartBackspace="true"
          :typeSpeed="50"
          :backSpeed="40"
          :startDelay="3000"
          :cursorChar="'|'"
          :strings="[
            'I write code for <span style=\'color: #FF9C40; background-color: #191c31;\'>Desktop.<span>',
            'I write code for <span style=\'color: #FF9C40; background-color: #191c31;\'>Mobile.</span>',
            'I write code for <span style=\'color: #FF9C40; background-color: #191c31;\'>Web.</span>',
            'I write code for <span style=\'color: #FF9C40; background-color: #191c31;\'>Fun.</span>',
          ]"
        >
          <h1 class="typing"></h1>
        </vue-typed-js>
      </div>
    </div>
    <div class="home section">
      <img id="avatar" src="../assets/avatar_2.jpg" />
    </div>
    <div class="triggerSpacer" v-bind:class="{ hide: hasLanded }" />
    <span
      v-on:landed="land()"
      ref="landertrigger"
      v-landertrigger
      v-bind:class="{ hide: hasLanded }"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.preLanded = this.hasLanded;
  },
  computed: mapGetters(["hasLanded"]),
  data() {
    return {
      cursorPos: 0,
      preLanded: false,
      typingFinished: false,
    };
  },
  name: "Home",
  methods: {
    ...mapActions(["land"]),
    cursorStep() {
      if (this.cursorPos == 0) {
        this.$refs.a.firstChild.lastChild.remove();
        this.$refs.b.style.visibility = "visible";
        this.cursorPos++;
      } else if (this.cursorPos == 1) {
        setTimeout(() => {
          this.$refs.b.firstChild.lastChild.remove();
          this.typingFinished = true;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
#avatar {
  margin: 18vh 64vw;
  width: 30vh;
  border-radius: 30vh;
}
.landing {
  position: fixed;
  background-color: #2f303a;
  overflow: hidden;
  z-index: 20;
}
.home {
  position: fixed;
  background-color: #191c31;
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
  text-align: left;
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
@media all and (orientation: portrait) {
  @keyframes left {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100vh) translateY(+60px);
    }
  }
  @keyframes offscreen {
    from {
      transform: translateY(-100vh) translateY(+60px);
    }
    to {
      transform: translateY(-100vh);
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
}
@media all and (orientation: landscape) {
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
}
</style>
