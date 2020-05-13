<template>
  <div>
      <div class="nav-bg">
          <div class="logo">J</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Navbar',
};

</script>  

<style>
.nav-bg{
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    height:100vh;
    width: 60px;
    background-color: #2f303a;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
}
.logo{
    z-index: 11;
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 60px;
    font-size: 3.5em;
    color: #FF9C40;
}
</style>