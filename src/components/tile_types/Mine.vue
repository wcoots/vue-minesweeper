<template>
    <div>
        <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="#000" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd">
            <g stroke-linejoin="miter">
                <path :fill="background_color" stroke="#757575" d="M1 1h31v31H1z" />
                <path d="M12.772 25.5h7.4558l5.272-5.272V12.772L20.228 7.5H12.772L7.5 12.772v7.4558z" fill="#000" />
            </g>
            <g fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-width="2">
                <path d="M4 16.5h25" />
                <path d="M16.5 4v25" />
                <path d="M7.5 7.5l18 17.5" />
                <path d="M7 24.5L25.5 8" />
            </g>
            <path stroke="#fff" d="M11.5 10.5H14v4h-2.5z" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Mine',
    props: {
        exploded: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        background_color(): string {
            return this.exploded ? '#d92626' : '#b9b9b9'
        },
    },
})
</script>

<style scoped>
.svg {
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
    top: 0 !important;
}
</style>
