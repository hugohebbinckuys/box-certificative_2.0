<script setup>
import { useStudentStore } from "../store/store";
import router from '@/router'

const studentStore = useStudentStore() 

const disconnect = () => {
    if (confirm("Etes vous sur ? Cette action vous déconnectera... ")){
        studentStore.disconnect()
        router.push("/") 
    }
    else {
        return
    }
}

</script>

<template>
    <p> // navbar component // </p>
    <ul>
        <RouterLink to="/">accueil</RouterLink>
    </ul>
    <ul v-if="studentStore.isConnected"> <button type="submit" @click.prevent="disconnect()"L> Logout </button> </ul>
    <hr>
</template>