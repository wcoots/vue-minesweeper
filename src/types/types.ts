export interface Tile {
    id: number
    row: number
    column: number
    mine: boolean
    touching: number
}

export interface ZeroGroup {
    zero_tile_ids: number[]
    surrounding_tile_ids: number[]
}
