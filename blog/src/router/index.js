import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultLayout from '../layout/defaultLayout.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'default',
    component: defaultLayout,
    redirect: '/index',
    children: [{
        path: 'index',
        name: 'index',
        component: () => import('../view/index/index.vue')
    }]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router