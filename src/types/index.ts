export interface Tile {
    id: number
    row: number
    column: number
    value: string
    mine: boolean
    touching: number
    status: 'unclicked' | 'clicked' | 'flagged' | 'uncertain'
    exploded: boolean
    color: string
    background_colour?: string
}

export interface TileGroup {
    tile_id: number
    surrounding_tile_ids: number[]
}
export interface ZeroGroup {
    zero_tile_ids: number[]
    surrounding_tile_ids: number[]
}

export interface ClickType {
    type: 'normal' | 'flag'
    value: '☜' | '⚑'
}

export interface GameStatus {
    x_length: number
    y_length: number
    mines: number
    status: 'playing' | 'lost' | 'won'
}

export interface Colors {
    [key: string]: string
}
