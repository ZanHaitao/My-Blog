import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultLayout from '../layout/defaultLayout.vue'
import admin from '../view/admin/admin.vue'

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
}, {
    path: '/admin',
    name: 'admin',
    component: admin,
    redirect: '/login',
    children: [{
        path: 'login',
        name: 'login',
        component: () => import('../view/admin/login.vue')
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router