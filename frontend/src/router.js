import { createRouter, createWebHistory } from "vue-router";
import { useStudentStore } from "./store/store";

import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Student from "./views/student/Student.vue";
import NotFound from "./views/NotFound.vue";
import AdminPage from "./views/admin/AdminPage.vue";

const routes = [
    {path: "/", name:"Home", component: Home},
    {path: "/register", name: 'Register', component: Register, meta:{disconnectWhenAccess:true}}, 
    {path: "/login", name: 'Login', component: Login, meta:{disconnectWhenAccess:true}}, 
    {path: "/student", name: 'Student', component: Student, meta:{requiredAuth:true}}, 
    {path: "/admin", name:AdminPage, component: AdminPage, meta:{requiredSuperAuth:true}},
    {path: "/:pathMath(.*)*", name:NotFound, component: NotFound} // vue lit les routes a la suite donc ca c si l'user rentre une route qui n'existe pas 
]

const router = createRouter({
    history: createWebHistory(), 
    routes,
})

router.beforeEach((to, from, next) => {
    const studentStore = useStudentStore()
    console.log("from page : ", from)

    if (studentStore.isAdmin){
        console.log("\n -ADMIN connecté- \n\n")
    }
    else if (studentStore.isConnected){
        console.log("\n -utilisateur connecté- \n\n")
    }
    else {
        console.log("\n -utilisateur déconnecté- \n\n")
    }
    if (to.meta.disconnectWhenAccess && studentStore.isConnected && !studentStore.isAdmin){
        if (confirm("Etes-vous sur ? Cette action vous deconnectera.")){
            studentStore.disconnect()
            return next()
        }
        else {
            console.log("from page : ", from)
            return next(from)
        }
    }
    if (to.meta.requiredSuperAuth && !studentStore.isAdmin){
        console.log(to.name, " page : l'utilisateur n'est pas administrateur : redirect vers Login page\n")
        return next(from)
    }
    if (to.meta.requiredAuth && !studentStore.isConnected){
        console.log(to.name, " page : l'utilisateur n'est pac connecté : redirect vers Login page\n")
        return next(from)
    }
    else if (to.meta.requiredAuth && studentStore.isConnected){
        console.log(to.name, " page : l'utilisateur est connecté, role :", studentStore.role, ". Acces autorisé \n")
        return next()
    }
    else {
        console.log(to.name, " page : acces autorisé \n")
        return next()
    }
})

export default router;