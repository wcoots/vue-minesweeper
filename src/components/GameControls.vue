<template>
    <div oncontextmenu="return false;">
        <div class="tabs">
            <div class="tab tab-left" :style="tabStyles" @click="clickTab('preset')">levels</div>
            <div class="tab" :style="tabStyles" @click="clickTab('specified')">custom</div>
            <div class="tab tab-right" :style="tabStyles" @click="clickTab('seed')">seed</div>
        </div>
        <PresetControls v-if="currentTab === 'preset'" />
        <SpecifiedControls :current_x_length="+game.x_length" :current_y_length="+game.y_length" :current_total_mines="+game.mines" v-if="currentTab === 'specified'" />
        <SeedControls :current_seed="game.seed" v-if="currentTab === 'seed'" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'
import controlTypes from '@/components/controls'

const { PresetControls, SpecifiedControls, SeedControls } = controlTypes

export default Vue.extend({
    name: 'GameControls',
    components: {
        PresetControls,
        SpecifiedControls,
        SeedControls,
    },
    props: {
        game: {
            type: Object as () => GameStatus,
            required: true,
        },
    },
    data() {
        return {
            currentTab: 'preset' as GameMode['mode'],
        }
    },
    computed: {
        tabStyles(): { width: string } {
            return { width: this.game.x_length >= 9 ? `${(this.game.x_length * 32) / 3 - 2.6}px` : `${94 - 7}px` }
        },
    },
    methods: {
        clickTab(tab: GameMode['mode']) {
            this.currentTab = tab
        },
    },
})
</script>

<style scoped>
.tabs {
    width: 100%;
    height: 20px;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border: solid #8c8c8c 2px;
}
.tab {
    height: 20px;
    float: left;
    background-color: #b9b9b9;
}
.tab-left {
    border-right: solid #8c8c8c 2px;
}
.tab-right {
    border-left: solid #8c8c8c 2px;
}
</style>
