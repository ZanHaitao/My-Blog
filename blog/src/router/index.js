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
    },{
        path: 'articleDetail/:id',
        name: 'articleDetail',
        component: () => import('../view/index/articleDetail.vue')
    }]
}, {
    path: '/admin',
    name: 'admin',
    component: admin,
    redirect: '/admin/login',
    children: [{
        path: 'login',
        name: 'login',
        component: () => import('../view/admin/login.vue')
    }, {
        path: 'index',
        name: 'adminIndex',
        component: () => import('../view/admin/index.vue')
    }, {
        path: 'userinfo',
        name: 'userInfo',
        component: () => import('../view/admin/userInfo.vue')
    }, {
        path: 'config',
        name: 'config',
        component: () => import('../view/admin/config.vue')
    }, {
        path: 'publishArticle',
        name: 'publishArticle',
        component: () => import('../view/admin/publishArticle.vue')
    }, {
        path: 'publishPage',
        name: 'publishPage',
        component: () => import('../view/admin/publishPage.vue')
    }, {
        path: 'articleManage',
        name: 'articleManage',
        component: () => import('../view/admin/articleManage.vue')
    }, {
        path: 'pageManage',
        name: 'pageManage',
        component: () => import('../view/admin/pageManage.vue')
    }, {
        path: 'typeManage',
        name: 'typeManage',
        component: () => import('../view/admin/typeManage.vue')
    }, {
        path: 'labelManage',
        name: 'labelManage',
        component: () => import('../view/admin/labelManage.vue')
    }, {
        path: 'everyDayManage',
        name: 'everyDayManage',
        component: () => import('../view/admin/everyDayManage.vue')
    }, {
        path: 'commentManage',
        name: 'commentManage',
        component: () => import('../view/admin/commentManage.vue')
    }, {
        path: 'editArticle',
        name: 'editArticle',
        component: () => import('../view/admin/editArticle.vue')
    }, {
        path: 'editPage',
        name: 'editPage',
        component: () => import('../view/admin/editPage.vue')
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router