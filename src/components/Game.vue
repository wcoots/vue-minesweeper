<template>
    <div class="game" :style="gameStyles">
        <GameHeader :game="game" :style="gameStyles" />
        <GameStats :game="game" :style="gameStyles" />
        <Grid :game="game" />
        <GameFooter :game="game" :style="gameStyles" />
        <GameControls :game="game" :style="gameStyles" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameHeader from './GameHeader.vue'
import GameStats from './GameStats.vue'
import Grid from './Grid.vue'
import GameFooter from './GameFooter.vue'
import GameControls from './GameControls.vue'
import { GameStatus, GameMode } from '@/types'

export default Vue.extend({
    name: 'Game',
    components: {
        GameHeader,
        GameStats,
        Grid,
        GameFooter,
        GameControls,
    },
    created() {
        this.$store.commit('setupGame', { mode: 'preset', preset_name: 'beginner' } as GameMode)
        this.$store.commit('startGame')
    },
    computed: {
        game(): GameStatus {
            return this.$store.getters.getGameInfo()
        },
        gameStyles(): { width: string } {
            return { width: this.game.x_length >= 9 ? `${this.game.x_length * 32}px` : `288px` }
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
