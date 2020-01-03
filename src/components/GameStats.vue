<template>
    <div class="header" oncontextmenu="return false;">
        <Timer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Timer from './stats/Timer.vue'

export default Vue.extend({
    name: 'GameStats',
    components: {
        Timer,
    },
})
</script>

<style scoped>
.header {
    height: 30px;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border: solid #8c8c8c 2px;
    margin-bottom: 10px;
}
</style>
