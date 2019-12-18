declare interface Key {
    val: number
    row: number
    column: number
    mine: boolean
    touching: number
}

const TOTAL_MINES = 5

export const createGrid = (xLength: number, yLength: number): Key[] => {
    const mines: number[] = []
    const keys: Key[] = []
    const grid: Key[] = []

    while (mines.length < TOTAL_MINES) {
        const x = Math.floor(Math.random() * (xLength * yLength)) + 1
        if (mines.indexOf(x) === -1) mines.push(x)
    }

    for (let i = 0; i < yLength; i += 1) {
        for (let j = 0; j < xLength; j += 1) {
            const cellValue = xLength * i + (j + 1)

            keys.push({
                val: cellValue,
                row: i,
                column: j,
                mine: mines.indexOf(cellValue) !== -1,
                touching: 0,
            })
        }
    }

    keys.forEach((key: Key) => {
        const isTopRow = key.row === 0
        const isBottomRow = key.row === yLength - 1
        const isLeftColumn = key.column === 0
        const isRightColumn = key.column === xLength - 1

        const leftCell = isLeftColumn
            ? null
            : keys.find(k => k.val === key.val - 1)
        const topLeftCell =
            isTopRow || isLeftColumn
                ? null
                : keys.find(k => k.val === key.val - xLength - 1)
        const topCell = isTopRow
            ? null
            : keys.find(k => k.val === key.val - xLength)
        const topRightCell =
            isTopRow || isRightColumn
                ? null
                : keys.find(k => k.val === key.val - xLength + 1)
        const rightCell = isRightColumn
            ? null
            : keys.find(k => k.val === key.val + 1)
        const bottomRightCell =
            isBottomRow || isRightColumn
                ? null
                : keys.find(k => k.val === key.val + xLength + 1)
        const bottomCell = isBottomRow
            ? null
            : keys.find(k => k.val === key.val + xLength)
        const bottomLeftCell =
            isBottomRow || isLeftColumn
                ? null
                : keys.find(k => k.val === key.val + xLength - 1)

        const surroundingCells: (Key | null | undefined)[] = [
            leftCell,
            topLeftCell,
            topCell,
            topRightCell,
            rightCell,
            bottomRightCell,
            bottomCell,
            bottomLeftCell,
        ]

        grid.push({
            val: key.val,
            row: key.row,
            column: key.column,
            mine: key.mine,
            touching: surroundingCells.filter(cell => !!cell && cell.mine)
                .length,
        })
    })

    return grid
}

// console.log('----------------------------')

export const wasd2 = () => {
    console.log('hows it going')
}

// module.exports = {
//     wasd,
// }
