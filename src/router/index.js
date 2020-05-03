import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import LoginUser from '../views/LoginUser.vue'
import SignupUser from '../views/SignupUser.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'list',
        component: List,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginUser
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupUser
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active-router',
    linkExactActiveClass: 'exact-active-router',
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login')
    }
    next()
})

export default router
