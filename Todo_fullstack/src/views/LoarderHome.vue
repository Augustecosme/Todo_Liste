<script setup>
import Todolist from '../components/Todolist.vue'
import Loarder from './Loarder.vue';

import { ref } from 'vue';

const load = ref(true);
function affiche() {
    load.value = false;
}
setTimeout(() => {
    affiche()
}, 2000)
</script>

<template>
    <div>
        <Todolist v-if="!load"></Todolist>
        <Loarder v-else></Loarder>
       

    </div>
</template>
<style scoped></style>