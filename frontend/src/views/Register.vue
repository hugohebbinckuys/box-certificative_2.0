<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useStudentStore } from "../store/store.js"
import router from "@/router"

const studentStore = useStudentStore() 

const username = ref("")
const password = ref("")
const role = ref("Student") 
const afficherSuccess = ref(false)

// deleteMessagAfter10sec()

const createUser = async () => {
    try {
        // console.log("est ce que on passe par ici ? ")
        const data = {
            username: username.value, 
            password: password.value, 
            role: role.value
        }
        console.log("envoie des informations suivantes : ", data)
        const response = await axios.post("http://127.0.0.1:5000/createUser", data)
        console.log("user : ", username.value, "créé")
        if (studentStore.role !== 'Admin'){
            studentStore.connect()
            router.push('/Student')
        }
        else {
            afficherSuccess.value = true
            router.push("/Register")
        }
    } catch (error) {
        console.error("erreur lors de la création de l'utilisateur ", username.value)
        alert("le nom d'utilisateur existe deja")
    }
}

const isAdmin = computed (() => studentStore.role === "Admin")

</script>
    
<template>

    <p> // register view // </p> <br>

    <h3 v-if="isAdmin === false">Bienvenu jeune étudiant inscris toi </h3>
    <h3 v-else> Bienvenu admin </h3>
    <form action="" method="post">
        <label for="username"> Username </label>
        <input type="text" v-model="username" id="username" placeholder="Hug">
        <label for="password"> Password </label> 
        <input type="password" v-model="password" id="password" placeholder="e7udh/84dsed9ds@!">
        <div v-if="isAdmin === true">
            <label for="role"> Role </label>
            <select id="role" v-model="role">
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
            </select> <br>
        </div>
        <input type="submit" @click.prevent="createUser()" value="Créer mon compte">
        <p v-if="afficherSuccess">
            Nouvel utilisateur créé !
        </p>
    </form>
</template>