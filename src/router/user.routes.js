export default [
    {
        path: '/cuenta/mi-perfil',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/User/ProfilePage.vue'),
    },
    {
        path: '/cuenta/mis-ordenes',
        component: () => import(/* webpackChunkName: "auth-signup" */ '../pages/User/OrdersPage.vue'),
    }
]