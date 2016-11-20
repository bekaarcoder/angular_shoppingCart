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
		console.dir($scope.cartData);
	});

	$scope.total = function(){
		var t = 0;
		for(var k in $scope.cartData) {
			t += parseInt($scope.cartData[k].selected);
		}
		return t;
	};

}])

.directive('checkList', function(){
	return {
		restrict: 'E',
		scope: {
			option: '=',
			name: '=',
			selected: '='
		},
		template: function(elem, attrs) {
			return '<div class="panel-body">\
						<div class="radio" ng-repeat="i in option">\
							<label><input type="radio" ng-model="$parent.selected" name="{{name}}" ng-value="{{i.price}}">{{i.size}}, Rs.{{i.price}} {{selected}}-{{selected}}</label>\
						</div>\
					</div>'
		}
	};
})