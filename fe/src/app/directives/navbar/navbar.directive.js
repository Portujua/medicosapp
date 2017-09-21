(() => {

angular.module('app')
  .directive('navbar', () => ({
    templateUrl: 'app/directives/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    replace: true,
    scope: true,
  }));

})();
