;(() => {
  
  class ProfileService {
    constructor(RESTful, Message) {
      this.RESTful = RESTful;
      this.Message = Message;
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace 
          ? this.RESTful.patch(`patients/${id}`, payload) 
          : this.RESTful.put('patients', payload);
          
      return promise.then((response) => {
        this.Message.update('pacientes');
        return response;
      });
    }

    getSidebarButton() {
      return {
        title: 'Perfil',
        order: 0,
        icon: 'fa-user',
        tab: {
          component: 'profileView',
          color: 'color-1'
        },
        color: 'color-1',
      };
    }
  };
  
  angular.module('app')
    .service('ProfileService', ProfileService);
  
  })();
  