<template>
  <div id="app">
    <Navbar />
    <router-view id="#router" />
  </div>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  components: {
    Navbar
  }
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
  padding: 0;
}
</style>
