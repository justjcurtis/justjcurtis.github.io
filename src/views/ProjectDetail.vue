<template>
    <div>
        <div class="project-wrapper" v-if="(id == 'aMaze')">
            <aMaze/>
        </div>
        <div class="project-wrapper" v-if="(id == 'RandomQuotes')">
            <randomQuotes/>
        </div>
        <div class="project-wrapper" v-if="(id == 'SmartRockets')">
            <smartRockets/>
        </div>
        <div class="project-wrapper" v-if="(id == 'SpaceJnvaders')">
            <spaceJnvaders/>
        </div>
    </div>
</template>

<script>
import aMaze from './project/aMaze/aMaze.vue'
import randomQuotes from './project/randomQuotes/randomQuotes.vue'
import smartRockets from './project/smartRockets/smartRockets.vue'
import spaceJnvaders from './project/spaceJnvaders/spaceJnvaders.vue'

export default {
    name:'ProjectDetail',
    props:['id'],
    components:{
        aMaze,
        randomQuotes,
        smartRockets,
        spaceJnvaders
    }
}
</script>

<style scoped>
h1{
    color: black;
}
.projectWrapper{
    width: 100%;
}
</style>