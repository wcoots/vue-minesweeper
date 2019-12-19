<template>
    <div>
        <p>Minesweeper</p>
        <div class="grid" :style="gridStyles">
            <div v-for="row in y_length" v-bind:key="row">
                <Row :keys="grid.filter(key => key.row === row - 1)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Row from './Row.vue'
import { createGrid } from '../scripts/scripts'
import { Key } from '../types/types'

export default Vue.extend({
    name: 'Grid',
    data() {
        return {
            grid: [] as Key[],
            x_length: 10,
            y_length: 7,
            total_mines: 12,
        }
    },
    components: {
        Row,
    },
    created() {
        this.grid = createGrid(this.x_length, this.y_length, this.total_mines)
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
