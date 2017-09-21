;(() => {

angular.module('app')
  .directive('fileChooser', () => ({
    restrict: 'A',
    link: ($scope, element, attrs) => {
      element.bind('change', () => {
        $scope.$apply(() => {
          $scope.fileChooser = element[0].files[0];
          if (_.isFunction($scope.fileChange)) {
            $scope.fileChange({ data: $scope.fileChooser });
          }
        });
      });
    },
    scope: {
      fileChooser: '=',
      fileChange: '&',
    },
  }));

})();
