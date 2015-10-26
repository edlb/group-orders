(function() {
  'use strict';

  module.exports = frichtiService;

  /* @ngInject */
  function frichtiService($http, rx) {
    // Values
    var types = [{
      label: 'Entree',
      value: 'Entrée'
    }, {
      label: 'Main course',
      value: 'Plat'
    }, {
      label: 'Dessert',
      value: 'Dessert'
    }, {
      label: 'Have a break',
      value: 'Have a break'
    }, {
      label: 'Aperitif',
      value: 'Apéro'
    }];

    // Service
    var frichti = {
      menu: menu,
      types: types
    };
    return frichti;

    // Functions
    function menu() {
      return rx.Observable
      .fromPromise($http.get('http://frichti.co/collections/menu-cuisine-nord/products.json'))
      .map(function(result) {
        var products = [];
        for (var i = 0, productsLength = result.data.products.length; i < productsLength; i++) {
          products.push({
            available: result.data.products[i].variants[0].available,
            id: result.data.products[i].id,
            name: result.data.products[i].title,
            picture: result.data.products[i].images[0].src,
            position: result.data.products[i].options[0].position,
            price: result.data.products[i].variants[0].price,
            type: result.data.products[i].product_type
          });
        }
        return products;
      });
    }
  }
})();
