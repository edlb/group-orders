(function() {
  'use strict';

  module.exports = AppController;

  /* @ngInject */
  function AppController($anchorScroll, $filter, $scope, $window, frichti, slack, spreadsheet) {
    var vm = this;

    // Attributes & methods
    vm.preOrder = preOrder;
    vm.products = [];
    vm.productsTypes = [];
    vm.username = '';

    activate();

    // Functions
    function activate() {
      require('angular').element($window).on('scroll', function() {
        vm.scrollPosition = $window.scrollY;
        $scope.$apply();
      });
      vm.productsTypes = frichti.types;
      frichti.menu().subscribe(function(result) {
        vm.products = result;
        $scope.$apply();
      });
      vm.isReady = true;
    }
    function preOrder() {
      if (vm.username === '') {
        $scope.form.username.$setTouched();
        $anchorScroll('body');
      } else {
        var order = {};
        for (var i = 0, productsTypesLength = vm.productsTypes.length; i < productsTypesLength; i++) {
          order[vm.productsTypes[i].value] = [];
        }
        var selectedProducts = $filter('orderBy')($filter('filter')(vm.products, { selected: true }), 'position');
        var selectedProductsLength = selectedProducts.length;
        if (selectedProductsLength === 0) {
          alert('You didn\'t select any product!');
        } else {
          for (var j = 0; j < selectedProductsLength; j++) {
            order[selectedProducts[j].type].push(selectedProducts[j].name);
          }
          var orderStr = '';
          var productsNames = [];
          for (var k = 0; k < productsTypesLength; k++) {
            if (order[vm.productsTypes[k].value].length > 0) {
              orderStr += '- ' + vm.productsTypes[k].label + ': ' + order[vm.productsTypes[k].value].join(', ') + '\n';
              productsNames = productsNames.concat(order[vm.productsTypes[k].value]);
            }
          }
          spreadsheet.send(productsNames);
          slack.send(vm.username, $filter('totalPrice')(selectedProducts), orderStr);
        }
      }
    }
  }
})();
