'use strict';

angular.module('app.static', [
  'ui.router',
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      // $urlRouterProvider
      //   .when('/');

      $stateProvider
        
        .state("home", {
          url: '/',
          templateUrl: 'views/static/home.html',
          controller: function($scope, $rootScope, $state){
          }
        })


    }
  ]
);
