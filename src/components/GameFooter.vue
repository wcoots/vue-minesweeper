<template>
    <div class="footer" :style="footerStyles" oncontextmenu="return false;">
        <p class="status">{{ gameStatus }}</p>
        <p class="seed">seed: {{ gameSeed }}</p>
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
        footerStyles(): { width: string; 'border-color': string; 'background-color': string } {
            const styles = {
                width: `${this.game.x_length * 32}px`,
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
        gameStatus(): GameStatus['status'] {
            return this.game.status
        },
        gameSeed(): GameStatus['seed'] {
            return `${this.game.x_length}-${this.game.y_length}-${this.game.mines}-${this.game.seed}`
        },
    },
})
</script>

<style scoped>
.footer {
    height: 50px;
    float: left;
    display: block;
    position: relative;
    margin-top: 10px;
    border: solid 2px;
}
.status {
    float: left;
    padding-left: 20px;
}
.seed {
    float: right;
    padding-right: 20px;
}
</style>
