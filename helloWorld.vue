<template>
  <div>{{ msg }}</div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const msg = ref('你好世界')

        return { msg }
    }
})
</script>

<style>

</style>