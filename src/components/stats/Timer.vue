<template>
    <div class="timer" oncontextmenu="return false;">
        <div class="text">
            <b>{{ displayTime }}</b>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus } from '@/types'

export default Vue.extend({
    name: 'GameStats',
    data() {
        return {
            seconds: 0 as number,
            minutes: 0 as number,
            hours: 0 as number,
            interval_id: 0 as number,
        }
    },
    mounted() {
        this.startTimer()
    },
    computed: {
        gameInfo(): GameStatus {
            return this.$store.getters.getGameInfo()
        },
        displayTime(): string {
            const display_seconds: string = this.seconds > 9 ? `${this.seconds}` : `0${this.seconds}`
            const display_minutes: string = this.minutes > 9 ? `${this.minutes}` : `0${this.minutes}`
            const display_hours: string = this.hours > 9 ? `${this.hours}` : `0${this.hours}`
            return `${display_hours}:${display_minutes}:${display_seconds}`
        },
    },
    watch: {
        // gameInfo: {
        //     handler: (val: GameStatus, oldVal: GameStatus) => {
        //         console.log('OLD VALUE:')
        //         console.log(`status: ${oldVal.status}`)
        //         console.log(`seed: ${oldVal.seed}`)
        //         console.log('NEW VALUE')
        //         console.log(`status: ${val.status}`)
        //         console.log(`seed: ${val.seed}`)
        //         if (val.status !== 'playing' && oldVal.status === 'playing') {
        //             console.log('END TIMER')
        //             // this.endTimer()
        //         } else if (val.status === 'playing' && val.seed !== oldVal.seed) {
        //             console.log('START TIMER')
        //             // this.startTimer()
        //         }
        //     },
        //     deep: true,
        // },
        'gameInfo.seed': (val: GameStatus, oldVal: GameStatus) => {
            console.log('seed change')
        },
        'gameInfo.status': (val: GameStatus, oldVal: GameStatus) => {
            console.log('status change')
        },
    },
    methods: {
        startTimer() {
            this.seconds = 0
            this.minutes = 0
            this.hours = 0
            this.interval_id = setInterval(this.incrementTimer, 1000)
        },
        endTimer() {
            clearInterval(this.interval_id)
        },
        incrementTimer() {
            this.seconds += 1
            if (this.seconds === 60) {
                this.seconds = 0
                this.minutes += 1
            }
            if (this.minutes === 60) {
                this.minutes = 0
                this.hours += 1
            }
        },
    },
})
</script>

<style scoped>
.timer {
    height: 30px;
    width: 50%;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border-right: solid #8c8c8c 2px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
}
.text {
    margin: 2px;
}
</style>
