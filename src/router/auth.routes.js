export default [
    {
        path: '/auth/iniciar-sesion',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/LoginPage.vue'),
    },
    {
        path: '/auth/registrarse',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RegisterPage.vue'),
    }
]