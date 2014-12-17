'use strict';

angular.module('app.menu', [
])

.directive('menu', function factory($window, $browser) {
  return {
    restrict: 'E',
    templateUrl: 'views/menu.html',
    link: function($scope, $element, $attrs) {

      $scope.menu = [
        {title: 'Projects', state: 'projects'},
        {title: 'About', state: 'about'},
        {title: 'Notes', state: 'notes'},
        {title: 'Contact', state: 'contact'}
      ]
    }
  }
});