(() => {

class NavbarController {
  constructor($scope, Auth, PageService, SidebarService, NavbarService, $rootScope, TabManagerService) {
    $scope.session = Auth.getSession();
    $scope.page = PageService;
    $scope.NavbarService = NavbarService;
    this.SidebarService = SidebarService;
    this.TabManagerService = TabManagerService;
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

  openProfile() {
    this.TabManagerService.add({ title: 'Perfil', component: 'profileView', color: 'color-4' })
  }
}

angular.module('app')
  .controller('NavbarController', NavbarController);

})();
