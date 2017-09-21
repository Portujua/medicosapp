;(() => {

angular.module('app')
  .directive('tabManager', ($compile) => ({
    templateUrl: 'app/services/tabManager/tabManager.html',
    restrict: 'E',
    controller: 'TabManagerController',
    link: ($scope, element, attrs, api) => { },
    scope: true,
  }));

})();
