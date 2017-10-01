;(() => {
  
  class UserService {
    constructor(RESTful, Message) {
      this.RESTful = RESTful;
      this.Message = Message;
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
  };
  
  angular.module('app')
    .service('UserService', UserService);
  
  })();
  