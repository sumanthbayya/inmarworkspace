var productApp = angular.module('productApp', [ 'ngRoute', 'smart-table','ui.bootstrap', 'ngSanitize' ]);



productApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/background_gif.html',
		controller : 'homeController'
	})
	.when('/build', {
		templateUrl : 'views/build.html',
		controller : 'buildController'
	})
	.when('/ux', {
		templateUrl : 'views/ux.html',
		controller : 'uxController'
	})
	.when('/ship', {
		templateUrl : 'views/ship.html',
		controller : 'shipController'
	})
	.when('/run', {
		templateUrl : 'views/run.html',
		controller : 'runController'
	});

});

productApp.controller("homeController",[
						"$scope",
						
						function($scope) {
							
							
							
							
							
							
						} ]);




