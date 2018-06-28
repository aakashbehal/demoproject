'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('myApp', [
  'ngRoute',
  'ngMaterial', 
  'toastr',
  'ngMessages',
  'ui.router'
]);


App.config(['$locationProvider', '$routeProvider','$stateProvider', function($locationProvider, $routeProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/product_list'});
  $stateProvider
         .state('product_list', {
        	url: "/product_list",
        	templateUrl: './view1/view1.html',
    	})
        .state('product_info', {
        	url: "/product_info/:productId",
        	templateUrl: 'view2/view2.html',
    	})
}])
