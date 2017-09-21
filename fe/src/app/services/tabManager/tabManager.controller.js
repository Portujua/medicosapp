;(() => {

class TabManagerController {
  constructor($scope, $rootScope, TabManagerService) {
    $scope.TabManagerService = TabManagerService;

    $scope.select = () => {
      $rootScope.$broadcast('resizeAllMaps');
    }
  }
}

angular.module('app')
  .controller('TabManagerController', TabManagerController);

})();
