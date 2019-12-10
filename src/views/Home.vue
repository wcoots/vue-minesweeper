<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1>Home</h1>
        <Calculator />
    </div>
</template>

<script>
import Calculator from '../components/Calculator.vue'

export default {
    name: 'Home',
    components: {
        Calculator,
    },
    created() {
        console.log('hello')
    },
}
</script>
