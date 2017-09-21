;(() => {

class TabManagerOptionsController {
  constructor(TabManagerService) {
    this.TMS = TabManagerService;
  }
}

angular.module('app')
  .controller('TabManagerOptionsController', TabManagerOptionsController);

})();
