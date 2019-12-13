<template>
    <div>
        <p>Minesweeper</p>
        <div class="outside">
            <div class="row" v-for="row in tanks" v-bind:key="row[0].val">
                <div v-for="item in row" v-bind:key="item.val">
                    <Key :isBomb="item.bomb" :touching="item.touching" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Key from './Key.vue'

declare interface Key {
    val: number
    row: number
    column: number
    bomb: boolean
    touching: number
}

export default Vue.extend({
    name: 'Calculator',
    data() {
        return {
            keys: [] as Key[][],
            tanks: [] as Key[][],
        }
    },
    components: {
        Key,
    },
    created() {
        const bombs: number[] = []
        while (bombs.length < 20) {
            const x = Math.floor(Math.random() * 100) + 1
            if (bombs.indexOf(x) === -1) bombs.push(x)
        }

        let x = 0
        for (let i = 0; i < 10; i += 1) {
            const row: Key[] = []
            for (let j = 0; j < 10; j += 1) {
                x += 1

                row.push({
                    val: x,
                    row: i,
                    column: j,
                    bomb: bombs.indexOf(x) !== -1,
                    touching: 0,
                })
            }
            this.keys.push(row)
        }

        const res: Key[][] = []

        this.keys.forEach(row => {
            const qwert: Key[] = []
            row.forEach(key => {
                const rowAbove = this.keys[key.row - 1]
                const rowBelow = this.keys[key.row + 1]
                const isLeftSide = key.val % 10 === 1
                const isRightSide = key.val % 10 === 0

                const topCell = rowAbove ? rowAbove[key.column] : null
                const bottomCell = rowBelow ? rowBelow[key.column] : null
                const leftCell = isLeftSide ? null : row[key.column - 1]
                const rightCell = isRightSide ? null : row[key.column + 1]

                const topLeftCell =
                    rowAbove && !isLeftSide ? rowAbove[key.column - 1] : null
                const topRightCell =
                    rowAbove && !isRightSide ? rowAbove[key.column + 1] : null
                const bottomLeftCell =
                    rowBelow && !isLeftSide ? rowBelow[key.column - 1] : null
                const bottomRightCell =
                    rowBelow && !isRightSide ? rowBelow[key.column + 1] : null

                const surroundingCells: (Key | null)[] = [
                    topCell,
                    bottomCell,
                    leftCell,
                    rightCell,
                    topLeftCell,
                    topRightCell,
                    bottomLeftCell,
                    bottomRightCell,
                ]

                const total = surroundingCells.filter(cell => {
                    return !!cell && cell.bomb
                }).length

                qwert.push({
                    val: key.val,
                    row: key.row,
                    column: key.column,
                    bomb: key.bomb,
                    touching: total,
                })

                // console.log('CELL:')
                // console.log(key.val)
                // console.log('top left')
                // console.log(topLeftCell ? topLeftCell.val : topLeftCell)
                // console.log('top')
                // console.log(topCell ? topCell.val : topCell)
                // console.log('top right')
                // console.log(topRightCell ? topRightCell.val : topRightCell)
                // console.log('right')
                // console.log(rightCell ? rightCell.val : rightCell)
                // console.log('bottom right')
                // console.log(
                //     bottomRightCell ? bottomRightCell.val : bottomRightCell,
                // )
                // console.log('bottom')
                // console.log(bottomCell ? bottomCell.val : bottomCell)
                // console.log('bottom left')
                // console.log(
                //     bottomLeftCell ? bottomLeftCell.val : bottomLeftCell,
                // )
                // console.log('left')
                // console.log(leftCell ? leftCell.val : leftCell)
                // console.log('\n\n')

                // console.log(
                //     `${topLeftCell ? topLeftCell.val : topLeftCell}  -  ${
                //         topCell ? topCell.val : topCell
                //     }  -  ${topRightCell ? topRightCell.val : topRightCell}`,
                // )
                // console.log(
                //     `${leftCell ? leftCell.val : leftCell}  -  ${key.val}  -  ${
                //         rightCell ? rightCell.val : rightCell
                //     }`,
                // )
                // console.log(
                //     `${
                //         bottomLeftCell ? bottomLeftCell.val : bottomLeftCell
                //     }  -  ${bottomCell ? bottomCell.val : bottomCell}  -  ${
                //         bottomRightCell ? bottomRightCell.val : bottomRightCell
                //     }`,
                // )
                // console.log('\n\n')
            })
            res.push(qwert)
        })

        this.tanks = res
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outside {
    width: 300px;
    height: 300px;
    border: 2px solid #8c8c8c;
    display: inline-block;
}
.row {
    width: 300px;
    height: 30px;
    display: inline-block;
    vertical-align: top;
}
</style>
