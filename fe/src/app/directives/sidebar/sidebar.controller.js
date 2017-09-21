;(() => {

class SidebarController {
  constructor($scope, SidebarService, PageService, TabManagerService) {
    this.SidebarService = $scope.SidebarService = SidebarService;
    $scope.PageService = PageService;
    $scope.TabManagerService = TabManagerService;
  }

  toggle() {
  	this.SidebarService.toggle();
  }

  isOpen() {
  	return this.SidebarService.isOpen;
  }

  showLabels() {
    return this.SidebarService.showLabels;
  }
}

angular.module('app')
  .controller('SidebarController', SidebarController);

})();
