import Vue from 'vue'
import moment from 'moment-timezone'
import store from '../store'

moment.locale('es');

Vue.filter('formatDate', function(value) {
  if (value) {
     return moment(String(value)).tz("America/Lima").format('ll')
  }
  return ''
});