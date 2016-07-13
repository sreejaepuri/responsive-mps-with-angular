(function() {
  var app = angular.module('gemStore',['product-directive']);

    app.controller('StoreController', function($http, $log){
        var store = this;
        store.products = [];

        $http.get('http://localhost:63342/Shaping-up-with-Angular/store.json')
            .success(function(data){
                $log.info(data);
                store.products = data.store;
            });
    });

    app.controller("ReviewController", function(){
        this.review = {};
        this.review.createdOn = Date.now();

        this.addReview = function(product){
            product.reviews.push(this.review);
            this.review = {};
        };
    });

})();
