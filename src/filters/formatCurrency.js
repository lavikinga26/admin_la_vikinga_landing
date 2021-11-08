import Vue from 'vue'

Vue.filter('formatCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  return value.toFixed(2).toLocaleString();
});