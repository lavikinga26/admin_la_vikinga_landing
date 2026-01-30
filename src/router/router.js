import Vue from 'vue'
import Router from 'vue-router'

import UserRoutes from './user.routes'
import AuthRoutes from './auth.routes'

import store from '../store';



Vue.use(Router)

const isAutheticated = async() =>{
    try{
        //await API.users.authenticated();
        //return true;
        const data = await axios.post(this.$baseURL + 'api/v1/auth/user')
        return true;
    }catch(error){
        return false;
    }
} 

export const routes = [{
    path: '/inicio',
    redirect: '/'
}, {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Buy/BuyPage.vue'),
}, {
    path: '/inscripciones',
    name: 'inscripciones',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Plans/PlansPage.vue'),
}, {
    path: '/inscripciones/:slug',
    name: 'categoria',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Plans/CategoryPage.vue'),
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
    path: '/biblioteca',
    name: 'biblioteca',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Workout/Workout.vue'),
}, {
    path: '/la-vikinga',
    name: 'la-vikinga',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Info/InformationPage.vue'),
},  {
    path: '/contacto',
    name: 'contacto',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Contact/ContactPage.vue'),
}, {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/CartPage.vue'),
},  {
    path: '/confirmar-pago/:hash',
    name: 'payment',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/PaymentPage.vue'),
},  {
    path: '/pago-payme/:hash',
    name: 'payme',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/PaymePage.vue'),
},  {
    path: '/pago-stripe/:hash',
    name: 'stripe',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/StripePage.vue'),
},  {
    path: '/resultado-pago/:hash',
    name: 'payme-result',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/ResultadoPayme.vue'),
},  {
    path: '/orden-completada/:hash',
    name: 'ordencompletada',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Shop/OrdenCompletada.vue'),
},  {
    path: '/terminos-condiciones',
    name: 'terminsconditions',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/TermsConditions/TermsConditionsPage.vue'),
}, {
    path: '/politica-privacidad',
    name: 'politicaprivacidad',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/TermsConditions/PrivatePolicyPage.vue'),
},  {
    path: '/preguntas-frecuentes',
    name: 'preguntasfrecuentes',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/FrequentQuestions/FrequentQuestionsPage.vue'),
}, {
    path: '/experiencia',
    name: 'testimonios',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Testimonial/TestimonialPage.vue'),
}, {
    path: '/blog',
    name: 'blog',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Blog/BlogPage.vue'),
}, {
    path: '/post/:slug',
    name: 'slug',
    component: () => import(/* webpackChunkName: "blank" */ '../pages/Blog/PostPage.vue'),
},
{
    path: '/referidos-registro',
    name: 'apps-referidos-registro',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/Buy/ReferralPage.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos',
    name: 'apps-retos',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/SelectReto.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos/step2',
    name: 'apps-retos-step2',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/StepTwo.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos/step3',
    name: 'apps-retos-step3',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/StepThree.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos/step4',
    name: 'apps-retos-step4',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/StepFour.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos/pago-payme/:hash',
    name: 'apps-pagar-payme',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/PaymentPayme.vue'),
    meta: { template: 'FullTemplate' }
},
{
    path: '/retos/pago-stripe/:hash',
    name: 'apps-pagar-atripe',
    component: () => import(/* webpackChunkName: "apps-email-inbox" */ '../pages/BuyRetos/PaymentStripe.vue'),
    meta: { template: 'FullTemplate' }
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
});


/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
    //return next()
    if(to.matched.some(record => record.meta.requiresAuth)) {
        //console.log(isAutheticated)
        if (store.getters.isLoggedIn) { //(isAutheticated){
          next()
          return
        }
        next('/auth/iniciar-sesion')
    } else {
        next()
    }
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
