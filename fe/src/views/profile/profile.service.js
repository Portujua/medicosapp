;(() => {

class ProfileService {
  constructor(RESTful, Message, $uibModal) {
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  get(id) {
    return this.RESTful.get('users/self');
  }

  update(id, payload, inPlace = false) {
    return this.RESTful.put(`users/${id}`, payload, { inPlace })
      .then((response) => {
        this.Message.update('user');
        return response;
      });
  }

  changePassword(payload){
     return this.RESTful.post('users?changePassword', payload)
        .then((response) => {
          this.Message.update('password');
          return response;
      });
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'profileEdit',
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
  .service('ProfileService', ProfileService);

})();
