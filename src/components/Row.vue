<template>
    <div>
        <div v-for="tile in tiles" v-bind:key="tile.id">
            <Tile :is_mine="tile.mine" :touching="tile.touching" />
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
                width: `${30 * this.tiles.length}px`,
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
