<template>
    <div class="flag-count">
        <svg v-if="flag_count > 99" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="-1 -1 12 20">
            <g id="tens" style="fill-rule:evenodd; stroke:#000; stroke-width:0.5; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;">
                <polygon id="top-bar" :class="{ 'lit-led': top_bar.includes(hundreds) }" points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="#6d0201" />
                <polygon id="top-right-bar" :class="{ 'lit-led': top_right_bar.includes(hundreds) }" points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="#6d0201" />
                <polygon id="bottom-right-bar" :class="{ 'lit-led': bottom_right_bar.includes(hundreds) }" points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="#6d0201" />
                <polygon id="bottom-bar" :class="{ 'lit-led': bottom_bar.includes(hundreds) }" points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="#6d0201" />
                <polygon id="bottom-left-bar" :class="{ 'lit-led': bottom_left_bar.includes(hundreds) }" points=" 1,17 0,16 0,10 1, 9 2,10 2,16" fill="#6d0201" />
                <polygon id="top-left-bar" :class="{ 'lit-led': top_left_bar.includes(hundreds) }" points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="#6d0201" />
                <polygon id="middle-bar" :class="{ 'lit-led': middle_bar.includes(hundreds) }" points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="#6d0201" />
            </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="-1 -1 12 20">
            <g id="tens" style="fill-rule:evenodd; stroke:#000; stroke-width:0.5; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;">
                <polygon id="top-bar" :class="{ 'lit-led': top_bar.includes(tens) }" points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="#6d0201" />
                <polygon id="top-right-bar" :class="{ 'lit-led': top_right_bar.includes(tens) }" points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="#6d0201" />
                <polygon id="bottom-right-bar" :class="{ 'lit-led': bottom_right_bar.includes(tens) }" points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="#6d0201" />
                <polygon id="bottom-bar" :class="{ 'lit-led': bottom_bar.includes(tens) }" points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="#6d0201" />
                <polygon id="bottom-left-bar" :class="{ 'lit-led': bottom_left_bar.includes(tens) }" points=" 1,17 0,16 0,10 1, 9 2,10 2,16" fill="#6d0201" />
                <polygon id="top-left-bar" :class="{ 'lit-led': top_left_bar.includes(tens) }" points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="#6d0201" />
                <polygon id="middle-bar" :class="{ 'lit-led': middle_bar.includes(tens) }" points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="#6d0201" />
            </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="-1 -1 12 20">
            <g id="units" style="fill-rule:evenodd; stroke:#000; stroke-width:0.5; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;">
                <polygon id="top-bar" :class="{ 'lit-led': top_bar.includes(units) }" points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="#6d0201" />
                <polygon id="top-right-bar" :class="{ 'lit-led': top_right_bar.includes(units) }" points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="#6d0201" />
                <polygon id="bottom-right-bar" :class="{ 'lit-led': bottom_right_bar.includes(units) }" points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="#6d0201" />
                <polygon id="bottom-bar" :class="{ 'lit-led': bottom_bar.includes(units) }" points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="#6d0201" />
                <polygon id="bottom-left-bar" :class="{ 'lit-led': bottom_left_bar.includes(units) }" points=" 1,17 0,16 0,10 1, 9 2,10 2,16" fill="#6d0201" />
                <polygon id="top-left-bar" :class="{ 'lit-led': top_left_bar.includes(units) }" points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="#6d0201" />
                <polygon id="middle-bar" :class="{ 'lit-led': middle_bar.includes(units) }" points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="#6d0201" />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ClickType } from '@/types'

export default Vue.extend({
    name: 'FlagCount',
    data() {
        return {
            bottom_bar: [0, 2, 3, 5, 6, 8, 9],
            bottom_right_bar: [0, 1, 3, 4, 5, 6, 7, 8, 9],
            bottom_left_bar: [0, 2, 6, 8],
            top_bar: [0, 2, 3, 5, 6, 7, 8, 9],
            top_right_bar: [0, 1, 2, 3, 4, 7, 8, 9],
            top_left_bar: [0, 4, 5, 6, 8, 9],
            middle_bar: [2, 3, 4, 5, 6, 8, 9],
        }
    },
    computed: {
        flag_count() {
            return this.$store.state.game.flag_count
        },
        mines_left(): number {
            return Math.max(this.$store.state.game.mines - this.flag_count, 0)
        },
        units(): number {
            return this.mines_left - Math.floor(this.mines_left / 10) * 10
        },
        tens(): number {
            return (this.mines_left - this.units) / 10
        },
        hundreds(): number {
            return (this.mines_left - this.tens * 10 - this.units) / 100
        },
    },
})
</script>

<style scoped>
.flag-count {
    height: 32px;
    color: #000000;
    background-color: #000000;
    font-size: 20px;
    text-align: center;
    float: right;
    margin-right: 10px;
    margin-top: 5px;
    padding: 4px;
}

.digits {
    margin-top: 2px;
}

.lit-led {
    fill: #ff0102;
}
</style>
