;(() => {

angular.module('app')
  .directive('chartDayVsCost', () => ({
    templateUrl: 'app/directives/chartDayVsCost/chartDayVsCost.html',
    restrict: 'E',
    controller: 'ChartDayVsCostController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      jobId: '='
    },
    bindToController: true,
  }));

})();
