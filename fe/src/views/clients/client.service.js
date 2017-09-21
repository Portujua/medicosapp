;(() => {

class ClientService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('clients', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('clients', params);
  }

  get(id, expand = this.getExpand('clients', 'view')) {
    return this.RESTful.get(`clients/${id}`, { expand });
  }

  getPhones(id, simple = true) {
    return this.RESTful.get(`clients/${id}/phones`, { simple });
  }

  getEmails(id, simple = true) {
    return this.RESTful.get(`clients/${id}/emails`, { simple });
  }

  create(payload) {
    return this.RESTful.post('clients', payload)
      .then((response) => {
        this.Message.create('client');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
        ? this.RESTful.patch(`clients/${id}`, payload) 
        : this.RESTful.put('clients', payload);
        
    return promise.then((response) => {
      this.Message.update('clients');
      return response;
    });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`clients/${id}`, { isActive: status })
      .then((response) => {
        this.Message.toggle();
        return response;
      });
  }

  add(id, payload, type = '') {
    payload.client = {
      id: id
    }

    return this.RESTful.post(`clients/${type}`, payload)
      .then((response) => {
        this.Message.create(type);
        return response;
      });
  }

  delete(type, fieldID) {
    return this.RESTful.delete(`clients/${type}/${fieldID}`)
      .then((response) => {
        this.Message.delete(type);
        return response;
      });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'clientsNew',
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
      component: 'clientsEdit',
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
      id: 'create.client',
      name: 'New Client',
      type: 'create',
      module: 'client',
      permission: 'create',
      icon: 'fa-users',
      color: 'color-3',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Clients',
      icon: 'fa-users',
      color: 'color-3',
      tab: {
        component: 'clientsList',
      }
    };
  }
};

angular.module('app')
  .service('ClientService', ClientService);

})();
