import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/home',
            redirect: '/about',
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
    ],
})

export default router
