<template>
  <div>
      <div class="nav-bg">
          <div class="logo">J</div>
          <div class="buttons">
              <fa-icon v-on:click="navigate('home')" class="icon icon-active" :icon="['fas', 'home']"/>
              <fa-icon v-on:click="navigate('projects')" class="icon" :icon="['fas', 'th']"/>
              <fa-icon v-on:click="navigate('about')" class="icon" :icon="['fas', 'user-astronaut']"/>
              <fa-icon v-on:click="navigate('contact')" class="icon" :icon="['fas', 'comment']"/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Navbar',
    data(){
        return{
            stacklength:0,
        }
    },
    methods:{
        navigate(path){
            if(this.stacklength > 0 && path == "home"){
                this.$router.go(-this.stacklength);
                this.stacklength = 0;
            }else if(path != "home"){
                this.$router.push(path);
                this.stacklength++;
            }
        }
    }
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
    padding: 0;
    margin: 0;
}
.logo{
    z-index: 11;
    height: 60px;
    width: 60px;
    position: fixed;
    left: 0;
    top: 0;
    font-size: 3.5em;
    color: #FF9C40;
}
.buttons{
    z-index: 11;
    height: 100px;
    width: 60px;
    position: fixed;
    left: 0;
    top: 30%;
}
.icon{
    display: inline-block;
    z-index: 11;
    font-size: 35px;
    position: relative;
    color: #fff;
    margin-top: 30px;
}
.icon:hover{
    transition:all 0.2s ease;
    color: #464fa5;
}
.icon-active:hover{
    color: #FF9C40;
}
.icon-active{
    color: #FF9C40;
}
</style>