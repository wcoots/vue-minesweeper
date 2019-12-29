<template>
    <div class="tile" @click.left="leftClick" @click.right="rightClick">
        <span v-if="tile_info.status !== 'clicked'">
            <Status :status="tile_info.status" />
        </span>
        <span v-else-if="tile_info.mine">
            <Mine :exploded="tile_info.exploded" />
        </span>
        <span v-else>
            <Numba :number="tile_info.touching" />
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile } from '@/types'
import tileTypes from '@/components/tiles'

const { Mine, Numba, Status } = tileTypes

export default Vue.extend({
    name: 'Tile',
    props: {
        tile_id: {
            type: Number as () => Tile['id'],
            required: true,
        },
    },
    components: {
        Status,
        Mine,
        Numba,
    },
    computed: {
        tile_info(): Tile {
            return this.$store.getters.getTileInfo(this.tile_id)
        },
    },
    methods: {
        leftClick() {
            this.$store.dispatch('leftClickTile', this.tile_id)
        },
        rightClick() {
            this.$store.dispatch('rightClickTile', this.tile_id)
        },
    },
})
</script>

<style scoped>
.tile {
    background-color: #8b8b8b;
    width: 32px;
    height: 32px;
    float: left;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
