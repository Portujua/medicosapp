;(() => {

class ContractService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }


  list(query) {
    let params = this.getQueryString(query);

    return this.RESTful.get('contracts', params);
  }

  getCurrencies() {
    return this.RESTful.get('currencies');
  }

  getTermUnits() {
    return this.RESTful.get('contract-term-units');
  }

  getTerms(contractId) {
    return this.RESTful.get(`contracts/${contractId}/terms`);
  }

  get(id) {
    return this.RESTful.get(`contracts/${id}`);
  }

  create(payload) {
    return this.RESTful.post('contracts', payload)
      .then((response) => {
        this.Message.create('contracts');
        return response;
      });
  }

  addTerm(id, payload) {
    return this.RESTful.post(`contracts/${id}/addTerm`, payload)
      .then((response) => {
        this.Message.create('contract term');
        return response;
      });
  }

  deleteTerm(id) {
    return this.RESTful.delete(`contracts/terms/${id}`)
      .then((response) => {
        this.Message.delete('contract term');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
        ? this.RESTful.patch(`contracts/${id}`, payload) 
        : this.RESTful.put('contracts', payload);
        
    return promise.then((response) => {
      this.Message.update('contracts');
      return response;
    });
  }

  updateTerm(id, payload, inPlace = false) {
    return this.RESTful.put(`contracts/terms/${id}`, payload, { inPlace })
      .then((response) => {
        this.Message.update('contract term');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`contracts/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'contractsNew',
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
      component: 'contractsEdit',
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
      id: 'create.contract',
      name: 'New Contract Template',
      type: 'create',
      module: 'contract',
      permission: 'create',
      icon: 'fa-file-text-o',
      callback: () => { this.openCreateModal(); }
    }
  }
};

angular.module('app')
  .service('ContractService', ContractService);

})();
