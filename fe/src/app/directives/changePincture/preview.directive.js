;(() => {

angular.module('app')
  .directive('preview', (PrintAreaService) => ({
    restrict: 'A',
   // controller: 'ChangePictureController',
    replace: true,
    link: ($scope, element, attrs, ctrl) => {
      element.bind('change', (event) => {
        $scope.preview = event.target.files[0];

        let reader = new FileReader();

        reader.onload = (loadevt) =>{
          $scope.$apply(() => {
            $scope.image = loadevt.target.result;
          });
        }

        reader.readAsDataURL($scope.preview);
      });
    },
    scope: {
      preview: '=',
      image: '='
    },
  }));

})();
