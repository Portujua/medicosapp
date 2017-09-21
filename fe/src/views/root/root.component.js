(() => {

class RootController {
  constructor(Auth, SidebarService, NavbarService, TabManagerService) {
    this.session = Auth.getSession();
    this.SidebarService = SidebarService;
    this.NavbarService = NavbarService;
    this.TabManagerService = TabManagerService;
    // Debug
    // this.session.printPermissions();
  };

  $onInit() {
    // Load tab manager
    this.TabManagerService.init();

    // Home
    this.TabManagerService.add({
      id: 'home',
      title: 'Home',
      component: 'home',
      icon: 'fa-home',
      isPinned: true,
      order: -1,
      isThin: true,
    });

    angular.module('app')['_invokeQueue'].forEach((value) => {
      if (value[1] === 'service') {
        if (_.isFunction(angular.element(document.body).injector().get(value[2][0]).getSidebarButton)) {
          this.SidebarService.add(angular.element(document.body).injector().get(value[2][0]).getSidebarButton());
        }

        if (_.isFunction(angular.element(document.body).injector().get(value[2][0]).getNavbarButton)) {
          this.NavbarService.add(angular.element(document.body).injector().get(value[2][0]).getNavbarButton());
        }
      }
    })
  };

  isSidebarOpen() {
    return this.SidebarService.isOpen;
  }
}

angular.module('app')
  .component('root', {
    templateUrl: 'views/root/root.html',
    controller: RootController,
  });

})();
