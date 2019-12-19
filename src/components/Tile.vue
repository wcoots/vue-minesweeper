<template>
    <div
        v-bind:class="{
            unclicked: !clicked && !released,
            clicked: clicked && !released,
            released: clicked && released,
        }"
        @mousedown="click"
        v-on:click="release"
    >
        {{ clicked && released ? value : '' }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Tile',
    props: {
        is_mine: {
            type: Boolean,
            required: true,
        },
        touching: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            clicked: false,
            released: false,
            value: '',
        }
    },
    methods: {
        click() {
            this.clicked = true
        },
        release() {
            if (this.is_mine) {
                this.value = '💣'
            } else if (this.touching === 0) {
                this.value = ''
            } else {
                this.value = `${this.touching}`
            }
            this.released = true
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
