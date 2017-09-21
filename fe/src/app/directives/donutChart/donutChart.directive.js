;(() => {

angular.module('app')
  .directive('donutChart', () => ({
    templateUrl: 'app/directives/donutChart/donutChart.html',
    restrict: 'E',
    controller: 'DonutsChartController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
        config: '<',

    }
  }));

})();
