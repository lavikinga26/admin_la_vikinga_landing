import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'

// import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import VueCountdownTimer from 'vuejs-countdown-timer';
// FILTERS
import './filters/capitalize'
import './filters/lowercase'
import './filters/uppercase'
import './filters/formatCurrency'
import './filters/formatDate'
import './filters/formatTime'

/**ROUTER */
import router from "./router/router";
/**VUEX */
import store from "./store";
/**STYLE */
require("./assets/styles/styles.scss");

import API from "./api";
import UTILS from "./utils";
import { baseURL } from './api/axios';
import { Form } from 'vform';

window.Form = Form; 

Vue.use(VueCountdownTimer);
Vue.use(VueApexCharts)
// Vue.use(VueFilterDateFormat);

Vue.component('custom-breadcrumbs', require('./components/shared/CustomBreadcrumbs.vue').default);
Vue.component('sponsors-section', require('./components/shared/Sponsors.vue').default);
Vue.component('phones-photos', require('./components/shared/PhonePhotos.vue').default);
Vue.component('frequent-questions', require('./components/shared/FrequentQuestions.vue').default);
Vue.component('whatsapp', require('./components/Whatsapp.vue').default);
Vue.component('apexchart', VueApexCharts);

Vue.prototype.$API = API;
Vue.prototype.$UTILS = UTILS;

Vue.config.productionTip = false;

Vue.filter("truncate", function(value, length) {
    if (!value) return "";
    value = value.toString();
    if (value.length > length) {
        return value.substring(0, length) + "...";
    } else {
        return value;
    }
});

Vue.prototype.$baseAdminURL = 'baseAdminURL';
Vue.prototype.$baseURL = baseURL;


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
