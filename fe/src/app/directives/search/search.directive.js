;(() => {

angular.module('app')
  .directive('search', () => ({
    templateUrl: 'app/directives/search/search.html',
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      change: '&',
      delay: '=',
      placeholder: '@',
      callback: '&',
      allowEmptySearch: '='
    },
  }));

})();
