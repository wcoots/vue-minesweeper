<template>
    <div class="header" :style="headerStyles" oncontextmenu="return false;">
        <p class="title">Minesweeper</p>
        <ClickTypeButton />
        <ResetButton />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickTypeButton from './ClickTypeButton.vue'
import ResetButton from './ResetButton.vue'
import { GameStatus } from '@/types'

export default Vue.extend({
    name: 'GameHeader',
    components: {
        ClickTypeButton,
        ResetButton,
    },
    props: {
        game: {
            type: Object as () => GameStatus,
            required: true,
        },
    },
    computed: {
        headerStyles(): { width: string } {
            return {
                width: `${this.game.x_length * 32}px`,
            }
        },
    },
})
</script>

<style scoped>
.header {
    height: 50px;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    margin-bottom: 10px;
    border: solid #8c8c8c 2px;
}
.title {
    float: left;
    padding-left: 20px;
    font-weight: bold;
}
</style>
