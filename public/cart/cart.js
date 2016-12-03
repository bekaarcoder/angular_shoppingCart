angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/cart', {
		templateUrl: 'public/cart/cart.html',
		controller: 'CartCtrl'
	});
}])

.controller('CartCtrl', ['$scope', '$http', 'CommonProp', function($scope, $http, CommonProp){

	if(CommonProp.getItems() != ''){
		$scope.cartData = CommonProp.getItems();
		console.dir($scope.cartData);
	} else {
		$http.get("public/list.json").then(function(response){
			$scope.cartData = response.data;
		});
	}

	$scope.total = function(){
		var t = 0;
		for(var k in $scope.cartData) {
			t += parseInt($scope.cartData[k].selected);
		}
		CommonProp.setTotal(t);
		return CommonProp.getTotal();
		// return t;
	};

	$scope.$watch('cartData', function(){
		CommonProp.setItems($scope.cartData);
	});

}])

.directive('checkList', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {
			option: '=',
			name: '=',
			selected: '='
		},
		template: function(elem, attrs) {
			return '<div class="panel-body">\
						<div class="radio" ng-repeat="i in option">\
							<label><input type="radio" ng-model="$parent.selected" name="{{name}}" ng-value="{{i.price}}">{{i.size}}, Rs.{{i.price}}</label>\
						</div>\
					</div>'
		}
	};
})

.directive('getScroll', function($window){
	var $scrollwindow = angular.element($window);
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var topClass = attrs.getScroll,
				offsetTop = element.prop('offsetTop');

			$scrollwindow.on('scroll', function(e){
				if($scrollwindow.pageYOffset >= offsetTop) {
					element.addClass(topClass);
				} else {
					element.removeClass(topClass);
				}
			});
		}
	};
})

.service('CommonProp', function(){
	var items = '';
	var total = 0;

	return {
		getItems: function(){
			if(items == ""){
				items = JSON.parse(sessionStorage.selectedItems);
			}
			return items;
		},
		setItems: function(value){
			sessionStorage.selectedItems = JSON.stringify(value);
			items = value;
		},
		getTotal: function(){
			if(total == 0) {
				total = sessionStorage.totalValue;
			}
			return total;
		},
		setTotal: function(value){
			sessionStorage.totalValue = value;
			total = value;
		}
	}
})