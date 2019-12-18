<template>
    <div>
        <p>Minesweeper</p>
        <div class="grid" :style="gridStyles">
            <!-- <div class="row" v-for="row in grid" v-bind:key="row[0].val">
                <div v-for="item in row" v-bind:key="item.val">
                    <Key :isBomb="item.bomb" :touching="item.touching" />
                </div>
            </div>-->
            <!-- class="row" :style="rowStyles"  -->
            <div v-for="row in yLength" v-bind:key="row">
                <div v-for="column in xLength" v-bind:key="column">
                    <Key
                        :isBomb="
                            grid.find(
                                k =>
                                    k.row === row - 1 &&
                                    k.column === column - 1,
                            ).bomb
                        "
                        :touching="
                            grid.find(
                                k =>
                                    k.row === row - 1 &&
                                    k.column === column - 1,
                            ).touching
                        "
                    />

                    <p>{{ row }} - {{ column }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Key from './Key.vue'
// import * from '../scripts/scripts'
// import wasd from '../scripts/scripts'
import { createGrid } from '../scripts/scripts'

declare interface Key {
    val: number
    row: number
    column: number
    mine: boolean
    touching: number
}

export default Vue.extend({
    name: 'Calculator',
    data() {
        return {
            grid: [] as Key[],
            xLength: 10,
            yLength: 7,
        }
    },
    components: {
        Key,
    },
    created() {
        this.grid = createGrid(this.xLength, this.yLength)
    },
    computed: {
        gridStyles() {
            return {
                width: `${30 * this.xLength}px`,
                height: `${30 * this.yLength}px`,
            }
        },
        rowStyles() {
            return {
                width: `${30 * this.xLength}px`,
            }
        },
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
    border: 2px solid #8c8c8c;
    display: inline-block;
}
.row {
    height: 30px;
    display: inline-block;
    vertical-align: top;
}
</style>
