;(() => {

class ClientContractService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, id) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('clientContracts', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`clients/${id}/contracts`, params);
  }

  getClients() {
    return this.RESTful.get('clients');
  }

  getContracts(keyword) {
    return this.RESTful.get('contracts', { keyword, simple: true, activate: true });
  }

  getTermUnits() {
    return this.RESTful.get('contract-term-units');
  }

  getTerms(query, clientContractId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`clients/contracts/${clientContractId}/terms`, params);
  }


  get(clientContractId) {
    return this.RESTful.get(`clients/contracts/${clientContractId}`);
  }

  create(payload) {
    return this.RESTful.post('clients/contracts', payload)
      .then((response) => {
        this.Message.create('client contract');
        return response;
      });
  }

  addTerm(id, payload) {
    return this.RESTful.post(`clientcontracts/${id}/addTerm`, payload)
      .then((response) => {
        this.Message.create('client contract term');
        return response;
      });
  }

  deleteTerm(id) {
    return this.RESTful.delete(`clientcontracts/term/${id}`)
      .then((response) => {
        this.Message.delete('client contract term');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
        ? this.RESTful.patch(`clients/contracts/${id}`, payload) 
        : this.RESTful.put('clients/contracts', payload);
        
    return promise.then((response) => {
      this.Message.update('contracts');
      return response;
    });
  }

  updateTerm(id, payload, inPlace = false) {
    return this.RESTful.put(`clientcontracts/terms/${id}`, payload, { inPlace })
      .then((response) => {
        this.Message.update('client contract term');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`clients/contracts/${id}`, { isActive: status })
      .then((response) => {
        this.Message.toggle();
        return response;
      });
  }

  openCreateModal(client) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'clientContractsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        client: () => client,
      }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'clientContractsEdit',
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
  .service('ClientContractService', ClientContractService);

})();
