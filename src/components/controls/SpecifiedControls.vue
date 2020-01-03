<template>
    <div class="controls" oncontextmenu="return false;">
        <input v-model="x" label="x" type="text" spellcheck="false" />
        <input v-model="y" type="text" spellcheck="false" />
        <input v-model="mines" type="text" spellcheck="false" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'

export default Vue.extend({
    name: 'SpecifiedControls',
    data() {
        return {
            x: 0 as number,
            y: 0 as number,
            mines: 0 as number,
        }
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
input {
    width: 60%;
    height: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #465563;
    font-size: 17px;
    float: left;
    margin-left: 10px;
    background-color: #e2dfdf;
    border: none;
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
