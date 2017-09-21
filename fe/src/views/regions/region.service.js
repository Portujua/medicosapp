;(() => {

class RegionService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list() {
    return this.RESTful.get('regions', { filter: [this.newFilter('parent.id', 'isNull')], simple: true });
  }

  listAll(keyword) {
    return this.RESTful.get('regions', { keyword, active: true, simple: true });
  }

  get(id) {
    return this.RESTful.get(`regions/${id}`);
  }

  getChilds(id) {
    return this.RESTful.get('regions', { filter: [this.newFilter('parent.id', 'equals', id)], simple: true });
  }

  create(payload) {
    return this.RESTful.post('regions', payload)
      .then((response) => {
        this.Message.create('regions');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    return this.RESTful.put(`regions/${id}`, payload, { inPlace })
      .then((response) => {
        this.Message.update('regions');
        return response;
      });
  }

  add(payload, inPlace = false) {
    return this.RESTful.post('regions', payload, { inPlace })
      .then((response) => {
        this.Message.create('regions');
        return response;
      });
  }

  delete(id) {
    return this.RESTful.delete(`regions/${id}`)
      .then((response) => {
        this.Message.delete('regions');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`regions/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'regionsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-sm',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'regionsEdit',
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
  .service('RegionService', RegionService);

})();
