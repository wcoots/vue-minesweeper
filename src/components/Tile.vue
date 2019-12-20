<template>
    <div
        v-bind:class="{
            unclicked: unclicked,
            clicked: clicked,
            released: released,
        }"
        @mousedown="click"
        v-on:click="release"
    >
        {{ tile_info.clicked && tile_info.released ? tile_info.value : '' }}
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
    computed: {
        tile_info(): Tile {
            return this.$store.getters.getTileInfo(this.tile_id)
        },
        unclicked(): boolean {
            return !this.tile_info.clicked && !this.tile_info.released
        },
        clicked(): boolean {
            return this.tile_info.clicked && !this.tile_info.released
        },
        released(): boolean {
            return this.tile_info.clicked && this.tile_info.released
        },
    },
    methods: {
        click() {
            if (!this.tile_info.clicked) {
                this.$store.commit('setTileAsClicked', this.tile_id)
            }
        },
        release() {
            if (!this.tile_info.released) {
                this.$store.commit('setTileAsReleased', this.tile_id)
                if (this.tile_info.touching === 0) {
                    this.$store.dispatch('getZeroGroup', this.tile_id)
                }
            }
        },
    },
})
</script>

<style scoped>
.unclicked {
    width: 26px;
    height: 26px;
    background-color: #bdbdbd;
    color: black;
    font-weight: bold;
    border-left: 2px solid #eeeeee;
    border-right: 2px solid #8b8b8b;
    border-top: 2px solid #eeeeee;
    border-bottom: 2px solid #8b8b8b;
    text-align: center;
    font-size: 10px;
    float: left;
}
.clicked {
    width: 26px;
    height: 26px;
    background-color: #bdbdbd;
    color: black;
    font-weight: bold;
    border: 2px solid #bdbdbd;
    text-align: center;
    font-size: 10px;
    float: left;
}
.released {
    width: 29px;
    height: 29px;
    background-color: #bdbdbd;
    color: black;
    font-weight: bold;
    border: 0.5px solid #8c8c8c;
    text-align: center;
    font-size: 10px;
    float: left;
}
.tile {
    display: inline-block;
    vertical-align: middle;
}
</style>
