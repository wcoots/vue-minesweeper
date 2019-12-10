<template>
    <div class="hello">
        <p>Calculator</p>
        <div v-for="item in keys" v-bind:key="item.val">
            <Key :digit="item.val" />
            <!-- {{ item }} -->
        </div>
    </div>
</template>

<script lang="ts">
import Key from './Key.vue'

export default {
    name: 'Calculator',
    data() {
        return {
            keys: [
                {
                    val: 1,
                    type: 'digit',
                },
                {
                    val: 2,
                    type: 'digit',
                },
                {
                    val: 3,
                    type: 'digit',
                },
            ],
        }
    },
    components: {
        Key,
    },
    methods: {
        press() {
            console.log('hello')
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#button {
    width: 30px;
    height: 30px;
    background-color: grey;
    margin: 50px 50px;
    padding: 10px;
    color: white;
}
</style>
