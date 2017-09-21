;(() => {

angular.module('app')
  .directive('sidebar', () => ({
    templateUrl: 'app/directives/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => {

    },
    scope: true,
  }));

})();
