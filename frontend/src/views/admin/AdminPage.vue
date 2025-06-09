<script setup>
import { ref } from "vue"

const username = ref("")
const password = ref("")
const role = ref("")

const createUser = async () => {
    try {
        // console.log("est ce que on passe par ici ? ")
        const data = {
            username: username.value, 
            password: password.value, 
            role: role.value,
        }
        console.log("envoie des informations suivantes : ", data)
        const response = await axios.post("http://127.0.0.1:5000/createUser", data)
        console.log("user : ", username.value, "créé")
        router.push('/admin')
    } catch (error) {
        console.error("erreur lors de la création de l'utilisateur ", username.value)
        alert("le nom d'utilisateur existe deja")
    }
}

</script>

<template>
    Salut Admin
    <form action="" method="post">
        <label for="username"> Username </label>
        <input type="text" v-model="username" id="username" placeholder="Hug"> <br>
        <label for="password"> Password </label> 
        <input type="password" v-model="password" id="password" placeholder="e7udh/84dsed9ds@!"> <br>
        <label for="role"> Role </label>
        <!-- <select id="role" v-model="role">
            <option value="student">student</option>
            <option value="teacher">teacher</option>
            <option value="admin">admin</option>
        </select> <br> -->
        <input type="text" v-model="role">
        <input type="submit" @click.prevent="createUser()" value="Créer mon compte"> 
    </form>
</template>