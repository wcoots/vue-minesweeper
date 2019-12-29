<template>
    <div class="controls" oncontextmenu="return false;">
        <p>SPECIFIED CONTROLS</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'

export default Vue.extend({
    name: 'SpecifiedControls',
})
</script>

<style scoped>
.controls {
    height: 50px;
    width: 100%;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border-left: solid #8c8c8c 2px;
    border-right: solid #8c8c8c 2px;
    border-bottom: solid #8c8c8c 2px;
    margin-bottom: 50px;
}
</style>
