export interface Tile {
    id: number
    row: number
    column: number
    value: string
    mine: boolean
    touching: number
    status: 'unclicked' | 'clicked' | 'flagged' | 'uncertain'
}

export interface TileGroup {
    tile_id: number
    surrounding_tile_ids: number[]
}
export interface ZeroGroup {
    zero_tile_ids: number[]
    surrounding_tile_ids: number[]
}
