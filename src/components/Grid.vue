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
    data() {
        return {
            saved_grid: localStorage.getItem('saved_grid'),
            saved_zero_groups: localStorage.getItem('saved_zero_groups'),
        }
    },
    components: {
        Row,
    },
    created() {
        if (this.saved_grid && this.saved_zero_groups) {
            this.$store.commit('setupGame', { saved_grid: this.saved_grid, saved_zero_groups: this.saved_zero_groups })
        } else {
            this.$store.commit('setupGame')
        }
    },
    computed: {
        gridStyles(): { width: string; height: string } {
            return {
                width: `${32 * this.game.x_length}px`,
                height: `${32 * this.game.y_length}px`,
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
