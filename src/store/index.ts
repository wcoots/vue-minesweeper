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
        setTileAsClicked(state, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.clicked = true
                }
            }
        },
        setTileAsReleased(state, tile_id: number) {
            for (const tile of state.grid) {
                if (tile.id === tile_id) {
                    tile.released = true
                    tile.clicked = true
                }
            }
        },
    },
    actions: {
        getZeroGroup({ commit, state }, tile_id) {
            const zero_group: ZeroGroup | undefined = state.zero_groups.find((group: ZeroGroup) => group.zero_tile_ids.indexOf(tile_id) !== -1)
            if (zero_group) {
                zero_group.zero_tile_ids.forEach((id: number) => commit('setTileAsReleased', id))
                zero_group.surrounding_tile_ids.forEach((id: number) => commit('setTileAsReleased', id))
            }
        },
    },
    modules: {},
})
