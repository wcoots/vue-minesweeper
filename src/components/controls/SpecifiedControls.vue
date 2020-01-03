<template>
    <div class="controls" oncontextmenu="return false;">
        <label for="x_length" class="text">x:</label>
        <input id="x_length" v-model="x_length" class="text" type="text" spellcheck="false" />
        <label for="y_length" class="text">y:</label>
        <input id="y_length" v-model="y_length" class="text" type="text" spellcheck="false" />
        <label for="mines" class="text">m:</label>
        <input id="mines" v-model="total_mines" class="text" type="text" spellcheck="false" />
        <div class="submit" @click="submitSpecs" :style="submitStyles">
            <span v-if="areSpecsValid">GO &#x27A0;</span>
            <span v-else>GO</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'
import { calculateMaximumMineCount } from '@/scripts'

export default Vue.extend({
    name: 'SpecifiedControls',
    props: {
        current_x_length: {
            type: Number as () => GameStatus['x_length'],
            required: true,
        },
        current_y_length: {
            type: Number as () => GameStatus['y_length'],
            required: true,
        },
        current_total_mines: {
            type: Number as () => GameStatus['mines'],
            required: true,
        },
    },
    data() {
        return {
            x_length: 0 as number,
            y_length: 0 as number,
            total_mines: 0 as number,
        }
    },
    created() {
        this.x_length = this.current_x_length
        this.y_length = this.current_y_length
        this.total_mines = this.current_total_mines
    },
    computed: {
        areSpecsValid(): boolean {
            const valid_x_length: boolean = this.x_length > 0 && this.x_length <= 30
            const valid_y_length: boolean = this.y_length > 0 && this.y_length <= 30
            const max_mines: number = calculateMaximumMineCount(this.x_length, this.y_length)
            const valid_total_mines: boolean = this.total_mines > 0 && this.total_mines <= max_mines
            return valid_x_length && valid_y_length && valid_total_mines
        },
        submitStyles(): { 'background-color': string } {
            if (this.areSpecsValid) {
                return { 'background-color': '#ade0ba' }
            }
            return { 'background-color': '#e2dfdf' }
        },
    },
    methods: {
        submitSpecs() {
            if (this.areSpecsValid) {
                this.$store.commit('setupGame', { mode: 'specified', x_length: this.x_length, y_length: this.y_length, total_mines: this.total_mines } as GameMode)
            }
        },
    },
})
</script>

<style scoped>
.controls {
    height: auto;
    width: 100%;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border-left: solid #8c8c8c 2px;
    border-right: solid #8c8c8c 2px;
    border-bottom: solid #8c8c8c 2px;
    margin-bottom: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
}
label {
    float: left;
    margin-left: 10px;
    border: none;
}
input {
    width: 10%;
    height: 20px;
    float: left;
    margin-left: 10px;
    background-color: #e2dfdf;
    border: none;
}
.text {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #465563;
    font-size: 17px;
}
.submit {
    width: 20%;
    height: 22px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    text-align: middle;
    float: right;
    margin-right: 10px;
    border: none;
}
</style>
