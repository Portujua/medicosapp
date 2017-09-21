;(() => {

class UsersViewController {
  constructor(UserService, RoleService, User, Auth, TabManagerService) {
    this.UserService = UserService;
    this.RoleService = RoleService;
    this.User = User;
    this.session = Auth.getSession();
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.UserService.get(this.id)
      .then((response) => {
        this.data = new this.User(response.data);
      });
  }

  save(data, field) {
   return this.UserService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  update(id) {
    this.UserService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  

  getRoles() {
    this.RoleService.getActives()
      .then((response) => {
        this.roles = response.data;
      });
  }

  toggleActivation(item) {
    this.UserService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }
}

angular.module('app')
  .component('usersView', {
    templateUrl: 'views/users/users.view.html',
    controller: UsersViewController,
    bindings: {
      id: '@',
      tabId: '@',
    }
  });

})();
