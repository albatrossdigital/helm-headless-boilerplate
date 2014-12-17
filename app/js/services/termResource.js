'use strict';

angular.module('app.node')

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
}]);
