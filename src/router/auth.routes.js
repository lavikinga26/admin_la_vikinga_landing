import GymVirtualRoutes from '../pages/GymVirtual/routes'
export default [
    {
        path: '/auth/iniciar-sesion',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/LoginPage.vue'),
    },
    {
        path: '/auth/registrarse',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RegisterPage.vue'),
    },
    
    {
        path: '/gym-virtual',
        component: () => import(/* webpackChunkName: "apps-email" */ '../pages/GymVirtual/GymVirtualPage.vue'),
        children: [
        ...GymVirtualRoutes
        ]
    },
]