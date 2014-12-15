'use strict';

angular.module('app.node')

.factory('Node', ['$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.apiUrl + '/node/:nodeId', 
    { 'nodeId': '@nodeId' },
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
