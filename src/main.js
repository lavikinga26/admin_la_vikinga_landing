import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
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

import { Form } from 'vform';
window.Form = Form; 

Vue.use(VueCountdownTimer);
// Vue.use(VueFilterDateFormat);

Vue.component('custom-breadcrumbs', require('./components/shared/CustomBreadcrumbs.vue').default);
Vue.component('sponsors-section', require('./components/shared/Sponsors.vue').default);
Vue.component('frequent-questions', require('./components/shared/FrequentQuestions.vue').default);

Vue.prototype.$API = API;
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


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
