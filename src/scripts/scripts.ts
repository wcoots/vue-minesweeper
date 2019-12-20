import { Tile, TileGroup, ZeroGroup } from '../types/types'

const getMines = (x_length: number, y_length: number, total_mines: number): number[] => {
    const mines: number[] = []

    while (mines.length < total_mines) {
        const x = Math.floor(Math.random() * (x_length * y_length - 1) + 1)
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

const getSurroundingTiles = (x_length: number, y_length: number, tile: Tile, tiles: Tile[]): (Tile | null | undefined)[] => {
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

    return [left_tile, top_left_tile, top_tile, top_right_tile, right_tile, bottom_right_tile, bottom_tile, bottom_left_tile]
}

const getTouchingValues = (x_length: number, y_length: number, tiles: Tile[]): Tile[] => {
    const grid: Tile[] = []

    tiles.forEach((tile: Tile) => {
        const surrounding_tiles: (Tile | null | undefined)[] = getSurroundingTiles(x_length, y_length, tile, tiles)

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

const getZeroGroups = (x_length: number, y_length: number, grid: Tile[]): ZeroGroup[] => {
    const zero_tiles: Tile[] = grid.filter(tile => tile.touching === 0 && tile.mine === false)
    const tile_groups: TileGroup[] = []
    zero_tiles.forEach((tile: Tile) => {
        const surrounding_tiles: (Tile | null | undefined)[] = getSurroundingTiles(x_length, y_length, tile, grid)
        tile_groups.push({
            tile_id: tile.id,
            surrounding_tile_ids: surrounding_tiles.filter(t => !!t).map(t => t!.id),
        })
    })
    const zero_groups: ZeroGroup[] = []
    const zero_tile_ids: number[] = zero_tiles.map((zero_tile: Tile) => zero_tile.id)
    tile_groups.forEach((tile_group: TileGroup) => {
        if (zero_tile_ids.indexOf(tile_group.tile_id) !== -1) {
            zero_tile_ids.splice(zero_tile_ids.indexOf(tile_group.tile_id))
            // TODO: replaces with _.intersection
            let surrounding_zero_tile_ids: number[] = tile_group.surrounding_tile_ids.filter(tile_id => zero_tile_ids.includes(tile_id))
            const wasd = true
            const zero_group: ZeroGroup = { zero_tile_ids: [], surrounding_tile_ids: [] }
            // while (wasd) {
            //     zero_group.zero_tile_ids.push(...surrounding_zero_tile_ids)
            //     surrounding_zero_tile_ids = []
            //     const surrounding_tile_groups =

            // }
            // console.log('TILE:')
            // console.log(zero_group.zero_tile_ids[0])
            // console.log('SURROUNDING TILES')
            // console.log(zero_group.surrounding_tile_ids)
            // console.log('ALL ZERO TILES')
            // console.log(zero_tile_ids)
            // console.log('INTERSECTION')
            // console.log(surrounding_zero_tile_ids)
            // console.log('\n====================================\n')
        }
    })
    return []
}

export const createGrid = (
    x_length: number,
    y_length: number,
    total_mines: number,
): {
    grid: Tile[]
    zero_groups: ZeroGroup[]
} => {
    // TODO: set x_length and y_length as globals so they don't have to be passed into every function

    const mines: number[] = getMines(x_length, y_length, total_mines)
    const tiles: Tile[] = getTiles(x_length, y_length, mines)
    const grid: Tile[] = getTouchingValues(x_length, y_length, tiles)
    const zero_groups: ZeroGroup[] = getZeroGroups(x_length, y_length, grid)

    return { grid, zero_groups }
}

export const wasd2 = () => {
    console.log('hows it going')
}
