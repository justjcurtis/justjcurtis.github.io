<template>
  <div id="app">
    <Navbar />
    <router-view id="#router" />
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  components: {
    Navbar
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: DejaVu Sans Mono, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
.typed-cursor {
  font-size: 32px;
}

h1 {
  font-size: 1.6em;
}

#app::-webkit-scrollbar {
  width: 0 !important;
}

#app {
  overflow: -moz-scrollbars-none;
}

#app {
  -ms-overflow-style: none;
}
.section {
  height: 100vh;
  width: 100%;
  margin: 0;
  max-width: 100%;
}
@media(orientation:portrait) {
  .section{
    padding-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
  }
}

@media(orientation:landscape) {
  .section{
    padding-left: 60px;
    width: calc(100% - 60px);
  }
}
.pointer {cursor: pointer;}
</style>
