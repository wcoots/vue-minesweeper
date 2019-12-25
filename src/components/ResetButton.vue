<template>
    <div class="tile" @click="click">↺</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Reset',
    methods: {
        click() {
            this.$store.dispatch('resetGrid')
        },
    },
})
</script>

<style scoped>
.tile {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40%;
    right: 0;
    margin: auto;
}
</style>
