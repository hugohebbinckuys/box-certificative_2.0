<script setup>
import axios from 'axios';
import { ref } from 'vue';

const username = ref("")
const password = ref("")
const role = ref("student") 

const createUser = async () => {
    try {
        console.log("est ce que on passe par ici ? ")
        const data = {
            username: username.value, 
            password: password.value, 
            role: role.value
        }
        console.log("envoie des informations suivantes : ", data)
        const response = await axios.post("http://127.0.0.1:5000/createUser", data)
        console.log("user : ", username.value, "créé")
    } catch (error) {
        console.error("erreur lors de la création de l'utilisateur ", username.value)
    }
}

</script>

<template>

    <p> // register view // </p> <br>

    <!-- <form :action="createUser(username, password)"> -->
    <form action="" method="post">
        <label for="username"> Username </label>
        <input type="text" v-model="username" id="username" placeholder="Hug">
        <label for="password"> Password </label> 
        <input type="password" v-model="password" id="password" placeholder="e7udh/84dsed9ds@!">
        <input type="submit" @click.prevent="createUser()" value="Créer mon compte">
    </form>
</template>