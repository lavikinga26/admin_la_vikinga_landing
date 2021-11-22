import Vue from 'vue'

Vue.filter('formatCurrency', function (value) {
  if (typeof value !== "number") {
      return Number(value).toFixed(2).toLocaleString();
  }
  return value.toFixed(2).toLocaleString();
});