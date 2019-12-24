import { Colors } from '@/types'

const MINE = '☢'
const FLAG = '⚑'
const UNCERTAIN = '?'

const COLORS = {
    red: '#ff0000',
    black: '#000000',
    b_grey: '#bdbdbd',
    b_green: '#a2f47b',
    m_black: '#000001',
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
