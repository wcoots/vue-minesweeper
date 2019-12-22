import Vue from 'vue'
import Vuex from 'vuex'
import { Tile, ZeroGroup } from '../types/types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        grid: [] as Tile[],
        zero_groups: [] as ZeroGroup[],
    },
    getters: {
        getTileInfo: state => (tile_id: number) => {
            return state.grid.find(tile => tile.id === tile_id)
        },
    },
    mutations: {
        setGrid(state, grid: Tile[]) {
            state.grid = grid
        },
        setZeroGroups(state, zero_groups: ZeroGroup[]) {
            state.zero_groups = zero_groups
        },
        setTileStatus(state, { tile_id, status }) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.status = status
                    if (status === 'unclicked') {
                        tile.value = ''
                    } else if (status === 'clicked') {
                        tile.value = tile.mine ? '☢' : tile.touching ? `${tile.touching}` : ''
                    } else if (status === 'flagged') {
                        tile.value = '⚑'
                    } else if (status === 'uncertain') {
                        tile.value = '?'
                    }
                }
            }
        },
    },
    actions: {
        leftClickTile({ commit, state }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (tile.status === 'flagged' || tile.status === 'uncertain') {
                        commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                    } else if (tile.status === 'unclicked') {
                        if (tile.touching === 0 && !tile.mine) {
                            const zero_group: ZeroGroup | undefined = state.zero_groups.find((group: ZeroGroup) => group.zero_tile_ids.indexOf(tile_id) !== -1)
                            if (zero_group) {
                                zero_group.zero_tile_ids.forEach((id: number) => commit('setTileStatus', { tile_id: id, status: 'clicked' }))
                                zero_group.surrounding_tile_ids.forEach((id: number) => commit('setTileStatus', { tile_id: id, status: 'clicked' }))
                            }
                        } else {
                            commit('setTileStatus', { tile_id: tile.id, status: 'clicked' })
                        }
                    }
                }
            }
        },
        rightClickTile({ commit, state }, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    if (tile.status === 'unclicked') {
                        commit('setTileStatus', { tile_id: tile.id, status: 'flagged' })
                    } else if (tile.status === 'flagged') {
                        commit('setTileStatus', { tile_id: tile.id, status: 'uncertain' })
                    } else if (tile.status === 'uncertain') {
                        commit('setTileStatus', { tile_id: tile.id, status: 'unclicked' })
                    }
                }
            }
        },
    },
    modules: {},
})
