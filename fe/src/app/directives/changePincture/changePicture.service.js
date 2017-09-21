;(() => {

class ChangePictureService {
  constructor($uibModal, RESTful, Message) {
    this.RESTful = RESTful;
    this.$uibModal = $uibModal;
    this.Message = Message;
  }

  list(endpoint, query) {

  }


  create(endpoint, itemValue) {

  }

  update(endpoint, payload){
    return this.RESTful.put(endpoint, payload)
      .then((response) => {
        this.Message.update('picture');
        return response;
      });

  }
  open(urlPicture, endpoint) {

    let modalInstance = this.$uibModal.open ({
      arialLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'chagePictureModal',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        urlPicture:  () => urlPicture,
        endpoint: () => endpoint,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('ChangePictureService', ChangePictureService);

})();


