;(() => {

class RolesListController {
  constructor(RoleService, Role, Auth, NgTableParams, PromptService) {
    this.RoleService = RoleService;
    this.Role = Role;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
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

        return this.loadingPromise = this.RoleService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.RoleService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  update(id) {
    this.RoleService.openUpdateModal(id)
      .then((response)=> {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Role(item);

    return this.RoleService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.RoleService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }
}

angular.module('app')
  .component('rolesList', {
    templateUrl: 'views/roles/roles.list.html',
    controller: RolesListController,
  });

})();
