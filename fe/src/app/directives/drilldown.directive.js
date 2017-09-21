;(() => {

angular.module('app')
  .directive('drilldown', (TabManagerService, $timeout) => ({
    restrict: 'A',
    link: ($scope, element, attrs, api) => {
      $scope.$watch(() => element[0].innerHTML, (newValue, oldValue) => {
        element.toggleClass('drilldown-disabled', newValue.trim() === 'N/A');
      });

      element.on('click', (e) => {
        e.preventDefault();
        $timeout(() => {
          TabManagerService.add($scope.data);
        });
      })
    },
    scope: {
      data: '=drilldown',
    },
  }));

})();
