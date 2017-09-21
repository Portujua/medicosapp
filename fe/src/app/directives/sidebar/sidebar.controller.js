;(() => {

class SidebarController {
  constructor($scope, SidebarService) {
    $scope.SidebarService = SidebarService;
  }
}

angular.module('app')
  .controller('SidebarController', SidebarController);

})();
