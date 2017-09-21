;(() => {

class RolesEditController {
  constructor(RoleService, Role, Auth) {
    this.RoleService = RoleService;
    this.Role = Role;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Role({});
    this.load();
  }

  load() {
    return this.loadingPromise = this.RoleService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Role(response.data);
        // Role permissions
        return this.getPermissions();
      });
  }

  getPermissions() {
    return this.RoleService.getRolePermissions(this.data.id)
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

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.RoleService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  toggleActivation() {
    this.RoleService.toggleActivation(this.data.id, this.data.isActive)
      .then((response) => {

      }, (response) => {
        this.data.isActive = !this.data.isActive;
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

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('rolesEdit', {
    templateUrl: 'views/roles/roles.edit.html',
    controller: RolesEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
