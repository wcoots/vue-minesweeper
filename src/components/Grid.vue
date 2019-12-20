<template>
    <div>
        <p>Minesweeper</p>
        <div class="grid" :style="gridStyles">
            <div v-for="row in y_length" v-bind:key="row">
                <Row :tiles="grid.filter(tile => tile.row === row - 1)" />
            </div>
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
            y_length: 7,
            total_mines: 12,
            grid: [] as Tile[],
            zero_groups: [] as ZeroGroup[],
        }
    },
    components: {
        Row,
    },
    created() {
        const wasd: Wasd = createGrid(this.x_length, this.y_length, this.total_mines)
        this.grid = wasd.grid
        this.zero_groups = wasd.zero_groups
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
    display: inline-block;
}
</style>
