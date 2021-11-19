import Vue from 'vue'
import Router from 'vue-router'

import UserRoutes from './user.routes'
import AuthRoutes from './auth.routes'


Vue.use(Router)

const isAutheticated = async() =>{
    try{
        //await API.users.authenticated();
        return true;
    }catch(error){
        return false;
    }
} 

export const routes = [{
    path: '/',
    redirect: '/inicio'
}, {
    path: '/inicio',
    name: 'home',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Home/HomePage.vue'),
}, {
    path: '/inscripciones',
    name: 'inscripciones',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Plans/PlansPage.vue'),
}, {
    path: '/plan/:slug',
    name: 'plan',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Plans/PlanPage.vue'),
}, {
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Staff/StaffPage.vue'),
}, {
    path: '/calendario',
    name: 'calendario',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Calendar/CalendarPage.vue'),
}, {
    path: '/entrenamiento',
    name: 'entrenamiento',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Workout/Workout.vue'),
}, {
    path: '/contacto',
    name: 'contacto',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Contact/ContactPage.vue'),
}, {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/CartPage.vue'),
}, 

...UserRoutes,
...AuthRoutes,

{
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '../components/NotFound.vue'),
    meta: {
        layout: 'error'
    }
}]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL || '/',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes
})


/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
    return next()
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
