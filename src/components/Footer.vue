<template>
    <div class="footer">
        <a href="https://github.com/WillCooter/vue-minesweeper" class="version" target="_blank">v{{ version }}</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

const pjson = require('../../package.json')

export default Vue.extend({
    name: 'Footer',
    data() {
        return {
            version: pjson.version as string,
        }
    },
})
</script>

<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25px;
    background-color: rgb(243, 233, 233);
}
a {
    color: #000000;
    float: right;
    padding-right: 10px;
}
</style>
