'use strict';

angular.module('app.vocabulary', [
  'ui.router' 
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
         
        // Base route handles getching data, sub-routing 
        .state("vocabulary", {
          url: "/vocabulary/:vid",
          template: '<div class="vocabulary vocabulary-{{type}}" ui-view></div>',
          data: { 
            title: 'Vocabulary',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
          },
          resolve: {
            tree: function($stateParams, TaxonomyVocabularyTree) {
              return TaxonomyVocabularyTree.query({vid: $stateParams.vid}).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, tree){
            $scope.tree = tree;
            console.log(tree);

            //$scope.type = node.type[0].target_id;

            // Set route metadata
            // @todo: make this work
            //$state.$current.data.title = node.title[0].value;
            //@todo: keywords, description

            // Determine the appropriate sub-route
            $scope.$watch('tree', function() {
              $rootScope.goSubRoute('vocabulary', $scope.type);
            });            
          }
        })

        // Generic node template
        .state("vocabulary.base", {
          templateUrl: 'views/vocabulary/vocabulary-base.html'
        })

    }
  ]
)


