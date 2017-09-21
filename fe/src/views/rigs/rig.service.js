;(() => {

class RigService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    if (!_.isUndefined(query)) {
      query.expand = _.isString(query.expand) ? query.expand : this.getExpand('rigs', 'list');
    }
    else {
      query = { expand: this.getExpand('rigs', 'list') }
    }

    let params = _.isUndefined(query) ? { } : this.getQueryString(query);

    return this.RESTful.get('rigs', params);
  }

  get(id, expand = this.getExpand('rigs', 'view')) {
    return this.RESTful.get(`rigs/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('rigs', payload)
      .then((response) => {
        this.Message.create('rig');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
        ? this.RESTful.patch(`rigs/${id}`, payload) 
        : this.RESTful.put('rigs', payload);
        
    return promise.then((response) => {
      this.Message.update('rig');
      return response;
    });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`rigs/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  getTypes(keyword) {
    return this.RESTful.get('rigs/types', { keyword, active: true, simple: true });
  }

  createType(itemValue) {
    return this.RESTful.post('rigs/types', { itemValue })
      .then((response) => {
        this.Message.create('rig type');
        return response;
      });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'rigsNew',
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
      component: 'rigsEdit',
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
      id: 'create.rig',
      name: 'New Rig',
      type: 'create',
      module: 'rig',
      permission: 'create',
      icon: 'fa-angle-double-down',
      color: 'color-2',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Rigs',
      icon: 'fa-angle-double-down',
      color: 'color-2',
      tab: {
        component: 'rigsList',
      }
    };
  }
};

angular.module('app')
  .service('RigService', RigService);

})();
