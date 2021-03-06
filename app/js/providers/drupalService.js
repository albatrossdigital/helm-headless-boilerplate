'use strict';

angular.module('drupalService', ['ngResource'])

  .factory('Node', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/node/:nid', 
      { 'nid': '@nid' },
      {
        get: {
          method:'GET',
          cache: true
        }
      }
    );
  }])

  .factory('View', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/rest/:entity/:bundle/:a/:b/:c', 
      {
        entityType: '@entity',
        name: '@bundle',
        a: '@arg0'
      },
      {
        query: {
          method:'GET',
          cache: true,
          isArray: true
        }
      }
    );
  }])

  .factory('TaxonomyTerm', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/taxonomy/term/:tid', {tid: '@tid'}, {});
  }])

  .factory('TaxonomyVocabularyTree', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/taxonomy_vocabulary/getTree', 
      {
        vid: '@vid',
      },
      {
        query: {
          method:'POST',
          cache: true,
          isArray: true
        }
      }
    )
  }])

  .factory('User', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/user/:uid', {uid: '@uid'}, {});
  }])

  .factory('Comment', ['$resource', '$rootScope', function ($resource, $rootScope) {
      return $resource($rootScope.apiUrl + '/node/:nid/comments', {nid: '@nid'}, {
          'post': {
              method: 'POST',
              url: '/entity/comment'
          }
      });
  }])



  // Helper functions for views
  .factory('viewsFactory', ['View', function(View) {
    var service = {};

    // For infinite scroll pager
    service.pageLoad = function($scope, params) {
      if (!$scope.loadingPage && $scope.items != undefined && $scope.items.length > 0) {
        $scope.currentPage++;
        var newData = View.query(params, function() {
          if (newData.length > 0) {
            Array.prototype.push.apply($scope.items, newData);
            $scope.loadingPage = false;
          }
        });
      }
      $scope.loadingPage = true;
    }

    return service;
  }])
  

  .directive('openReveal', function factory() {
    return {
      restrict: 'A',
      scope: {
        'openReveal': '@'
      },
      link: function($scope, $element, $attrs) {
        // listen for a click
        $element.on('click', function() {
          jQuery('#' + $scope.openReveal).foundation('reveal', 'open');
        });
      }
    }
  });


