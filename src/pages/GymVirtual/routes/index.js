export default [
	{
		path: "",
		redirect: "agenda",
	},
	{
		path: "agenda",
		name: "apps-agenda",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/AgendaPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "clases-grabadas",
		name: "clases-grabadas",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/ClasesGrabadasPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "horario",
		name: "horario",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/HorarioPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "retos",
		name: "retos",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/RetosPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "retos-comprar",
		name: "retos-comprar",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/RetosComprarPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "recursos",
		name: "recursos",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/RecursosPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "calendario",
		name: "apps-calendario",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/CalendarPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
	{
		path: "referidos",
		name: "apps-referidos",
		component: () =>
			import(
				/* webpackChunkName: "apps-email-inbox" */ "@/pages/GymVirtual/pages/ReferidosPage.vue"
			),
		meta: { requiresAuth: true, template: "SidebarTemplate" },
	},
];
