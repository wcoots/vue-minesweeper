<template>
    <div class="tile" @click="changeClickType">{{ click_type }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ClickType } from '../types/types'

export default Vue.extend({
    name: 'ClickType',
    computed: {
        click_type(): ClickType['value'] {
            return this.$store.getters.getClickTypeValue()
        },
    },
    methods: {
        changeClickType() {
            this.$store.commit('changeClickType')
        },
    },
})
</script>

<style scoped>
.tile {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80%;
    right: 0;
    margin: auto;
}
</style>
