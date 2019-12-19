declare interface Tile {
    val: number
    row: number
    column: number
    mine: boolean
    touching: number
}

const getMines = (x_length: number, y_length: number, total_mines: number): number[] => {
    const mines: number[] = []

    while (mines.length < total_mines) {
        const x = Math.floor(Math.random() * (x_length * y_length)) + 1
        if (mines.indexOf(x) === -1) mines.push(x)
    }

    return mines
}

const getTouchingValues = (tiles: Tile[], x_length: number, y_length: number): Tile[] => {
    const grid: Tile[] = []

    tiles.forEach((tile: Tile) => {
        const is_top_row = tile.row === 0
        const is_bottom_row = tile.row === y_length - 1
        const is_left_column = tile.column === 0
        const is_right_column = tile.column === x_length - 1

        const left_cell = is_left_column ? null : tiles.find(t => t.val === tile.val - 1)
        const top_left_cell = is_top_row || is_left_column ? null : tiles.find(t => t.val === tile.val - x_length - 1)
        const top_cell = is_top_row ? null : tiles.find(t => t.val === tile.val - x_length)
        const top_right_cell = is_top_row || is_right_column ? null : tiles.find(t => t.val === tile.val - x_length + 1)
        const right_cell = is_right_column ? null : tiles.find(t => t.val === tile.val + 1)
        const bottom_right_cell = is_bottom_row || is_right_column ? null : tiles.find(t => t.val === tile.val + x_length + 1)
        const bottom_cell = is_bottom_row ? null : tiles.find(t => t.val === tile.val + x_length)
        const bottom_left_cell = is_bottom_row || is_left_column ? null : tiles.find(t => t.val === tile.val + x_length - 1)

        const surrounding_cells: (Tile | null | undefined)[] = [left_cell, top_left_cell, top_cell, top_right_cell, right_cell, bottom_right_cell, bottom_cell, bottom_left_cell]

        grid.push({
            val: tile.val,
            row: tile.row,
            column: tile.column,
            mine: tile.mine,
            touching: surrounding_cells.filter(cell => !!cell && cell.mine).length,
        })
    })

    return grid
}

export const createGrid = (x_length: number, y_length: number, total_mines: number): Tile[] => {
    const mines: number[] = getMines(total_mines, x_length, y_length)

    const tiles: Tile[] = []
    for (let i = 0; i < y_length; i += 1) {
        for (let j = 0; j < x_length; j += 1) {
            const cellValue = x_length * i + (j + 1)

            tiles.push({
                val: cellValue,
                row: i,
                column: j,
                mine: mines.indexOf(cellValue) !== -1,
                touching: 0,
            })
        }
    }

    const grid: Tile[] = getTouchingValues(tiles, x_length, y_length)

    return grid
}

// console.log('----------------------------')

export const wasd2 = () => {
    console.log('hows it going')
}

// module.exports = {
//     wasd,
// }
