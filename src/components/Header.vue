<template>
    <div class="header" oncontextmenu="return false;">
        <p class="title">Minesweeper</p>
        <ClickTypeButton />
        <ResetButton />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickTypeButton from './ClickTypeButton.vue'
import ResetButton from './ResetButton.vue'

export default Vue.extend({
    name: 'Header',
    components: {
        ClickTypeButton,
        ResetButton,
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
