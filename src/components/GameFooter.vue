<template>
    <div class="footer" :style="footerStyles" oncontextmenu="return false;">
        <p class="seed">seed: {{ gameStatus.seed }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus } from '@/types'

export default Vue.extend({
    name: 'GameFooter',
    props: {
        game: {
            type: Object as () => GameStatus,
            required: true,
        },
    },
    computed: {
        footerStyles(): { 'border-color': string; 'background-color': string } {
            const styles = {
                'border-color': '',
                'background-color': '',
            }
            if (this.game.status === 'won') {
                styles['border-color'] = '#529C65'
                styles['background-color'] = '#75db8f'
            } else if (this.game.status === 'lost') {
                styles['border-color'] = '#9A5554'
                styles['background-color'] = '#db7775'
            } else {
                styles['border-color'] = '#8c8c8c'
                styles['background-color'] = '#b9b9b9'
            }
            return styles
        },
        gameStatus(): GameStatus {
            return this.game
        },
    },
})
</script>

<style scoped>
.footer {
    height: auto;
    float: left;
    display: block;
    position: relative;
    border: solid 2px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.seed {
    float: left;
    padding-left: 20px;
}
</style>
