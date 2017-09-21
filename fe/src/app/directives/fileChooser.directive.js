;(() => {

angular.module('app')
  .directive('fileChooser', () => ({
    restrict: 'A',
    link: ($scope, element, attrs) => {
      element.bind('change', () => {
        $scope.$apply(() => {
          $scope.fileChooser = element[0].files[0];
        });
      });
    },
    scope: {
      fileChooser: '='
    },
  }));

})();
