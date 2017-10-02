;(() => {

class HomeController {
  constructor(HomeService, ChartsService) {
    this.HomeService = HomeService;
    this.ChartsService = ChartsService;

    this.chart = this.ChartsService.getAreas()
  }

  $onInit() {
    this.load();
  }

  load() {

  }
}

angular.module('app')
  .component('home', {
    templateUrl: 'views/home/home.html',
    controller: HomeController,
    controllerAs: '$ctrl',
    bindings: {
      tabId: '@'
    }
  });

})();
