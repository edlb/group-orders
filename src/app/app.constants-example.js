(function() {
  'use strict';

  module.exports = require('angular').module('app.constants', [])
  .constant(
    'GOOGLE_SCRIPT_URL',
    'https://script.google.com/macros/s/your-script-key/exec'
  )
  .constant(
    'SLACK_WEBHOOK_URL',
    'https://hooks.slack.com/services/your-first-key/your-second-key/your-third-key'
  )
  .name;
})();
