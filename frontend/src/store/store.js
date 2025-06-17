import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStudentStore = defineStore('student', () => {
    //states 
    const state = ref({
        isConnected: sessionStorage.getItem("userIsConnected") === 'true', 
        role: sessionStorage.getItem("role"),
        isAdmin: sessionStorage.getItem("role") === "Admin",
    })

    //getter 

    const isConnected = computed(() => state.value.isConnected)
    const role = computed(() => state.value.role)
    const isAdmin = computed(() => state.value.isAdmin)

    //action 
    const connect = () => {
        state.value.isConnected = true
        sessionStorage.setItem("userIsConnected",'true')
    }
    const disconnect = () => {
        state.value.isConnected = false
        sessionStorage.setItem("userIsConnected", 'false')
        state.value.role = ""
        sessionStorage.setItem("role", "")
        state.value.isAdmin = false
        sessionStorage.setItem("isAdmin", "false")
    }
    const putRole = (roleSent) => {
        state.value.role = roleSent
        sessionStorage.setItem("role", roleSent)
        //on met les deux pour que avant ET après rafraichissement oin ait accèsq à la valeur 
    }

    return {
        state, 
        isConnected,
        role,
        isAdmin, 
        connect, 
        disconnect, 
        putRole,
    }
})