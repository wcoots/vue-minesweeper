<template>
    <div
        class="tile"
        v-bind:class="{
            clicked: clicked,
        }"
        :style="styles"
        @click.left="leftClick"
        @click.right="rightClick"
    >
        {{ tile_info.value }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile } from '@/types'

export default Vue.extend({
    name: 'Tile',
    props: {
        tile_id: {
            type: Number,
            required: true,
        },
    },
    computed: {
        tile_info(): Tile {
            return this.$store.getters.getTileInfo(this.tile_id)
        },
        clicked(): boolean {
            return this.tile_info.status === 'clicked'
        },
        styles(): { color: string; 'background-color': string } {
            // return {
            //     color: this.tile_info.color,
            //     'background-color': this.tile_info.background_colour ? this.tile_info.background_colour : '#bdbdbd',
            // }
            const wasd = {
                color: this.tile_info.color,
                'background-color': this.tile_info.background_colour ? this.tile_info.background_colour : '#bdbdbd',
            }
            return wasd
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
    float: left;
}
.clicked {
    width: 28px;
    height: 28px;
    border: 1px solid #8c8c8c;
}
</style>
