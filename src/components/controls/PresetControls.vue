<template>
    <div class="controls" oncontextmenu="return false;">
        <div class="game_mode" @click="selectGameMode('beginner')">
            <span><b>Beginner</b></span>
            <hr />
            <span>9 x 9, 10 mines</span>
        </div>
        <div class="game_mode" @click="selectGameMode('intermediate')">
            <span><b>Intermediate</b></span>
            <hr />
            <span>16 x 16, 40 mines</span>
        </div>
        <div class="game_mode" @click="selectGameMode('expert')">
            <span><b>Expert</b></span>
            <hr />
            <span>30 x 16, 99 mines</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'

export default Vue.extend({
    name: 'PresetControls',
    methods: {
        selectGameMode(preset_name: GameMode['preset_name']) {
            this.$store.commit('setupGame', { mode: 'preset', preset_name } as GameMode)
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
}
.game_mode {
    position: relative;
    width: 90%;
    height: 60px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #465563;
    font-size: 14px;
    text-align: center;
    margin: 0 auto;
    margin-top: 7px;
    margin-bottom: 7px;
    padding: 5px;
    border: none;
    background-color: #e2dfdf;
}
</style>
