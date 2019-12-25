<template>
    <div class="tile_button" @click="click">{{ click_type }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ClickType } from '@/types'

export default Vue.extend({
    name: 'ClickTypeButton',
    computed: {
        click_type(): ClickType['value'] {
            return this.$store.getters.getClickTypeValue()
        },
    },
    methods: {
        click() {
            this.$store.commit('swapClickType')
        },
    },
})
</script>

<style scoped>
.tile_button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80%;
    right: 0;
    margin: auto;
}
</style>
