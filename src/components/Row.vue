<template>
    <div>
        <div v-for="tile in tiles" v-bind:key="tile.id">
            <Tyle :tile_id="tile.id" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tyle from './Tile.vue'
import { Tile } from '@/types'

export default Vue.extend({
    name: 'Row',
    props: {
        tiles: {
            type: Array as () => Tile[],
            required: true,
        },
    },
    components: {
        Tyle,
    },
    computed: {
        rowStyles(): { width: string } {
            return {
                width: `${32 * this.tiles.length}px`,
            }
        },
    },
})
</script>

<style scoped>
.row {
    height: 30px;
    display: inline-block;
    vertical-align: top;
}
</style>
