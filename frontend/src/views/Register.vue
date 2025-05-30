<script setup>
import axios from 'axios';
import { ref } from 'vue';

const username = ref("")
const password = ref("")
const role = ref("student") 

let createUser = async (username, password) => {
    try {
        data = {
            username: username, 
            password: password, 
            role: role
        }    
        const response = await axios.post("lien vers api", data)
        console.log("user : ", username, "créé")
    } catch (error) {
        console.error("erreur lors de la création de l'utilisateur ", username)
    }
}

</script>

<template>

    <p> // register view // </p> <br>

    <!-- <form :action="createUser(username, password)"> -->
    <form action="">
        <label for="username"> Username </label>
        <input type="text" v-model="username" id="username" placeholder="Hug">
        <label for="password"> Password </label> 
        <input type="password" v-model="password" id="password" placeholder="e7udh/84dsed9ds@!">
        <input type="submit" @click.prevent="createUser(username, password)" value="Créer mon compte">
    </form>
</template>