;(() => {

class UsersListController {
  constructor(UserService, User, Auth, NgTableParams, RoleService) {
    this.UserService = UserService;
    this.User = User;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.RoleService = RoleService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.UserService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
      
            return response.data.content;
          });
      }
    });
  }

  getRoles() {
    this.RoleService.getActives()
      .then((response) => {
        this.roles = response.data;
      });
  }

  createRole() {
    this.RoleService.openCreateModal()
      .then((response) => {

      }, () => { });
  }

  create() {
    this.UserService.openCreateModal()
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.UserService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.User(item);

    return this.UserService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
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
  .component('usersList', {
    templateUrl: 'views/users/users.list.html',
    controller: UsersListController,
  });

})();
