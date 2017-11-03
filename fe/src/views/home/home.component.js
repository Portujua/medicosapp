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
    this.loadingSummaryPromise = this.HomeService.getSummary()
      .then((response) => {
        this.summary = response.data;
      })
  }

  getPercentageRelation(current, past) {
    return Math.abs((current - past) / (past === 0 ? 1 : past) * 100);
  }

  getPercentageRelationClass(current, past) {
    let relation = ((current - past) / (past === 0 ? 1 : past) * 100);
    return relation ===  0 ? 'minus' : (relation > 0 ? 'level-up' : 'level-down');
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
