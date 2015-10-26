(function() {
  'use strict';

  module.exports = require('angular').module('app.filters', [])
  .filter('currency', require('./currency.filter'))
  .filter('totalPrice', require('./total-price.filter'))
  .name;
})();
