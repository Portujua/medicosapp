;(() => {
  
  class MedicService {
    constructor(RESTful) {
      this.RESTful = RESTful;
    }
  };
  
  angular.module('app')
    .service('MedicService', MedicService);
  
  })();
  