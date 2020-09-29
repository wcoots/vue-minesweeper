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
    flag_count: number
}

export enum PresetName {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    EXPERT = 'expert',
}

export interface PresetGame {
    name: PresetName
    x_length: number
    y_length: number
    total_mines: number
    total_tiles: number
}

export interface PresetGameString {
    name: PresetName
    specs: string
}

export interface GameMode {
    mode: GameModeName
    x_length?: number
    y_length?: number
    total_mines?: number
    preset_name?: PresetName
    seed?: string
}

export enum GameModeName {
    PRESET = 'preset',
    SPECIFIED = 'specified',
    SEED = 'seed',
}
