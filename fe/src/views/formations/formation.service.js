;(() => {

class FormationService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, wellboreId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('formations', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`wellbores/${wellboreId}/formation-record`, params);
  }

  get(id) {
    return this.RESTful.get(`formations/${id}`);
  }

  getFormations(keyword) {
    return this.RESTful.get('formations', { keyword, simple: true, active: true });
  }

  createFormation(itemValue) {
    return this.RESTful.post('formations', { itemValue })
      .then((response) => {
        this.Message.create('formation name');
        return response;
      });
  }

  create(payload) {
    return this.RESTful.post('formations/records', payload)
      .then((response) => {
        this.Message.create('formation');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    return this.RESTful.put(`formations/${id}`, payload, { inPlace })
      .then((response) => {
        this.Message.update('formation');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`formations/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  add(id, payload, type = '') {
    return this.RESTful.post(`formations/${type}/${id}`, payload)
      .then((response) => {
        this.Message.create(type);
        return response;
      });
  }

  delete(type, fieldID) {
    return this.RESTful.delete(`formations/${type}/${fieldID}`)
      .then((response) => {
        this.Message.delete(type);
        return response;
      });
  }

  openCreateModal(job, wellbore) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'formationsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
        wellbore: () => wellbore,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('FormationService', FormationService);

})();
