;(() => {

class RolesNewController {
  constructor(RoleService, Role, Auth) {
    this.RoleService = RoleService;
    this.Role = Role;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Role({});
    this.loadingPromise = this.getPermissions();
  }

  getPermissions() {
    return this.RoleService.getPermissions()
      .then((response) => {
        let permissions = _.map(response.data.sysEntity, (entity) => {
          // Sort actions
          entity.sysAction = _.sortBy(entity.sysAction, (action) => action.actionName);

          return entity;
        });

        // Sort entities
        this.data.permission = _.sortBy(permissions, (entity) => entity.entityName);
      });
  }

  select(entity = [], value = true) {
    _.each(entity.sysAction, (action) => {
      action.activeForRole = value;
    });
  }

  selectAll(value = true) {
    _.each(this.data.permission, (item) => {
      _.each(item.sysAction, (action) => {
        action.activeForRole = value;
      });
    });
  }

  createItem() {
    this.RoleService.createType(this.data.type)
      .then((response) => {
        // Set the new value to the model
        this.data.type = response.data;
        // Reload the list of types
        this.getPermissions();
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.RoleService.create(this.data.postPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('rolesNew', {
    templateUrl: 'views/roles/roles.new.html',
    controller: RolesNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
