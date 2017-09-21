;(() => {

class BhaService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, jobId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`jobs/${jobId}/bhas`, params);
  }

  get(id) {
    return this.RESTful.get(`bhas/${id}`);
  }

  create(payload) {
    return this.RESTful.post('bhas', payload)
      .then((response) => {
        this.Message.create('BHA');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`bhas/${id}`, payload)
      : this.RESTful.put('bhas', payload);

    return promise.then((response) => {
        this.Message.update('BHA');
        return response;
      });
  }

  listComponents(query, bhaId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`bhas/${bhaId}/components`, params);
  }

  addComponent(payload) {
    return this.RESTful.post('bhas/components', payload)
      .then((response) => {
        this.Message.create('BHA component');
        return response;
      });
  }

  openCreateModal(job) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'bhasNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
      }
    });

    return modalInstance.result;
  }

  openCreateBhaComponentModal(job, bha) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'bhaComponentsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        job: () => job,
        bha: () => bha,
      }
    });

    return modalInstance.result;
  }

  getTypes(keyword) {
    return this.RESTful.get('bhas/types', { keyword, active: true, simple: true });
  }

  createType(itemValue) {
    return this.RESTful.post('bhas/types', { itemValue })
      .then((response) => {
        this.Message.create('BHA type');
        return response;
      });
  }

  getObjectives(keyword) {
    return this.RESTful.get('bhas/objectives', { keyword, active: true, simple: true });
  }

  createObjective(itemValue) {
    return this.RESTful.post('bhas/objectives', { itemValue })
      .then((response) => {
        this.Message.create('BHA objective');
        return response;
      });
  }

  getReasonsToPull(keyword) {
    return this.RESTful.get('bhas/reasons-to-pull', { keyword, active: true, simple: true });
  }

  createReasonToPull(itemValue) {
    return this.RESTful.post('bhas/reasons-to-pull', { itemValue })
      .then((response) => {
        this.Message.create('reason to pull');
        return response;
      });
  }
};

angular.module('app')
  .service('BhaService', BhaService);

})();
