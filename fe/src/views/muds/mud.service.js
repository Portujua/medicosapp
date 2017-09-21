;(() => {

class MudService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, jobId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand(['mudType']);
    let params = this.getQueryString(query);
    return this.RESTful.get(`jobs/${jobId}/mud-checks` , params);
  }

  getMudTypes(keyword) {
    return this.RESTful.get('mud-types', { keyword, active: true, simple: true });
  }

  createMudType(itemValue){
    return this.RESTful.post('mud-types', { itemValue })
      .then((response) => {
        this.Message.create('mud type');
        return response;
      });
  }

  create(payload) {
    return this.RESTful.post( 'mud-checks', payload)
      .then((response) => {
        this.Message.create('mud check');
        return response;
      });
  }

  update(mudCheckId, payload, inPlace = false) {
    let promise = inPlace 
    ? this.RESTful.patch(`mud-checks/${mudCheckId}`, payload) 
    : this.RESTful.put('mud-checks', payload);

    return promise.then((response) => {
        this.Message.update('daily cost');
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

  openCreateModal(jobId, date) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'mudsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        jobId: () => jobId,
        date: () => date,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('MudService', MudService);

})();
