;(() => {

class RoleService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    let params = this.getQueryString(query);

    return this.RESTful.get('roles', params);
  }

  get(id) {
    return this.RESTful.get(`roles/${id}`);
  }

  create(payload) {
    return this.RESTful.post('roles', payload)
      .then((response) => {
        this.Message.create('role');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`roles/${id}`, payload)
      : this.RESTful.put('roles', payload);

    return promise.then((response) => {
        this.Message.update('role');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`roles/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  getPermissions() {
    return this.RESTful.get('permissions');
  }

  getRolePermissions(roleId) {
    return this.RESTful.get(`roles/${roleId}/permissions`);
  }

  getTypes(keyword) {
    return this.RESTful.get('roles/types', { keyword, active: true, simple: true });
  }

  createType(itemValue) {
    return this.RESTful.post('roles/type', { itemValue })
      .then((response) => {
        this.Message.create('role type');
        return response;
      });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'rolesNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'rolesEdit',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        id: () => id,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('RoleService', RoleService);

})();
