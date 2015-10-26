(function() {
  'use strict';

  module.exports = require('angular').module('app.services', [])
  .service('frichti', require('./frichti.service'))
  .service('slack', require('./slack.service'))
  .service('spreadsheet', require('./spreadsheet.service'))
  .name;
})();
