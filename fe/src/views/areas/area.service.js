;(() => {
  
  class AreaService {
    constructor(RESTful, Message) {
      this.RESTful = RESTful;
      this.Message = Message;
    }

    list(query) {
      return this.RESTful.get('areas', query);
    }

    create(payload) {
      return this.RESTful.post('areas', payload);
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace 
          ? this.RESTful.patch(`areas/${id}`, payload) 
          : this.RESTful.put('areas', payload);
          
      return promise.then((response) => {
        this.Message.update('area');
        return response;
      });
    }

    delete(id) {
      return this.RESTful.delete(`areas/${id}`);
    }
  };
  
  angular.module('app')
    .service('AreaService', AreaService);
  
  })();
  