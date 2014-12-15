'use strict';

angular.module('app.view', [
  'ui.router'
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      $stateProvider

        // Base route handles getching data, sub-routing 
        .state("view", {
          url: "/view/:name",
          template: '<div class="view view-{{name}}" ui-view></div>',
          data: { 
            title: 'View',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
            skipScroll: false               // Skips scroll animation (embedded ui-views)
          },
          resolve: {
            items: function($stateParams, View) {
              return View.query({name: $stateParams.name}).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $state, items, View){
            $scope.items = items;
            $scope.name = $state.params.name;

            // @todo: Set route metadata (is this possible?)

            // Determine the appropriate sub-route
            $scope.$watch('items', function() {
              var stateName = 'view.' + $scope.name;
              try {
                var state = $state.get(stateName);
                if (state == undefined || state == null) {
                  throw "myException";
                }
              }
              catch(e) {
                stateName = 'view.base';
              }
              $state.go(stateName);
            });

            // Helper function for infinite scroll pager
            $scope.currentPage = 0;
            $scope.loadingPage = false;
            $scope.addItems = function() {
              if (!$scope.loadingPage && $scope.items != undefined && $scope.items.length > 0) {
                $scope.currentPage++;
                var newData = View.query({name: $scope.name, page: $scope.currentPage}, function() {
                  if (newData.length > 0) {
                    Array.prototype.push.apply($scope.items, newData);
                    $scope.loadingPage = false;
                  }
                });
              }
              $scope.loadingPage = true;
            }
          }
        })

        // Generic node template
        .state("view.base", {
          templateUrl: 'views/view.html'
        })

        // Custom template for lists of the article content type
        /*
        .state("view.article", {
          templateUrl: 'views/view/article.html'
        })
        */
        


    }
  ]
);
