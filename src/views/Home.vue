<template>
    <div class="home">
        <Calculator :digit="1" />
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
