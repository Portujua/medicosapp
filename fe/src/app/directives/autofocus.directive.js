angular.module('app')
  .directive('autofocus', ($timeout, $parse) => ({
    restrict: 'A',
    // scope: true,
    link($scope, element, attrs, api) {
      let isActive = $parse(attrs.autofocus)($scope);

      if (isActive || _.isUndefined(isActive)) {
        $timeout(() => { element[0].focus(); });
      }
    }
  }));
