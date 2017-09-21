;(() => {

angular.module('app')
  .directive('tabManagerOptions', () => ({
    templateUrl: 'app/services/tabManager/tabManagerOptions.html',
    restrict: 'E',
    controller: 'TabManagerOptionsController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => { },
    scope: true,
  }));

})();
