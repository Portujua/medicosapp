;(() => {

angular.module('app')
  .directive('soldSuscriptions', () => ({
    templateUrl: 'app/directives/soldSuscriptions/soldSuscriptions.html',
    restrict: 'E',
    controller: 'SoldSuscriptionsController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      data: '='
    },
    bindToController: true,
  }));

})();
