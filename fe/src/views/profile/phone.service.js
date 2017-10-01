;(() => {
  
  class PhoneService {
    constructor(RESTful, Message) {
      this.RESTful = RESTful;
      this.Message = Message;
    }

    add(userId, payload) {
      return this.RESTful.post(`patients/${userId}/phones`, payload);
    }

    delete(id) {
      return this.RESTful.delete(`phones/${id}`);
    }

    list(id) {
      return this.RESTful.get(`patients/${id}/phones`, { simple: true });
    }

    getTypes() {
      return this.RESTful.get('phone-types', { simple: true });
    }
  };
  
  angular.module('app')
    .service('PhoneService', PhoneService);
  
  })();
  