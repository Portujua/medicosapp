angular.module('app')
  .directive('autofocus', ($timeout) => ({
    restrict: 'A',
    // scope: true,
    link($scope, element, attrs, api) {
      $timeout(() => {
        element[0].focus();
      });
    }
  }));
