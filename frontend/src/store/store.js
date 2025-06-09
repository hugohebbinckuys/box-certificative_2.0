import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStudentStore = defineStore('student', () => {
    //states 
    const state = ref({
        isConnected: sessionStorage.getItem("userIsConnected") === 'true', 
        isAdmin: sessionStorage.getItem("userIsAdmin") === "true"
    })

    //getter 

    const isConnected = computed(() => state.value.isConnected)
    const isAdmin = computed(() => state.value.isAdmin)

    //action 
    const connect = () => {
        state.value.isConnected = true
        sessionStorage.setItem("userIsConnected",'true')
    }
    const disconnect = () => {
        state.value.isConnected = false
        sessionStorage.setItem("userIsConnected", 'false')
        state.value.isAdmin = false 
        sessionStorage.setItem("userIsAdmin", "false")
    }

    const connectAsAdmin = () => {
        state.value.isAdmin = true
        sessionStorage.setItem("userIsAdmin", "true")
    }

    return {
        state, 
        isConnected,
        isAdmin, 
        connect, 
        disconnect, 
        connectAsAdmin, 
    }
})