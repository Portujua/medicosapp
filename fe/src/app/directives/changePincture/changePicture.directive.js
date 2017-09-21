;(() => {

angular.module('app')
  .directive('changePicture', (PrintAreaService) => ({
    restrict: 'A',
    controller: 'ChangePictureController',
    replace: true,
    link: ($scope, element, attrs, ctrl) => {
      element.bind('click', () => {
        $scope.$apply(() => {
          let payload = ctrl.open(attrs.changePicture, attrs.endpoint);
        });
      });
    },
    scope: {
      pic: '=',
      load: '&',
    }
  }));

})();
