import Vue from 'vue'
import moment from 'moment-timezone'
import store from '../store'

Vue.filter('formatTime', function(value) {

  if (value) { 
    return moment(String(value)).format('LT')
 }

  return ''
});