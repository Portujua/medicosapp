;(() => {

class DrillingParametersService  extends BaseService  {
  constructor(Message, $uibModal, Activity, RESTful) {
    super();
    this.Message = Message;
    this.$uibModal = $uibModal;
    this.Activity = Activity;
    this.RESTful = RESTful;
  }

  create(payload) {
    return this.RESTful.post('drillingparameters', payload)
      .then((response) => {
        this.Message.create('drilling parameters');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`drillingparameters/${id}`, payload)
      : this.RESTful.put('drillingparameters', payload);

    return promise.then((response) => {
       this.Message.update('drilling parameters');
       return response;
     });
   }

  openModal(activity) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'drillingParametersNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        activity: () => activity,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('DrillingParametersService', DrillingParametersService);

})();
