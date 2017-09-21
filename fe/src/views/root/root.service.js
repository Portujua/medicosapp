;(() => {

class RootService {
  constructor() {

  }

  // methods
  greeting(name = 'world') {
    return `Hello ${name}!`;
  }
};

angular.module('app')
  .service('RootService', RootService);

})();
