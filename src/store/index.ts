import Vue from 'vue'
import Vuex from 'vuex'
import { Tile, ZeroGroup, ClickType, GameStatus } from '@/types'
import { createGrid } from '@/scripts'
import consts from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        grid: [] as Tile[],
        zero_groups: [] as ZeroGroup[],
        click_type: { type: 'normal', value: '☜' } as ClickType,
        game: {
            x_length: 10,
            y_length: 10,
            mines: 15,
            status: 'playing',
        } as GameStatus,
    },
    getters: {
        getTileInfo: state => (tile_id: number) => {
            return state.grid.find(tile => tile.id === tile_id)
        },
        getClickTypeValue: state => () => {
            return state.click_type.value
        },
        getGameInfo: state => () => {
            return state.game
        },
        getGrid: state => () => {
            return state.grid
        },
    },
    mutations: {
        setupGame(state, payload = undefined) {
            const { grid, zero_groups } = createGrid(state.game.x_length, state.game.y_length, state.game.mines)
            if (payload) {
                state.grid = JSON.parse(payload.saved_grid)
                state.zero_groups = JSON.parse(payload.saved_zero_groups)
            } else {
                state.grid = grid
                state.zero_groups = zero_groups
            }
            localStorage.setItem('saved_zero_groups', JSON.stringify(state.zero_groups))
        },
        setTileStatus(state, { tile_id, status }) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.status = status
                    if (status === 'unclicked') {
                        tile.value = ''
                        tile.color = consts.COLORS.black
                    } else if (status === 'clicked') {
                        tile.value = tile.mine ? consts.MINE : tile.touching ? `${tile.touching}` : ''
                        tile.color = tile.mine ? consts.COLORS.black : consts.NUMBER_COLORS[`${tile.touching}`]
                    } else if (status === 'flagged') {
                        tile.value = consts.FLAG
                        tile.color = consts.COLORS.red
                    } else if (status === 'uncertain') {
                        tile.value = consts.UNCERTAIN
                        tile.color = consts.COLORS.black
                    }
                }
            }
        },
        changeClickType(state) {
            state.click_type = state.click_type.type === 'normal' ? { type: 'flag', value: '⚑' } : { type: 'normal', value: '☜' }
        },
        changeGameStatus(state, status: GameStatus['status']) {
            state.game.status = status
        },
        loseGame(state, tile_id: number) {
            state.game.status = 'lost'
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.color = consts.COLORS.m_black
                    tile.background_colour = consts.COLORS.red
                } else if (tile.mine) {
                    tile.value = consts.MINE
                    tile.color = consts.COLORS.m_black
                    if (tile.status === 'flagged') {
                        tile.background_colour = consts.COLORS.b_green
                    }
                    tile.status = 'clicked'
                }
            }
            localStorage.clear()
        },
        wipeGrid(state) {
            state.game.status = 'playing'
            for (const tile of state.grid) {
                tile.status = 'unclicked'
                tile.value = ''
            }
            localStorage.clear()
        },
    },
    actions: {
        leftClickTile({ commit, state }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (state.game.status === 'playing') {
                        if (state.click_type.type === 'normal') {
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
                        } else if (state.click_type.type === 'flag') {
                            if (tile.status === 'flagged') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            } else if (tile.status !== 'clicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'flagged' })
                            }
                        }
                    }
                }
            }
        },
        rightClickTile({ commit, state }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (state.game.status === 'playing') {
                        if (state.click_type.type === 'normal') {
                            if (tile.status === 'unclicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'flagged' })
                            } else if (tile.status === 'flagged') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'uncertain' })
                            } else if (tile.status === 'uncertain') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            }
                        } else if (state.click_type.type === 'flag') {
                            if (tile.status === 'uncertain') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                            } else if (tile.status !== 'clicked') {
                                commit('setTileStatus', { tile_id: tile.id, status: 'uncertain' })
                            }
                        }
                    }
                }
            }
        },
        resetGrid({ commit }) {
            commit('wipeGrid')
            commit('setupGame')
        },
    },
    modules: {},
})
