<template>
    <div class="grid" :style="gridStyles" oncontextmenu="return false;">
        <div v-for="row in game.y_length" v-bind:key="row">
            <Row :tiles="grid.filter(tile => tile.row === row - 1)" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile, ZeroGroup, GameStatus } from '@/types'
import Row from './Row.vue'

export default Vue.extend({
    name: 'Grid',
    components: {
        Row,
    },
    props: {
        game: {
            type: Object as () => GameStatus,
            required: true,
        },
    },
    computed: {
        grid(): Tile[] {
            return this.$store.getters.getGrid()
        },
        gridStyles(): { width: string; height: string } {
            return {
                width: `${32 * this.game.x_length}px`,
                height: `${32 * this.game.y_length}px`,
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
    cursor: pointer;
}
</style>
