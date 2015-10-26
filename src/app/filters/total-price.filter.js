(function() {
  'use strict';

  module.exports = totalPriceFilter;

  /* @ngInject */
  function totalPriceFilter() {
    return function(input) {
      var output = 0;
      if (!(input instanceof Array)) return output;
      for (var i = 0, inputLength = input.length; i < inputLength; i++) {
        if (input[i].price === undefined || isNaN(input[i].price)) {
          continue;
        } else {
          output += Number(input[i].price);
        }
      }
      return output.toString() === output.toFixed() ? output.toString() : output.toFixed(2);
    };
  }
})();
