(function() {
  'use strict';

  module.exports = currencyFilter;

  /* @ngInject */
  function currencyFilter() {
    return function(input) {
      var output;
      if (typeof input === 'number') {
        output = input.toString() === input.toFixed() ? input.toString() : input.toFixed(2);
      } else {
        if (typeof input === 'string') {
          output = input;
        } else {
          output = '0';
        }
      }
      return '€' + output;
    };
  }
})();
