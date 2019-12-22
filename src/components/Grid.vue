<template>
    <div class="grid" :style="gridStyles" oncontextmenu="return false;">
        <div v-for="row in y_length" v-bind:key="row">
            <Row :tiles="grid.filter(tile => tile.row === row - 1)" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Row from './Row.vue'
import { createGrid } from '../scripts/scripts'
import { Tile, ZeroGroup } from '../types/types'

interface Wasd {
    grid: Tile[]
    zero_groups: ZeroGroup[]
}

export default Vue.extend({
    name: 'Grid',
    data() {
        return {
            x_length: 10,
            y_length: 10,
            total_mines: 15,
            grid: [] as Tile[],
        }
    },
    components: {
        Row,
    },
    created() {
        const { grid, zero_groups } = createGrid(this.x_length, this.y_length, this.total_mines)
        this.grid = grid
        this.$store.commit('setGrid', grid)
        this.$store.commit('setZeroGroups', zero_groups)
    },
    computed: {
        gridStyles(): { width: string; height: string } {
            return {
                width: `${30 * this.x_length}px`,
                height: `${30 * this.y_length}px`,
            }
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
