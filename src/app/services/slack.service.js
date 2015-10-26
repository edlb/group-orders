(function() {
  'use strict';

  module.exports = slackService;

  /* @ngInject */
  function slackService($filter, $http, SLACK_WEBHOOK_URL) {
    // Values

    // Service
    var slack = {
      send: send
    };
    return slack;

    // Functions
    function send(username, orderPrice, orderStr) {
      $http({
        method: 'post',
        url: SLACK_WEBHOOK_URL,
        headers: {
          'Content-Type': undefined
        },
        data: {
          attachments: [{
            fallback: '<' + username + '> pre-ordered',
            pretext: '<' + username + '> pre-ordered',
            color: 'good',
            fields: [{
              title: $filter('currency')(orderPrice),
              value: orderStr,
              short: false
            }]
          }]
        }
      });
    }
  }
})();
