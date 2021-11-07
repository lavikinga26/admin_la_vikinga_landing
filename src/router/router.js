import Vue from 'vue'
import Router from 'vue-router'

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
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Staff/StaffPage.vue'),
}, {
    path: '/entrenamiento',
    name: 'entrenamiento',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Workout/Workout.vue'),
}, {
    path: '/contactanos',
    name: 'contactanos',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Contact/ContactPage.vue'),
}, {
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
