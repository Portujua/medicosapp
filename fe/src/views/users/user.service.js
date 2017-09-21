;(() => {

class UserService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
   query.expand = _.isString(query.expand) ? query.expand : this.getExpand(['role']);
    let params = this.getQueryString(query);

    return this.RESTful.get('users', params);
  }

  getUsers(keyword) {
    let query = { keyword, active: true, simple: true };
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('users', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('users', params);
  }

  get(id, expand = this.getExpand('users', 'view')) {
    return this.RESTful.get(`users/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('users', payload)
      .then((response) => {
        this.Message.create('users');
        return response;
      });
  }

  changePassword(payload, userId) {
    return this.RESTful.post(`users/${userId}/password`, payload)
      .then((response) => {
        this.Message.update('password');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
      ? this.RESTful.patch(`users/${id}`, payload) 
      : this.RESTful.put('users', payload);

    return promise.then((response) => {
        this.Message.update('users');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`users/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  mySelf(){
    return this.RESTful.get('users/self');
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'usersNew',
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
      component: 'usersEdit',
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

  getNavbarButton() {
    return {
      id: 'create.user',
      name: 'New User',
      type: 'create',
      module: 'users',
      permission: 'create',
      icon: 'fa-user',
      callback: () => { this.openCreateModal(); }
    }
  }
};

angular.module('app')
  .service('UserService', UserService);

})();
