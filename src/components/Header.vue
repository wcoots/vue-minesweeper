<template>
    <div class="header" oncontextmenu="return false;">
        <p class="title">Minesweeper</p>
        <ClickType />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickType from './ClickType.vue'

export default Vue.extend({
    name: 'Header',
    components: {
        ClickType,
    },
})
</script>

<style scoped>
.header {
    width: 300px;
    float: left;
    display: block;
    position: relative;
}
.title {
    float: left;
}
</style>
