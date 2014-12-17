'use strict';

angular.module('drupalService', ['ngResource'])

  .factory('Node', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/node/:nid', 
      { 'nid': '@nid' },
      {
        get: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/hal+json';
          }
        }
      }
    );
  }])

  .factory('View', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/rest/:entityType/:name/:a/:b/:c', 
      {
        entityType: '@entityType',
        name: '@name',
        a0: '@a0'
      },
      {
        query: {
          method:'GET',
          cache: true,
          isArray: true,
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/hal+json';
          }
        }
      }
    );
  }])

  .factory('TaxonomyTerm', ['$resource', function ($resource) {
      return $resource('/taxonomy/term/:tid', {tid: '@tid'}, {});
  }])

  .factory('User', ['$resource', function ($resource) {
      return $resource('/user/:uid', {uid: '@uid'}, {});
  }])

  .factory('Comment', ['$resource', function ($resource) {
      return $resource('/node/:nid/comments', {nid: '@nid'}, {
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


