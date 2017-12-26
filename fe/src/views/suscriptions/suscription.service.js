;(() => {
  
  class SuscriptionService {
    constructor(RESTful, Message, $uibModal) {
      this.RESTful = RESTful;
      this.Message = Message;
      this.$uibModal = $uibModal;
    }

    list(query) {
      return this.RESTful.get('suscription-types', query);
    }

    create(payload) {
      return this.RESTful.post('suscription-types', payload);
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace 
          ? this.RESTful.patch(`suscription-types/${id}`, payload) 
          : this.RESTful.put('suscription-types', payload);
          
      return promise.then((response) => {
        this.Message.update('suscripcion');
        return response;
      });
    }

    approve(id) {
      return this.RESTful.post(`suscriptions/${id}/approve`)
    }

    decline(id) {
      return this.RESTful.post(`suscriptions/${id}/decline`)
    }

    openCreateModal() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'suscriptionNew',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'compose-md',
        resolve: { }
      });
  
      return modalInstance.result;
    }

    getSidebarButton() {
      return {
        title: 'Suscripciones',
        order: 0,
        icon: 'fa-credit-card',
        tab: {
          component: 'suscriptionBList',
          color: 'color-1',
          icon: 'fa-credit-card',
        },
        color: 'color-1',
      };
    }
  };
  
  angular.module('app')
    .service('SuscriptionService', SuscriptionService);
  
  })();
  