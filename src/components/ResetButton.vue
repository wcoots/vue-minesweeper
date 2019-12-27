<template>
    <div class="tile_button" @click="click">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="none" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd">
            <path fill="#b9b9b9" d="M.5.5h32v32H.5z" />
            <path
                d="M23.4137 8.5843C21.516 6.6812 18.896 5.5 15.9934 5.5 10.1886 5.5 5.5 10.1988 5.5 16s4.6886 10.5 10.4934 10.5c4.8922 0 8.9897-3.347 10.152-7.875h-2.7317c-1.0835 3.058-3.986 5.25-7.4203 5.25-4.3536 0-7.88-3.5242-7.88-7.875s3.5263-7.875 7.88-7.875c2.1736 0 4.1238.9055 5.5488 2.3295l-4.2355 4.233H26.5V5.5l-3.0863 3.0843z"
                fill-rule="nonzero"
                fill="#262626"
            />
        </svg>
    </div>
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
.tile_button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40%;
    right: 0;
    margin: auto;
}
</style>
