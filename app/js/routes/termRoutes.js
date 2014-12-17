'use strict';

angular.module('app.node', [
  'ui.router' 
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
         
        // Base route handles getching data, sub-routing 
        .state("node", {
          url: "/node/:nid",
          template: '<div class="node node-{{type}}" ui-view></div>',
          data: { 
            title: 'Node',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
            skipScroll: false               // Skips scroll animation (embedded ui-views)
          },
          resolve: {
            node: function($stateParams, Node) {
              return Node.get({nid: $stateParams.nid}).$promise.then(function(data) {
                $stateParams.type = data.type[0].target_id;
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, node){
            $scope.node = node;
            $scope.type = node.type[0].target_id;

            // Set route metadata
            // @todo: make this work
            $state.$current.data.title = node.title[0].value;
            //@todo: keywords, description

            // Determine the appropriate sub-route
            $scope.$watch('node', function() {
              $rootScope.goSubRoute('node', $scope.type);
            });            
          }
        })

        // Generic node template
        .state("node.base", {
          templateUrl: 'views/node.html'
        })

        // Custom template for article content type
        
        .state("node.article", {
          templateUrl: 'views/node/article.html',
          controller: function($scope, $rootScope, $state, node){
            $scope.node = node;
            $scope.type = node.type[0].target_id;

            // Set route metadata
            // @todo: make this work
            $state.$current.data.title = node.title[0].value;
            //@todo: keywords, description

            // Determine the appropriate sub-route
            $scope.$watch('node', function() {
              $rootScope.goSubRoute('node', $scope.type);
            });            
          }
        })
        


    }
  ]
)


