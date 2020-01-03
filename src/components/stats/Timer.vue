<template>
    <div class="timer" oncontextmenu="return false;">
        <div class="text">
            <b>{{ display_time }}</b>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'GameStats',
    data() {
        return {
            seconds: 0 as number,
            minutes: 0 as number,
            hours: 0 as number,
        }
    },
    created() {
        setInterval(this.next_second, 1000)
    },
    computed: {
        display_time(): string {
            const display_seconds: string = this.seconds > 9 ? `${this.seconds}` : `0${this.seconds}`
            const display_minutes: string = this.minutes > 9 ? `${this.minutes}` : `0${this.minutes}`
            const display_hours: string = this.hours > 9 ? `${this.hours}` : `0${this.hours}`
            return `${display_hours}:${display_minutes}:${display_seconds}`
        },
    },
    methods: {
        next_second() {
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
