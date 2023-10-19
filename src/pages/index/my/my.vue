<template>

</template>
<script setup lang="ts">
    import { ref,watch } from 'vue';
    const count = ref(0)
    watch(count,(newValue,oldValue)=>{
        console.log(`count发生了变化,老值为${oldValue},新值为&{newValue}`)
    })
</script>