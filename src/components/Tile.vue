<template>
    <div
        class="tile"
        v-bind:class="{
            clicked: clicked,
            flagged: flagged,
            uncertain: uncertain,
        }"
        @click.left="leftClick"
        @click.right="rightClick"
        oncontextmenu="return false;"
    >
        {{ tile_info.status === 'clicked' ? tile_info.value : '' }}
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
        clicked(): boolean {
            return this.tile_info.status === 'clicked'
        },
        flagged(): boolean {
            return this.tile_info.status === 'flagged'
        },
        uncertain(): boolean {
            return this.tile_info.status === 'uncertain'
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
    border-left: 2px solid #eeeeee;
    border-right: 2px solid #8b8b8b;
    border-top: 2px solid #eeeeee;
    border-bottom: 2px solid #8b8b8b;
    text-align: center;
    font-size: 10px;
    float: left;
}
.clicked {
    width: 29px;
    height: 29px;
    border: 0.5px solid #8c8c8c;
}
.flagged {
    background-color: red;
}
.uncertain {
    background-color: green;
}
</style>
