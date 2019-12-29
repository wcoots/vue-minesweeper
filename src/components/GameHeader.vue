<template>
    <div class="header" oncontextmenu="return false;">
        <p class="title">Minesweeper</p>
        <ClickTypeButton />
        <ResetButton />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus } from '@/types'
import buttonTypes from '@/components/buttons'

const { ClickTypeButton, ResetButton } = buttonTypes

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
})
</script>

<style scoped>
.header {
    height: 50px;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border: solid #8c8c8c 2px;
    margin-bottom: 10px;
}
.title {
    float: left;
    padding-left: 20px;
    font-weight: bold;
}
</style>
