<script setup>
import { computed, ref } from 'vue';
import Register from './Register.vue';
import axios from 'axios';
import { useStudentStore } from '@/store/store';

const studentStore = useStudentStore()
// const isAdmin = ref(studentStore.role)

const isAdmin = computed (() => studentStore.role === "Admin")


</script>

<template>
    <div v-if="!isAdmin">
        <p> // Home views //</p>
        <p>Bienvenue sur la page d'accueil </p>

        <RouterLink to="Register"> Créer un compte </RouterLink> <br><br>
        <RouterLink to="Login"> Se connecter </RouterLink>
    </div>
    <div v-else>
        <p> // Home views - admin //</p>
        <p> Bienvenue administrateur </p>

        <RouterLink to="Register"> Créer un compte </RouterLink> <br><br>
    </div>
    

</template>