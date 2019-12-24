<template>
    <div class="grid" :style="gridStyles" oncontextmenu="return false;">
        <div v-for="row in game.y_length" v-bind:key="row">
            <Row :tiles="grid.filter(tile => tile.row === row - 1)" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Row from './Row.vue'
import { Tile, ZeroGroup, GameStatus } from '@/types'

interface Wasd {
    grid: Tile[]
    zero_groups: ZeroGroup[]
}

export default Vue.extend({
    name: 'Grid',
    components: {
        Row,
    },
    created() {
        this.$store.commit('setupGame')
    },
    computed: {
        gridStyles(): { width: string; height: string } {
            return {
                width: `${30 * this.game.x_length}px`,
                height: `${30 * this.game.y_length}px`,
            }
        },
        game(): GameStatus {
            return this.$store.getters.getGameInfo()
        },
        grid(): Tile[] {
            return this.$store.getters.getGrid()
        },
    },
})
</script>

<style scoped>
.grid {
    border: 2px solid #8c8c8c;
    display: block;
    clear: both;
}
</style>
