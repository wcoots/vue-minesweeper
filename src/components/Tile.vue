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
import Status from './tile_types/Status.vue'
import Mine from './tile_types/Mine.vue'
import Numba from './tile_types/Numba.vue'

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
        tile_status(): Tile['status'] {
            return this.tile_info.status
        },
    },
    watch: {
        tile_status() {
            localStorage.setItem('saved_grid', JSON.stringify(this.$store.getters.getGrid()))
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
