;(() => {
  
  class LocationService {
    constructor(RESTful) {
      this.RESTful = RESTful;
    }

    list(query = { simple: true }) {          
      return this.RESTful.get('locations', query);
    }
  };
  
  angular.module('app')
    .service('LocationService', LocationService);
  
  })();
  