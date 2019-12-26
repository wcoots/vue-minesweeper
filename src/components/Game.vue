<template>
    <div class="game">
        <Header />
        <Grid />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './Header.vue'
import Grid from './Grid.vue'
import Mine from './tile_types/Mine.vue'
import Explode from './tile_types/Explode.vue'

export default Vue.extend({
    name: 'Game',
    components: {
        Header,
        Grid,
    },
})
</script>

<style scoped>
.game {
    display: inline-block;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
}
</style>
