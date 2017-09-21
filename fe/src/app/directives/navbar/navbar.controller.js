(() => {

class NavbarController {
  constructor($scope, Auth, PageService, ProfileService, PicklistService, SidebarService, NavbarService, HomeService, $rootScope) {
    $scope.session = Auth.getSession();
    $scope.page = PageService;
    $scope.NavbarService = NavbarService;
    this.ProfileService = ProfileService;
    this.PicklistService = PicklistService;
    this.SidebarService = SidebarService;
    this.HomeService = HomeService;
    this.endPoint = 'me/pictures'

    $scope.$watch(() => Auth.getSession().profilePicturePath, () => {
      $scope.session = Auth.getSession();
    }, true);
  }

  toggle() {
    this.SidebarService.toggle();
  }

  openProfileModal() {
  	this.ProfileService.openUpdateModal('self');
  }

  openPicklistModal(){
  	this.PicklistService.openPicklistModal()
      .then((response) => {
      }, () => { });
  }

  openSettings(){
    this.HomeService.openSettings()
      .then((response) => {

      });
  }

  isSidebarOpen() {
    return this.SidebarService.isOpen;
  }
}

angular.module('app')
  .controller('NavbarController', NavbarController);

})();
