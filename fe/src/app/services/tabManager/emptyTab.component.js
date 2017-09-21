;(() => {

class EmptyTabController {
  constructor() {

  }

  $onInit() {
    // Code
  }
}

angular.module('app')
  .component('emptyTab', {
    templateUrl: 'app/services/tabManager/emptyTab.html',
    controller: EmptyTabController,
  });

})();
