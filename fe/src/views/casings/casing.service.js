;(() => {

class CasingService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, wellboreId) {
   query.expand = _.isString(query.expand) ? query.expand : this.getExpand('casings', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`wellbores/${wellboreId}/casings`, params);
  }

  get(id) {
    return this.RESTful.get(`casings/${id}`);
  }

  getByRegion(regionId) {
    return this.RESTful.get(`basin/region/${regionId}`);
  }

  create(payload) {
    return this.RESTful.post('casings', payload)
      .then((response) => {
        this.Message.create('casing');
        return response;
      });
  }

  update(casingId, payload, inPlace = false) {
    let promise = inPlace
    ? this.RESTful.patch(`casings/${casingId}`, payload) 
    : this.RESTful.put('casings', payload);

    return promise.then((response) => {
        this.Message.update('casing');
        return response;
      });
  }

  openCreateModal(job, wellbore) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'casingsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
        wellbore: () => wellbore
      }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'basinsEdit',
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
  .service('CasingService', CasingService);

})();
