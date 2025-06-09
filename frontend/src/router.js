import { createRouter, createWebHistory } from "vue-router";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Student from "./views/student/student.vue"
import { useStudentStore } from "./store/store";
import NotFound from "./views/NotFound.vue";

const routes = [
    {path: "/", name:"Home", component: Home},
    {path: "/register", name: 'Register', component: Register}, 
    {path: "/login", name: 'Login', component: Login}, 
    {path: "/student", name: 'Student', component: Student, meta:{requiredAuth:true}}, 
    {path: "/:pathMath(.*)*", name:NotFound, component: NotFound} // vue lit les routes a la suite donc ca c si l'user rentre une route qui n'existe pas 
]

const router = createRouter({
    history: createWebHistory(), 
    routes,
})

router.beforeEach((to, from, next) => {
    const studentStore = useStudentStore()
    if (studentStore.isConnected){
        console.log("\n -utilisateur connecté- \n")
    }
    else {
        console.log("\n -utilisateur déconnecté- \n\n")
    }

    if (to.meta.requiredAuth && !studentStore.isConnected){
        console.log(to.name, " page : l'utilisateur n'est pac connecté : redirect vers Login page\n")
        return next('Login')
    }
    else if (to.meta.requiredAuth && studentStore.isConnected){
        console.log(to.name, " page : l'utilisateur est connecté. Acces autorisé \n")
        return next()
    }
    else {
        console.log(to.name, " page : acces autorisé \n")
        return next()
    }
})

export default router;