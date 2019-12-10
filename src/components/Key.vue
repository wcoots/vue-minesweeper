<template>
    <div class="hello">
        <div id="key" v-on:click="press">{{ digit }}</div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Key',
    props: {
        digit: {
            type: Number,
            required: true,
        },
    },
    methods: {
        press() {
            console.log(this.digit)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#key {
    width: 30px;
    height: 30px;
    background-color: grey;
    margin: 4px 4px;
    padding: 10px;
    color: white;
    display: inline-block;
    vertical-align: top;
}
</style>
