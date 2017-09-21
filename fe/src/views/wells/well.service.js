;(() => {

class WellService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('wells', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('wells', params);
  }

  get(id, expand = this.getExpand('wells', 'view')) {
    return this.RESTful.get(`wells/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('wells', payload)
      .then((response) => {
        this.Message.create('wells');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
      ? this.RESTful.patch(`wells/${id}`, payload) 
      : this.RESTful.put('wells', payload);

    return promise.then((response) => {
        this.Message.update('wells');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`wells/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  createProductionType(itemValue) {
    return this.RESTful.post('wells/productiontype', { itemValue })
      .then((response) => {
        this.Message.create('production type');
        return response;
      });
  }

  getProductionTypes(keyword) {
    return this.RESTful.get('wells/production-types', { keyword, active: true, simple: true });
  }

  getBasins() {
    return this.RESTful.get('basins');
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'wellsNew',
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
      component: 'wellsEdit',
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
      id: 'create.wells',
      name: 'New Well',
      type: 'create',
      module: 'wells',
      permission: 'create',
      icon: 'fa-map-marker',
      color: 'color-5',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Wells',
      icon: 'fa-map-marker',
      color: 'color-5',
      tab: {
        component: 'wellsList',
      },
    };
  }
};

angular.module('app')
  .service('WellService', WellService);

})();
