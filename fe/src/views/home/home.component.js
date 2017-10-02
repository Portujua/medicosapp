;(() => {

class HomeController {
  constructor(HomeService, ChartsService) {
    this.HomeService = HomeService;
    this.ChartsService = ChartsService;

    this.chart = this.ChartsService.getAreas()
    this.chart2 = this.ChartsService.getPie()
    this.chart3 = this.ChartsService.getInverseLines()
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
