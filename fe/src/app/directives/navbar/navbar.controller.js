(() => {

class NavbarController {
  constructor($scope, Auth, PageService) {
    $scope.session = Auth.getSession();
    $scope.page = PageService;
  }
}

angular.module('app')
  .controller('NavbarController', NavbarController);

})();
