'use strict';

angular.module('app.menu', [
])

.directive('menu', function factory($window, $browser) {
  return {
    restrict: 'A',
    templateUrl: 'views/menu.html',
    link: function($scope, $element, $attrs) {

      $scope.menu = [
        {title: 'Home', state: 'home'},
        {title: 'Answers', state: 'vocabulary({vid:4})'},
      ]
    }
  }
});