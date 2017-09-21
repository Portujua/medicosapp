;(() => {

angular.module('app')
  .directive('chartDayVsDepth', () => ({
    templateUrl: 'app/directives/chartDayVsDepth/chartDayVsDepth.html',
    restrict: 'E',
    controller: 'ChartDayVsDepthController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      jobId: '='
    },
    bindToController: true,
  }));

})();
