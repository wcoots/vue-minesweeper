import { Tile } from '../types/types'

const getMines = (x_length: number, y_length: number, total_mines: number): number[] => {
    const mines: number[] = []

    while (mines.length < total_mines) {
        const x = Math.floor(Math.random() * (x_length * y_length)) + 1
        if (mines.indexOf(x) === -1) mines.push(x)
    }

    return mines
}

const getTiles = (x_length: number, y_length: number, mines: number[]): Tile[] => {
    const tiles: Tile[] = []

    for (let i = 0; i < y_length; i += 1) {
        for (let j = 0; j < x_length; j += 1) {
            const tile_id = x_length * i + (j + 1)

            tiles.push({
                id: tile_id,
                row: i,
                column: j,
                mine: mines.indexOf(tile_id) !== -1,
                touching: 0,
            })
        }
    }

    return tiles
}

const getTouchingValues = (x_length: number, y_length: number, tiles: Tile[]): Tile[] => {
    const grid: Tile[] = []

    tiles.forEach((tile: Tile) => {
        const is_top_row = tile.row === 0
        const is_bottom_row = tile.row === y_length - 1
        const is_left_column = tile.column === 0
        const is_right_column = tile.column === x_length - 1

        const left_tile = is_left_column ? null : tiles.find(t => t.id === tile.id - 1)
        const top_left_tile = is_top_row || is_left_column ? null : tiles.find(t => t.id === tile.id - x_length - 1)
        const top_tile = is_top_row ? null : tiles.find(t => t.id === tile.id - x_length)
        const top_right_tile = is_top_row || is_right_column ? null : tiles.find(t => t.id === tile.id - x_length + 1)
        const right_tile = is_right_column ? null : tiles.find(t => t.id === tile.id + 1)
        const bottom_right_tile = is_bottom_row || is_right_column ? null : tiles.find(t => t.id === tile.id + x_length + 1)
        const bottom_tile = is_bottom_row ? null : tiles.find(t => t.id === tile.id + x_length)
        const bottom_left_tile = is_bottom_row || is_left_column ? null : tiles.find(t => t.id === tile.id + x_length - 1)

        const surrounding_tiles: (Tile | null | undefined)[] = [left_tile, top_left_tile, top_tile, top_right_tile, right_tile, bottom_right_tile, bottom_tile, bottom_left_tile]

        grid.push({
            id: tile.id,
            row: tile.row,
            column: tile.column,
            mine: tile.mine,
            touching: surrounding_tiles.filter(t => !!t && t.mine).length,
        })
    })

    return grid
}

const getZeroGroups = (x_length: number, y_length: number, grid: Tile[]) => {}

export const createGrid = (x_length: number, y_length: number, total_mines: number): Tile[] => {
    const mines: number[] = getMines(total_mines, x_length, y_length)

    const tiles: Tile[] = getTiles(x_length, y_length, mines)

    const grid: Tile[] = getTouchingValues(x_length, y_length, tiles)

    const zeroGroups = getZeroGroups(x_length, y_length, grid)

    return grid
}

// console.log('----------------------------')

export const wasd2 = () => {
    console.log('hows it going')
}

// module.exports = {
//     wasd,
// }
