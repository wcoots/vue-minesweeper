<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>Calculator</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Calculator extends Vue {
    @Prop() private msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
