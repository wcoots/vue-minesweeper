import { Tile, TileGroup, ZeroGroup, GameMode, PresetGame } from '@/types'

const _ = require('lodash')
const gen = require('random-seed')

const GAME_MODES: PresetGame[] = [
    {
        name: 'beginner',
        x_length: 9,
        y_length: 9,
        total_mines: 10,
        total_tiles: 81,
    },
    {
        name: 'intermediate',
        x_length: 16,
        y_length: 16,
        total_mines: 40,
        total_tiles: 256,
    },
    {
        name: 'expert',
        x_length: 30,
        y_length: 16,
        total_mines: 99,
        total_tiles: 480,
    },
]
const MAX_X: number = 30
const MAX_Y: number = 30
const MAX_M: number = 3

export const validateSeed = (seed: string): { x_length: number; y_length: number; total_mines: number; valid_seed: string } | undefined => {
    const is_valid_seed: boolean = /^([0-9]+)-([0-9]+)-([0-9]+)-([0-9A-Za-z]+)$/.test(seed)

    if (is_valid_seed) {
        const splitted: string[] = seed.split('-')
        const x_length: number = +splitted[0] <= MAX_X ? +splitted[0] : MAX_X
        const y_length: number = +splitted[1] <= MAX_Y ? +splitted[1] : MAX_Y
        const max_mines: number = Math.floor((x_length * y_length) / MAX_M)
        const total_mines: number = +splitted[2] <= max_mines ? +splitted[2] : max_mines

        return {
            x_length,
            y_length,
            total_mines,
            valid_seed: splitted[3],
        }
    }
    return undefined
}

const generateRandomSeed = (): string => {
    return Math.random()
        .toString(36)
        .substr(2, 10)
}

const returnSeed = (x_length: number, y_length: number, total_mines: number, input_seed: string): string => {
    return `${x_length}-${y_length}-${total_mines}-${input_seed}`
}

const createMines = (seed: string, total_mines: number, total_tiles: number): number[] => {
    const mines: number[] = []
    const rand = gen.create(seed)

    while (mines.length < total_mines) {
        const x = rand.intBetween(1, total_tiles)
        if (mines.indexOf(x) === -1) mines.push(x)
    }

    rand.done()
    return mines
}

const getMinesFromDimensions = (
    input_x_length: number,
    input_y_length: number,
    input_total_mines: number,
): { x_length: number; y_length: number; total_mines: number; mines: number[]; seed: string } => {
    const random_seed: string = generateRandomSeed()
    const x_length = input_x_length <= MAX_X ? input_x_length : MAX_X
    const y_length = input_y_length <= MAX_Y ? input_y_length : MAX_Y
    const total_tiles: number = x_length * y_length
    const max_mines: number = Math.floor(total_tiles / MAX_M)
    const total_mines = input_total_mines <= max_mines ? input_total_mines : max_mines
    const mines: number[] = createMines(random_seed, total_mines, total_tiles)
    const seed = returnSeed(x_length, y_length, total_mines, random_seed)

    return { x_length, y_length, total_mines, mines, seed }
}

const getMinesFromSeed = (input_seed: string): { x_length: number; y_length: number; total_mines: number; mines: number[]; seed: string } | undefined => {
    const validated_seed = validateSeed(input_seed)
    if (!validated_seed) return undefined
    const { x_length, y_length, total_mines, valid_seed } = validated_seed
    const total_tiles: number = x_length * y_length
    const mines: number[] = createMines(valid_seed, total_mines, total_tiles)
    const seed = returnSeed(x_length, y_length, total_mines, valid_seed)

    return { x_length, y_length, total_mines, mines, seed }
}

