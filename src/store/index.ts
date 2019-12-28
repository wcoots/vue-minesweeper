import Vue from 'vue'
import Vuex from 'vuex'
import { Tile, ZeroGroup, GameStatus, ClickType, PresetGame, GameMode } from '@/types'
import { createGridFromDimensions, createGridFromSeed, createGridFromGameMode } from '@/scripts'

const _ = require('lodash')

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        grid: [] as Tile[],
        zero_groups: [] as ZeroGroup[],
        click_type: 'normal' as ClickType,
        game: {
            x_length: 10,
            y_length: 10,
            mines: 15,
            seed: '',
            status: 'playing',
        } as GameStatus,
    },
    getters: {
        getTileInfo: state => (tile_id: number): Tile | undefined => {
            return state.grid.find(tile => tile.id === tile_id)
        },
        getClickType: state => (): ClickType => {
            return state.click_type
        },
        getGameInfo: state => (): GameStatus => {
            return state.game
        },
        getGrid: state => (): Tile[] => {
            return state.grid
        },
    },
    mutations: {
        setupGame(state, game_mode: GameMode) {
            let res = null

            if (game_mode.mode === 'specified') res = createGridFromDimensions(game_mode.x_length!, game_mode.y_length!, game_mode.total_mines!)
            else if (game_mode.mode === 'seed') res = createGridFromSeed(game_mode.seed!)
            else if (game_mode.mode === 'preset') res = createGridFromGameMode(game_mode.preset_name!)
            else res = createGridFromGameMode('beginner')

            const { x_length, y_length, total_mines, grid, zero_groups, seed } = res

            state.game.x_length = x_length
            state.game.y_length = y_length
            state.game.mines = total_mines
            state.game.seed = seed
            state.grid = grid
            state.zero_groups = zero_groups
        },
        setTileStatus(state, { tile_id, status }) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.status = status
                }
            }
        },
        swapClickType(state) {
            state.click_type = state.click_type === 'normal' ? 'flagging' : 'normal'
        },
        setClickType(state, click_type) {
            state.click_type = click_type
        },
        winGame(state) {
            state.game.status = 'won'
        },
        loseGame(state, tile_id: number) {
            state.game.status = 'lost'
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.exploded = true
                } else if (tile.mine) {
                    tile.status = 'clicked'
                }
            }
        },
        wipeGrid(state) {
            state.game.status = 'playing'
            for (const tile of state.grid) {
                tile.status = 'unclicked'
            }
        },
    },
    actions: {
        leftClickTile({ state, commit, dispatch }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (state.game.status === 'playing') {
                        if (state.click_type === 'normal') {
                            if (tile.status === 'flagged' || tile.status === 'uncertain') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            } else if (tile.status === 'unclicked') {
                                if (tile.mine) {
                                    commit('setTileStatus', { tile_id: tile.id, status: 'clicked' })
                                    commit('loseGame', tile_id)
                                } else if (tile.touching === 0) {
                                    const zero_group: ZeroGroup | undefined = state.zero_groups.find((group: ZeroGroup) => group.zero_tile_ids.indexOf(tile_id) !== -1)
                                    if (zero_group) {
                                        zero_group.zero_tile_ids.forEach((id: number) => commit('setTileStatus', { tile_id: id, status: 'clicked' }))
                                        zero_group.surrounding_tile_ids.forEach((id: number) => commit('setTileStatus', { tile_id: id, status: 'clicked' }))
                                    }
                                } else {
                                    commit('setTileStatus', { tile_id: tile.id, status: 'clicked' })
                                }
                            }
                        } else if (state.click_type === 'flagging') {
                            if (tile.status === 'flagged') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            } else if (tile.status !== 'clicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'flagged' })
                            }
                        }
                    }
                }
            }
            dispatch('checkGameStatus')
        },
        rightClickTile({ state, commit, dispatch }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (state.game.status === 'playing') {
                        if (state.click_type === 'normal') {
                            if (tile.status === 'unclicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'flagged' })
                            } else if (tile.status === 'flagged') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'uncertain' })
                            } else if (tile.status === 'uncertain') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            }
                        } else if (state.click_type === 'flagging') {
                            if (tile.status === 'uncertain') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            } else if (tile.status !== 'clicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'uncertain' })
                            }
                        }
                    }
                }
            }
            dispatch('checkGameStatus')
        },
        checkGameStatus({ state, commit }) {
            const all_tiles_flagged_or_clicked = _.every(state.grid, (tile: Tile) => {
                return tile.status === 'clicked' || tile.status === 'flagged'
            })
            if (all_tiles_flagged_or_clicked) {
                const flagged_tiles = state.grid.filter((tile: Tile) => tile.status === 'flagged')
                if (flagged_tiles.length === state.game.mines) {
                    commit('winGame')
                }
            }
        },
        resetGrid({ state, commit }) {
            commit('wipeGrid')
            commit('setupGame', { mode: 'specified', x_length: state.game.x_length, y_length: state.game.y_length, total_mines: state.game.mines })
            commit('setClickType', 'normal')
        },
    },
    modules: {},
})
