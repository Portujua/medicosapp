
(() => {

class RootController {
  constructor(SidebarService, Auth) {
    this.SidebarService = SidebarService;
    //this.session = Auth.getSession();
  };

  $onInit() {
    // Buttons
    /*this.SidebarService
      .add({
        id: 'create.job',
        name: 'Create job',
        icon: 'fa-plus',
        type: 'button',
        order: 0,
        isFixed: true,
        callback: () => {
          this.JobService.openCreateModal()
            .then((response) => {
              console.log(response);
            }, (response) => {
              console.log(response);
            });
        },
      });

    // Options
    /*this.SidebarService
      .add({
        id: 'root.riglist',
        name: 'Rig management',
        icon: 'fa-reply fa-rotate-180',
        route: 'root.riglist',
        order: 1,
        isFixed: true,
      })
      .add({
        id: 'root.userlist',
        name: 'User management',
        icon: 'fa-user',
        // icon: 'fa-address-card-o',
        route: 'root.userlist',
        order: 2,
        isFixed: true,
      });*/


    // .add({
    //   name: 'An option',
    //   icon: 'fa-star',
    //   order: 0,
    //   callback: () => this.open(),
    //   module: 'admin',
    //   permission: 'admin',
    // })
    // .add({
    //   name: 'An option',
    //   icon: 'fa-check',
    //   route: 'root.test',
    //   order: 1,
    //   id: 'something',
    // })
    // .add({
    //   name: 'An option',
    //   icon: 'fa-home',
    //   route: 'root.test',
    //   order: 3,
    //   id: 'something1',
    // })
    // .add({
    //   name: 'An option',
    //   icon: 'fa-plus',
    //   type: 'button',
    //   callback: () => this.remove(),
    //   order: 0,
    //   id: 'my',
    //   promise: this.$timeout(() => {}, 5000),
    //   isDisabled: true,
    //   isFixed: true,
    // })
    // .add({
    //   name: 'An option',
    //   icon: 'fa-warning',
    //   type: 'button',
    //   callback: () => this.open(),
    //   order: -1,
    //   isFixed: true,
    // });

    //this.session.printPermissions();
  };
}

angular.module('app')
  .component('root', {
    templateUrl: 'views/root/root.html',
    controller: RootController,
  });

})();
