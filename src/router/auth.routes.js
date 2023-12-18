import GymVirtualRoutes from '../pages/GymVirtual/routes'
export default [
    {
        path: '/auth/iniciar-sesion',
        name: 'login',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/LoginPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/auth/registrarse',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RegisterPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/auth/olvide-contrasena',
        name: 'forgot-password',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/ForgotPasswordPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/auth/recuperar-contrasena/:hash',
        name: 'recover',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Auth/RecoverPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/proceso_compra',
        name: 'proceso_compra',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Buy/BuyPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/proceso_compra/step2',
        name: 'step2',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Buy/StepTwoPage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/proceso_compra/step3',
        name: 'step3',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/Buy/StepThreePage.vue'),
        meta : { template : 'FullTemplate' }
    },
    {
        path: '/gym-virtual',
        component: () => import(/* webpackChunkName: "apps-email" */ '../pages/GymVirtual/GymVirtualPage.vue'),
        children: [
        ...GymVirtualRoutes
        ]
    },
]