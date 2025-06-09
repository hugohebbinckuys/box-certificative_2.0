<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useStudentStore } from "../store/store";

const studentStore= useStudentStore()

const username = ref("")
const password = ref("")

const login = async () => {
    try {
        const data = {
            username: username.value, 
            password: password.value, 
        }
        console.log("envoie des informations suivantes : ", data)
        const response = await axios.post("http://127.0.0.1:5000/login", data)
        console.log("user ", username, " connecté")
        studentStore.connect()
        router.push('/student')
    } catch (error) {
        console.error("erreur : ", error)
        alert("password incorrect")
    }
}

</script>

<template>
    <p> // Login views // </p>

    <form action="">
        <label for="username">username</label>
        <input type="text" id="username" placeholder="Hug" v-model="username"><br>
        <label for="password">password</label>
        <input type="password" id="password" placeholder="e7udh/84dsed9ds@!" v-model="password"> <br>
        <input type="submit" value="se connecter" @click.prevent="login()">
    </form> 
</template>