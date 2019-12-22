<template>
    <div>
        <Game />
        <Footer />
    </div>
</template>

<script>
import Game from '../components/Game.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Home',
    components: {
        Game,
        Footer,
    },
}
</script>
