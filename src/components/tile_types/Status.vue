<template>
    <div>
        <img width="32px" :alt="svg.alt" :src="svg.src" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile } from '@/types'

interface SVG_IMAGE {
    status: Tile['status']
    src: string
}

export default Vue.extend({
    name: 'Status',
    props: {
        status: {
            type: String as () => Tile['status'],
            required: true,
        },
    },
    data() {
        return {
            all_svgs: [
                { status: 'unclicked', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Minesweeper_unopened_square.svg/64px-Minesweeper_unopened_square.svg.png' },
                { status: 'flagged', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/64px-Minesweeper_flag.svg.png' },
                { status: 'uncertain', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Minesweeper_questionmark.svg/64px-Minesweeper_questionmark.svg.png' },
            ] as SVG_IMAGE[],
        }
    },
    computed: {
        svg(): SVG_IMAGE {
            return this.all_svgs.find(svg => svg.status === this.status) || this.all_svgs[0]
        },
    },
})
</script>
