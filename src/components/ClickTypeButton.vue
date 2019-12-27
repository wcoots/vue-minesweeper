<template>
    <div class="tile_button" @click="click">
        <svg v-if="click_type === 'normal'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="none" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd">
            <path fill="#b9b9b9" d="M.5.5h32v32H.5z" />
            <path d="M6.2464 7.0604L13.5 27.0418l1.123-.0735 3.5328-7.9987 7.9987-3.5328.0735-1.123z" fill="#262626" fill-rule="nonzero" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="none" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd">
            <path fill="#b9b9b9" d="M.5.5h32v32H.5z" />
            <path d="M19.16 8.5294L18.6 6H6v21.5h2.8v-8.853h7.84l.56 2.5294H27V8.5294z" fill="#262626" fill-rule="nonzero" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ClickType } from '@/types'

export default Vue.extend({
    name: 'ClickTypeButton',
    computed: {
        click_type(): ClickType['type'] {
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
