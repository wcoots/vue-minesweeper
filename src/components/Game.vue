<template>
    <div class="game">
        <GameHeader :game="game" />
        <Grid :game="game" />
        <GameFooter :game="game" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameHeader from './GameHeader.vue'
import GameFooter from './GameFooter.vue'
import Grid from './Grid.vue'
import { GameStatus } from '@/types'

export default Vue.extend({
    name: 'Game',
    components: {
        GameHeader,
        GameFooter,
        Grid,
    },
    created() {
        this.$store.commit('setupGame')
    },
    computed: {
        game(): GameStatus {
            return this.$store.getters.getGameInfo()
        },
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
