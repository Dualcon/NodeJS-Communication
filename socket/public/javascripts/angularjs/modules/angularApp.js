var app = angular.module('myApp', ['ui.router', 'ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	$stateProvider

	// Main page:
	.state('/', {
		url: '/',
		templateUrl: '/javascripts/angularjs/views/main.html',
		controller: 'NavController',
	});

	$urlRouterProvider.otherwise('/');
}]);
