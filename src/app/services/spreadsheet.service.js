(function() {
  'use strict';

  module.exports = spreadsheetService;

  /* @ngInject */
  function spreadsheetService($http, GOOGLE_SCRIPT_URL) {
    // Values

    // Service
    var spreadsheet = {
      send: send
    };
    return spreadsheet;

    // Functions
    function send(productsNames) {
      $http.get(GOOGLE_SCRIPT_URL + '?products=' + JSON.stringify(productsNames));
    }
  }
})();
