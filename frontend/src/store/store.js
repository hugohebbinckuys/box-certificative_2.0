import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStudentStore = defineStore('student', () => {
    //states 
    const state = ref({
        isConnected: sessionStorage.getItem("userIsConnected") === 'true'
    })

    //getter 

    const isConnected = computed(() => state.value.isConnected)

    //action 
    const connect = () => {
        state.value.isConnected = true
        sessionStorage.setItem("userIsConnected",'true')
    }
    const disconnect = () => {
        state.value.isConnected = false
        sessionStorage.setItem("userIsConnected", 'false')
    }

    return {
        state, 
        isConnected,
        connect, 
        disconnect, 
    }
})