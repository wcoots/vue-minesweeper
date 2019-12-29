export interface Tile {
    id: number
    row: number
    column: number
    mine: boolean
    touching: number
    status: 'unclicked' | 'clicked' | 'flagged' | 'uncertain'
    exploded: boolean
}

export interface TileGroup {
    tile_id: number
    surrounding_tile_ids: number[]
}
export interface ZeroGroup {
    zero_tile_ids: number[]
    surrounding_tile_ids: number[]
}

export type ClickType = 'normal' | 'flagging'

export interface GameStatus {
    x_length: number
    y_length: number
    mines: number
    seed: string
    status: 'playing' | 'lost' | 'won'
}

type PresetGameName = 'beginner' | 'intermediate' | 'expert'

export interface PresetGame {
    name: PresetGameName
    x_length: number
    y_length: number
    total_mines: number
    total_tiles: number
}

export interface GameMode {
    mode: 'preset' | 'specified' | 'seed'
    x_length?: number
    y_length?: number
    total_mines?: number
    preset_name?: PresetGameName
    seed?: string
}
