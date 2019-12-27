<template>
    <div>
        <img width="32px" :alt="svg.alt" :src="svg.src" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface SVG_IMAGE {
    number: number
    alt: string
    src: string
}

export default Vue.extend({
    name: 'Numba',
    props: {
        number: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            all_svgs: [
                { number: 0, alt: 'zero', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Minesweeper_0.svg/64px-Minesweeper_0.svg.png' },
                { number: 1, alt: 'one', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Minesweeper_1.svg/64px-Minesweeper_1.svg.png' },
                { number: 2, alt: 'two', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Minesweeper_2.svg/64px-Minesweeper_2.svg.png' },
                { number: 3, alt: 'three', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Minesweeper_3.svg/64px-Minesweeper_3.svg.png' },
                { number: 4, alt: 'four', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Minesweeper_4.svg/64px-Minesweeper_4.svg.png' },
                { number: 5, alt: 'five', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Minesweeper_5.svg/64px-Minesweeper_5.svg.png' },
                { number: 6, alt: 'six', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Minesweeper_6.svg/64px-Minesweeper_6.svg.png' },
                { number: 7, alt: 'seven', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Minesweeper_7.svg/64px-Minesweeper_7.svg.png' },
                { number: 8, alt: 'eight', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Minesweeper_8.svg/64px-Minesweeper_8.svg.png' },
            ] as SVG_IMAGE[],
        }
    },
    computed: {
        svg(): SVG_IMAGE {
            return this.all_svgs.find(svg => svg.number === this.number) || this.all_svgs[0]
        },
    },
})
</script>
