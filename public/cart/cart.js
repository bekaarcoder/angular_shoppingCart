angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/cart', {
		templateUrl: 'public/cart/cart.html',
		controller: 'CartCtrl'
	});
}])

.controller('CartCtrl', ['$scope', '$http', function($scope, $http){

	$http.get("public/list.json").then(function(response){
		$scope.cartData = response.data;
	});

}])