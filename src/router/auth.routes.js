import GymVirtualRoutes from '../pages/GymVirtual/routes'
export default [
    {
        path: '/auth/iniciar-sesion',
        name: 'login',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/LoginPage.vue'),
    },
    {
        path: '/auth/registrarse',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RegisterPage.vue'),
    },
    {
        path: '/auth/olvide-contrasena',
        name: 'forgot-password',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/ForgotPasswordPage.vue'),
    },
    {
        path: '/auth/recuperar-contrasena/:hash',
        name: 'recover',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RecoverPage.vue'),
    },
    
    {
        path: '/gym-virtual',
        component: () => import(/* webpackChunkName: "apps-email" */ '../pages/GymVirtual/GymVirtualPage.vue'),
        children: [
        ...GymVirtualRoutes
        ]
    },
]