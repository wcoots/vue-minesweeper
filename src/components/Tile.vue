<template>
    <div
        class="tile"
        v-bind:class="{
            clicked: clicked,
        }"
        :style="numberColour"
        @click.left="leftClick"
        @click.right="rightClick"
        oncontextmenu="return false;"
    >
        {{ tile_info.value }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile } from '../types/types'

export default Vue.extend({
    name: 'Tile',
    props: {
        tile_id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            colours: ['#0000ff', '#007b00', '#ff0000', '#00007b', '#7b0000', '#027f80', '#000000', '#7f7f7f'],
        }
    },
    computed: {
        tile_info(): Tile {
            return this.$store.getters.getTileInfo(this.tile_id)
        },
        clicked(): boolean {
            return this.tile_info.status === 'clicked'
        },
        numberColour(): { color: string } {
            if (this.tile_info.status === 'flagged') {
                return { color: 'red' }
            }
            if (this.tile_info.status === 'uncertain') {
                return { color: 'black' }
            }
            if (this.tile_info.status === 'clicked') {
                if (this.tile_info.mine) {
                    return { color: 'black' }
                }
                return { color: this.colours[this.tile_info.touching - 1] }
            }
            return { color: 'black' }
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
    width: 26px;
    height: 26px;
    color: black;
    background-color: #bdbdbd;
    font-weight: bold;
    font-size: 20px;
    border-left: 2px solid #eeeeee;
    border-right: 2px solid #8b8b8b;
    border-top: 2px solid #eeeeee;
    border-bottom: 2px solid #8b8b8b;
    text-align: center;
    float: left;
}
.clicked {
    width: 29px;
    height: 29px;
    border: 0.5px solid #8c8c8c;
}
</style>
