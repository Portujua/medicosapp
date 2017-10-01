(() => {

class NavbarController {
  constructor($scope, Auth, PageService, SidebarService, NavbarService, $rootScope) {
    $scope.session = Auth.getSession();
    $scope.page = PageService;
    $scope.NavbarService = NavbarService;
    this.SidebarService = SidebarService;
    this.endPoint = 'me/pictures'

    $scope.$watch(() => Auth.getSession().profilePicturePath, () => {
      $scope.session = Auth.getSession();
    }, true);
  }

  toggle() {
    this.SidebarService.toggle();
  }

  isSidebarOpen() {
    return this.SidebarService.isOpen;
  }
}

angular.module('app')
  .controller('NavbarController', NavbarController);

})();