const getMinesFromGameMode = (game_mode_name: PresetGame['name']): { x_length: number; y_length: number; total_mines: number; mines: number[]; seed: string } => {
    const random_seed = generateRandomSeed()
    const { x_length, y_length, total_mines, total_tiles } = GAME_MODES.find((mode: PresetGame) => mode.name === game_mode_name) || GAME_MODES[0]
    const mines: number[] = createMines(random_seed, total_mines, total_tiles)
    const seed = returnSeed(x_length, y_length, total_mines, random_seed)

    return { x_length, y_length, total_mines, mines, seed }
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
                status: 'unclicked',
                exploded: false,
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

        const new_tile: Tile = {
            id: tile.id,
            row: tile.row,
            column: tile.column,
            mine: tile.mine,
            touching: surrounding_tiles.filter(t => !!t && t.mine).length,
            status: tile.status,
            exploded: tile.exploded,
        }

        grid.push(new_tile)
    })

    return grid
}

const getZeroGroups = (x_length: number, y_length: number, grid: Tile[]): ZeroGroup[] => {
    // TODO: clean up this mess

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
    let zero_tile_ids: number[] = zero_tiles.map((zero_tile: Tile) => zero_tile.id)

    while (zero_tile_ids.length) {
        const new_group: ZeroGroup = { zero_tile_ids: [], surrounding_tile_ids: [] }
        const group_starter_id: number = zero_tile_ids[0]
        const group_starter: TileGroup | undefined = tile_groups.find(tg => tg.tile_id === group_starter_id)
        if (group_starter) {
            new_group.zero_tile_ids.push(group_starter.tile_id)
            new_group.surrounding_tile_ids.push(...group_starter.surrounding_tile_ids)
            let group_zeros: number[] = _.intersection(zero_tile_ids, group_starter.surrounding_tile_ids)
            zero_tile_ids = zero_tile_ids.filter(t => t !== group_starter_id) // delete from zero_tile_ids

            while (group_zeros.length) {
                const current_tile_id: number = group_zeros[0]
                const current_tile: TileGroup | undefined = tile_groups.find(tg => tg.tile_id === current_tile_id)
                if (current_tile) {
                    const new_group_zeros: number[] = _.intersection(zero_tile_ids, current_tile.surrounding_tile_ids)
                    group_zeros.push(...new_group_zeros)
                    new_group.zero_tile_ids.push(current_tile.tile_id)
                    new_group.surrounding_tile_ids.push(...current_tile.surrounding_tile_ids)
                    zero_tile_ids = zero_tile_ids.filter(t => t !== current_tile_id) // delete from zero_tile_ids
                    group_zeros = group_zeros.filter(gz => gz !== current_tile_id)
                }
            }
            new_group.surrounding_tile_ids = _.uniq(new_group.surrounding_tile_ids.filter((tile_id: number) => new_group.zero_tile_ids.indexOf(tile_id) === -1))
            zero_groups.push(new_group)
        }
    }

    return zero_groups
}

export const createGrid = (
    game_mode: GameMode,
): {
    x_length: number
    y_length: number
    total_mines: number
    seed: string
    grid: Tile[]
    zero_groups: ZeroGroup[]
} => {
    let res = null

    if (game_mode.mode === 'specified' && game_mode.x_length && game_mode.y_length && game_mode.total_mines) res = getMinesFromDimensions(game_mode.x_length, game_mode.y_length, game_mode.total_mines)
    else if (game_mode.mode === 'seed' && game_mode.seed) res = getMinesFromSeed(game_mode.seed) || getMinesFromGameMode('beginner')
    else if (game_mode.mode === 'preset' && game_mode.preset_name) res = getMinesFromGameMode(game_mode.preset_name)
    else res = getMinesFromGameMode('beginner')

    const { x_length, y_length, total_mines, mines, seed } = res

    const tiles: Tile[] = getTiles(x_length, y_length, mines)
    const grid: Tile[] = getTouchingValues(x_length, y_length, tiles)
    const zero_groups: ZeroGroup[] = getZeroGroups(x_length, y_length, grid)

    return { x_length, y_length, total_mines, seed, grid, zero_groups }
}
