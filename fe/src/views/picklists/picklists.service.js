;(() => {

class PicklistService extends BaseService {
  constructor($uibModal, RESTful, Message) {
    super();
    this.RESTful = RESTful;
    this.$uibModal = $uibModal;
    this.Message = Message;
  }

  list(query, endpoint) {
    let params = this.getQueryString(query);

    return this.RESTful.get(endpoint, params);
  }

  create(endpoint, itemValue) {
    return this.RESTful.post(endpoint, { itemValue })
      .then((response) => {
        this.Message.create(response.data.itemValue);
        return response;
      });
  }

  update(endpoint, payload, inPlace = false) {
    let promise = inPlace 
    ? this.RESTful.patch(endpoint, payload) 
    : this.RESTful.put(endpoint, payload);

    return promise.then((response) => {
        this.Message.update('Picklist');
        return response;
      });
   }

  openPicklistModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'picklists',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: { }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('PicklistService', PicklistService);

})();


