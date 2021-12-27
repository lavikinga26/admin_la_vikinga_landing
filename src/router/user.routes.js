export default [
    {
        path: '/cuenta/mi-perfil',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/User/ProfilePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/cuenta/mis-ordenes',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/User/OrdersPage.vue'),
        meta: { requiresAuth: true }
    }
]