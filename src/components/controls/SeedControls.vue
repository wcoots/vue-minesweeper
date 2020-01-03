<template>
    <div class="controls" oncontextmenu="return false;">
        <input v-model="new_seed" type="text" spellcheck="false" />
        <div class="submit" @click="submitSeed" :style="submitStyles">
            <span v-if="isSeedValid">GO &#x27A0;</span>
            <span v-else>GO</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameStatus, GameMode } from '@/types'
import { validateSeed } from '@/scripts'

export default Vue.extend({
    name: 'SeedControls',
    props: {
        current_seed: {
            type: String as () => GameStatus['seed'],
            required: true,
        },
    },
    data() {
        return {
            new_seed: '' as GameStatus['seed'],
        }
    },
    created() {
        this.new_seed = this.current_seed
    },
    computed: {
        isSeedValid(): boolean {
            return !!validateSeed(this.new_seed)
        },
        submitStyles(): { 'background-color': string } {
            if (this.isSeedValid) {
                return { 'background-color': '#ade0ba' }
            }
            return { 'background-color': '#e2dfdf' }
        },
    },
    methods: {
        submitSeed() {
            if (this.isSeedValid) {
                this.$store.commit('setupGame', { mode: 'seed', seed: this.new_seed } as GameMode)
            }
        },
    },
})
</script>

<style scoped>
.controls {
    height: auto;
    width: 100%;
    float: left;
    display: block;
    position: relative;
    background-color: #b9b9b9;
    border-left: solid #8c8c8c 2px;
    border-right: solid #8c8c8c 2px;
    border-bottom: solid #8c8c8c 2px;
    margin-bottom: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
}
input {
    width: 60%;
    height: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #465563;
    font-size: 17px;
    float: left;
    margin-left: 10px;
    background-color: #e2dfdf;
    border: none;
}
.submit {
    width: 20%;
    height: 22px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    text-align: middle;
    float: right;
    margin-right: 10px;
    border: none;
}
</style>
