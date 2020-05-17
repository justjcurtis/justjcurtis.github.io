<template>
  <div>
    <div class="nav-bg">
      <div class="logo">J</div>
      <div class="buttons">
        <router-link :to="{name:'home'}"><fa-icon class="icon" :icon="['fab', 'houzz']" /></router-link>
        <router-link :to="{name:'projects'}"><fa-icon class="icon" :icon="['fas', 'th']" /></router-link>
        <router-link :to="{name:'about'}"><fa-icon class="icon" :icon="['fas', 'user-astronaut']" /></router-link>
        <router-link :to="{name:'contact'}"><fa-icon class="icon" :icon="['fas', 'envelope']" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>  

<style>
@media all and (orientation: portrait) {
  .nav-bg {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background-color: #2f303a;
    padding: 0;
    margin: 0;
  }
  .logo {
    z-index: 11;
    height: 60px;
    width: 60px;
    position: fixed;
    left: 0;
    top: -5px;
    font-size: 3.5em;
    color: #ff9c40;
  }
  .buttons {
    z-index: 11;
    height: 60px;
    width: 300px;
    position: fixed;
    left: 40%;
    top: 0;
  }
  .icon {
    display: inline-block;
    z-index: 11;
    font-size: 35px;
    position: relative;
    color: #fff;
    margin-right: 30px;
    margin-top: 10px;
  }
}
@media all and (orientation: landscape) {
  .nav-bg {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 60px;
    background-color: #2f303a;
    padding: 0;
    margin: 0;
  }
  .logo {
    z-index: 11;
    height: 60px;
    width: 60px;
    position: fixed;
    left: 0;
    top: 0;
    font-size: 3.5em;
    color: #ff9c40;
  }
  .buttons {
    z-index: 11;
    height: 100px;
    width: 60px;
    position: fixed;
    left: 0;
    top: 30%;
  }
  .icon {
    display: inline-block;
    z-index: 11;
    font-size: 35px;
    position: relative;
    color: #fff;
    margin-top: 30px;
    margin-right: 0;
  }
}
.icon:hover {
  transition: all 0.2s ease;
  color: #464fa5;
}
.router-link-exact-active:hover {
  color: #ff9c40;
}
.router-link-exact-active > .icon {
  color: #ff9c40;
}
</style>