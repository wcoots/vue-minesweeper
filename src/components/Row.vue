<template>
    <div>
        <div v-for="key in keys" v-bind:key="key.mine">
            <Key :is_mine="key.mine" :touching="key.touching" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Key from './Key.vue'

export default Vue.extend({
    name: 'Row',
    props: {
        keys: {
            type: Array,
            required: true,
        },
    },
    components: {
        Key,
    },
    computed: {
        rowStyles(): object {
            return {
                width: `${30 * this.keys.length}px`,
            }
        },
    },
})
</script>

<style scoped>
.row {
    height: 30px;
    display: inline-block;
    vertical-align: top;
}
</style>
