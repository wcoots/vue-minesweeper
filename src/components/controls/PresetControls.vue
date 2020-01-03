<template>
    <div class="controls" oncontextmenu="return false;">
        <div v-for="preset in presets" v-bind:key="preset">
            <div class="game_mode" @click="selectGameMode(preset.name)">
                <b>{{ preset.name }}</b>
                <hr />
                <span>{{ preset.specs }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode, PresetGame, PresetGameString } from '@/types'
import { preset_games } from '@/scripts'

export default Vue.extend({
    name: 'PresetControls',
    data() {
        return {
            presets: [] as PresetGameString[],
        }
    },
    created() {
        preset_games.forEach((preset: PresetGame) => {
            this.presets.push({ name: preset.name, specs: `${preset.x_length} x ${preset.y_length}, ${preset.total_mines} mines` })
        })
    },
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
