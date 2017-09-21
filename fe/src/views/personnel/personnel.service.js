;(() => {

class PersonnelService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('personnel', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('personnel', params);
  }

  get(id, expand = this.getExpand('personnel', 'view')) {
    return this.RESTful.get(`personnel/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('personnel', payload)
      .then((response) => {
        this.Message.create('personnel');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
        ? this.RESTful.patch(`personnel/${id}`, payload) 
        : this.RESTful.put('personnel', payload);
        
    return promise.then((response) => {
      this.Message.update('personnel');
      return response;
    });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`personnel/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  getPositions(keyword) {
    return this.RESTful.get('personnel/positions', { keyword, active: true, simple: true });
  }

  createPosition(itemValue) {
    return this.RESTful.post('personnel/positions', { itemValue })
      .then((response) => {
        this.Message.create('position');
        return response;
      });
  }

  getContractTypes(keyword) {
    return this.RESTful.get('employment-contract-types', { keyword, active: true, simple: true });
  }

  createContractType(itemValue) {
    return this.RESTful.post('employment-contract-types', { itemValue })
      .then((response) => {
        this.Message.create('contract type');
        return response;
      });
  }

  getUsers(keyword, currentPersonnel) {
    return this.RESTful.get('personnel/users', { keyword, currentPersonnel, active: true, simple: true });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'personnelNew',
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
      component: 'personnelEdit',
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
      id: 'create.personnel',
      name: 'New Personnel',
      type: 'create',
      module: 'personnel',
      permission: 'create',
      icon: 'fa-address-card-o',
      color: 'color-4',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Personnel',
      icon: 'fa-address-card-o',
      color: 'color-4',
      tab: {
        id: 'root.personnellist',
        component: 'personnelList',
      }
    };
  }
};

angular.module('app')
  .service('PersonnelService', PersonnelService);

})();
