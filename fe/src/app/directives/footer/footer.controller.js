(() => {

class FooterController {
  constructor(SidebarService) {
    this.SidebarService = SidebarService;
  }

  isSidebarOpen() {
    return this.SidebarService.isOpen;
  }
}

angular.module('app')
  .controller('FooterController', FooterController);

})();
