import { Colors } from '@/types'

const MINE = '☢'
const FLAG = '⚑'
const UNCERTAIN = '?'

const COLORS = {
    RED: '#ff0000',
    BLACK: '#000000',
    GREEN: '#a2f47b',
    MINE_BLACK: '#000001',
} as Colors

const NUMBER_COLORS = {
    '1': '#0000ff',
    '2': '#007b00',
    '3': '#ff0000',
    '4': '#00007b',
    '5': '#7b0000',
    '6': '#027f80',
    '7': '#000000',
    '8': '#7f7f7f',
} as Colors

export default {
    MINE,
    FLAG,
    UNCERTAIN,
    COLORS,
    NUMBER_COLORS,
}
