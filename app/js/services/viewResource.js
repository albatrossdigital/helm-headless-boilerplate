'use strict';

angular.module('app.view')

.factory('View', ['$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.apiUrl + '/view/:name', 
    { 'name': '@name' },
    {
      query: {
        method:'GET', 
        isArray: true,
        transformRequest: function(data, headersGetter) {
          headersGetter()['Accept'] = 'application/hal+json';
        }
      }
    }
  );
}]);
