export default [{
  path: '',
  redirect: 'agenda'
},{
  path: 'agenda',
  name: 'apps-agenda',
  component: () => import(/* webpackChunkName: "apps-email-inbox" */ '@/pages/GymVirtual/pages/AgendaPage.vue'),
  meta: { requiresAuth: true, template: 'SidebarTemplate' }
},{
  path: 'calendario',
  name: 'apps-calendario',
  component: () => import(/* webpackChunkName: "apps-email-inbox" */ '@/pages/GymVirtual/pages/CalendarPage.vue'),
  meta: { requiresAuth: true, template: 'SidebarTemplate' }
},]
