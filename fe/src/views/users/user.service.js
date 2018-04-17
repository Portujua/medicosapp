;(() => {
  
  class UserService {
    constructor(RESTful, Message, $uibModal) {
      this.RESTful = RESTful;
      this.Message = Message;
      this.$uibModal = $uibModal;
    }

    list(query) {
      return this.RESTful.get('users/medics', query)
    }

    get(id) {
      return this.RESTful.get(`users/${id}`)
    }

    create(payload) {
      return this.RESTful.post('users', payload)
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace 
          ? this.RESTful.patch(`users/${id}`, payload) 
          : this.RESTful.put('users', payload);
          
      return promise.then((response) => {
        this.Message.update('usuario');
        return response;
      });
    }

    addSuscription(userId, payload) {
      return this.RESTful.post(`users/${userId}/suscriptions`, payload)
    }

    listSuscriptions(userId, query) {
      return !_.isEmpty(userId) ? this.RESTful.get(`users/${userId}/suscriptions`, query) : this.RESTful.get('suscriptions', query);
    }

    assignArea(userId, areaId) {
      return this.RESTful.post(`users/${userId}/areas/${areaId}`)
    }

    unassignArea(userId, areaId) {
      return this.RESTful.delete(`users/${userId}/areas/${areaId}`)
    }

    openCreateModal(type = 'patient') {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'usersNew',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: type === 'patient' ? 'md' : 'compose-md',
        resolve: {
          type: () => type
        }
      });
  
      return modalInstance.result;
    }

    openChangePasswordModal(user) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'usersChangePasswordModal',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'sm',
        resolve: {
          user: () => user
        }
      });
  
      return modalInstance.result;
    }
  };
  
  angular.module('app')
    .service('UserService', UserService);
  
  })();
  