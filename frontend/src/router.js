import { createRouter, createWebHistory } from "vue-router";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Student from "./views/student/student.vue"
import { useStudentStore } from "./store/store";
import NotFound from "./views/NotFound.vue";
import AdminPage from "./views/admin/AdminPage.vue";

const routes = [
    {path: "/", name:"Home", component: Home},
    {path: "/register", name: 'Register', component: Register}, 
    {path: "/login", name: 'Login', component: Login}, 
    {path: "/student", name: 'Student', component: Student, meta:{requiredAuth:true}}, 
    {path: "/admin", name:AdminPage, component: AdminPage, meta:{requiredSuperAuth:false}},
    {path: "/:pathMath(.*)*", name:NotFound, component: NotFound} // vue lit les routes a la suite donc ca c si l'user rentre une route qui n'existe pas 
]

const router = createRouter({
    history: createWebHistory(), 
    routes,
})

router.beforeEach((to, from, next) => {
    const studentStore = useStudentStore()

    if (studentStore.isAdmin){
        console.log("\n -ADMIN connecté- \n\n")
    }
    if (studentStore.isConnected){
        console.log("\n -utilisateur connecté- \n\n")
    }
    else {
        console.log("\n -utilisateur déconnecté- \n\n")
    }

    if (to.meta.requiredSuperAuth && !studentStore.isAdmin){
        console.log(to.name, " page : l'utilisateur n'est pas administrateur : redirect vers Login page\n")
        return next('Login')
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