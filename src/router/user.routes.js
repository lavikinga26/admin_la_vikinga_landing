export default [
	{
		path: "/cuenta/mi-perfil",
		component: () =>
			import(
				/* webpackChunkName: "auth-signup" */ "../pages/User/ProfilePage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "/cuenta/mis-ordenes",
		component: () =>
			import(
				/* webpackChunkName: "auth-signup" */ "../pages/User/OrdersPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "/cuenta/descargables",
		component: () =>
			import(
				/* webpackChunkName: "auth-signup" */ "../pages/User/DownloadsPage.vue"
			),
		meta: { requiresAuth: true },
	},
	{
		path: "/cuenta/mi-biblioteca",
		component: () =>
			import(
				/* webpackChunkName: "auth-signup" */ "../pages/User/LibraryPage.vue"
			),
		meta: { requiresAuth: true },
	},
	{
		path: "/cuenta/cancelar-membresia/:id_order/:id_plan/:id_suscripcion",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "../pages/User/CancelMembership.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "/cuenta/extender-prueba",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "../pages/User/ExtenderTrial.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "/cuenta/elegir-plan",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "../pages/User/ChoosePlan.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
];
