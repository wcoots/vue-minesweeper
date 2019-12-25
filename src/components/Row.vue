<template>
    <div>
        <div v-for="tile in tiles" v-bind:key="tile.id">
            <Tile :tile_id="tile.id" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tile from './Tile.vue'

export default Vue.extend({
    name: 'Row',
    props: {
        tiles: {
            type: Array,
            required: true,
        },
    },
    components: {
        Tile,
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
