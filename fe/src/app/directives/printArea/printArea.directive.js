;(() => {

angular.module('app')
  .directive('printArea', (PrintAreaService) => ({
    restrict: 'A',
    controller: 'PrintAreaController',
    replace: true,
    link: ($scope, element, attrs, ctrl) => {
      element.bind('click', () => {
        $scope.$apply(() => {
          if (attrs.printArea.indexOf('[') === 0) {
            $scope.print = $scope.$eval(attrs.printArea);
          } else {
            $scope.print = new Array(attrs.printArea);
          }
          ctrl.print();
        });
      });
    }
  }));

})();
