<template>
    <div class="tile" @click.left="leftClick" @click.right="rightClick">
        <span v-if="tile_info.status === 'unclicked'">
            <Unclicked />
        </span>
        <span v-else-if="tile_info.status === 'flagged'">
            <Flagged />
        </span>
        <span v-else-if="tile_info.status === 'uncertain'">
            <Uncertain />
        </span>
        <span v-else>
            <span v-if="tile_info.exploded">
                <Explode />
            </span>
            <span v-else-if="tile_info.mine">
                <Mine />
            </span>
            <span v-else-if="tile_info.touching === 0">
                <Clicked />
            </span>
            <span v-else-if="tile_info.touching === 1">
                <One />
            </span>
            <span v-else-if="tile_info.touching === 2">
                <Two />
            </span>
            <span v-else-if="tile_info.touching === 3">
                <Three />
            </span>
            <span v-else-if="tile_info.touching === 4">
                <Four />
            </span>
            <span v-else-if="tile_info.touching === 5">
                <Five />
            </span>
            <span v-else-if="tile_info.touching === 6">
                <Six />
            </span>
            <span v-else-if="tile_info.touching === 7">
                <Seven />
            </span>
            <span v-else-if="tile_info.touching === 8">
                <Eight />
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tile } from '@/types'
import Unclicked from './tile_types/Unclicked.vue'
import Clicked from './tile_types/Clicked.vue'
import Uncertain from './tile_types/Uncertain.vue'
import Flagged from './tile_types/Flagged.vue'
import Mine from './tile_types/Mine.vue'
import Explode from './tile_types/Explode.vue'
import One from './tile_types/One.vue'
import Two from './tile_types/Two.vue'
import Three from './tile_types/Three.vue'
import Four from './tile_types/Four.vue'
import Five from './tile_types/Five.vue'
import Six from './tile_types/Six.vue'
import Seven from './tile_types/Seven.vue'
import Eight from './tile_types/Eight.vue'

export default Vue.extend({
    name: 'Tile',
    props: {
        tile_id: {
            type: Number,
            required: true,
        },
    },
    components: {
        Unclicked,
        Clicked,
        Uncertain,
        Flagged,
        Mine,
        Explode,
        One,
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
    },
    computed: {
        tile_info(): Tile {
            return this.$store.getters.getTileInfo(this.tile_id)
        },
    },
    methods: {
        leftClick() {
            this.$store.dispatch('leftClickTile', this.tile_id)
        },
        rightClick() {
            this.$store.dispatch('rightClickTile', this.tile_id)
        },
    },
})
</script>

<style scoped>
.tile {
    width: 32px;
    height: 32px;
    float: left;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
