;(() => {

class HomeController {
  constructor(HomeService, ChartsService, $filter) {
    this.HomeService = HomeService;
    this.ChartsService = ChartsService;
    this.$filter = $filter;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingSummaryPromise = this.HomeService.getSummary()
      .then((response) => {
        this.summary = response.data;
        let categories = [];
        let series = [];

        // Visits count per day chart
        categories = [];
        series = [];
        _.each(this.summary.visitsCount, (item) => {
          categories.push(this.$filter('date')(item.day, 'dd/MM/yyyy'))
          series.push(item.count)
        })

        this.dailyVisitsChart = this.ChartsService.getAreas()
        this.dailyVisitsChart.xAxis.categories = angular.copy(categories);
        this.dailyVisitsChart.series = [{ name: 'Visitas diarias', data: angular.copy(series), color: '#f7464a' }];
        this.dailyVisitsChart.tooltip = {
          pointFormat: '{point.y:,.0f} visitas'
        }
        this.dailyVisitsChart.yAxis.title.text = 'Visitas'
        this.dailyVisitsChart.title.text = 'Visitas este mes'

        // New users count chart
        categories = [];
        series = [];
        _.each(this.summary.newUsersCount, (item) => {
          categories.push(this.$filter('date')(item.day, 'dd/MM/yyyy'))
          series.push(item.count)
        })

        this.newUsersCountChart = this.ChartsService.getAreas()
        this.newUsersCountChart.xAxis.categories = angular.copy(categories);
        this.newUsersCountChart.series = [{ name: 'Usuarios diarios', data: angular.copy(series), color: '#fdb45c' }];
        this.newUsersCountChart.tooltip = {
          pointFormat: '{point.y:,.0f} usuarios'
        }
        this.newUsersCountChart.yAxis.title.text = 'Usuarios'
        this.newUsersCountChart.title.text = 'Nuevos usuarios este mes'

        // Visits count per day chart
        categories = [];
        series = [];
        _.each(this.summary.consultsCount, (item) => {
          categories.push(this.$filter('date')(item.day, 'dd/MM/yyyy'))
          series.push(item.count)
        })

        this.consultsCountChart = this.ChartsService.getAreas()
        this.consultsCountChart.xAxis.categories = angular.copy(categories);
        this.consultsCountChart.series = [{ name: 'Consultas diarias', data: angular.copy(series), color: '#0091EA' }];
        this.consultsCountChart.tooltip = {
          pointFormat: '{point.y:,.0f} consultas'
        }
        this.consultsCountChart.yAxis.title.text = 'Consultas'
        this.consultsCountChart.title.text = 'Consultas este mes'

        // Visits count per day chart
        categories = [];
        series = [];
        _.each(this.summary.earningsSum, (item) => {
          categories.push(this.$filter('date')(item.day, 'dd/MM/yyyy'))
          series.push(item.count)
        })

        this.earningsChart = this.ChartsService.getAreas()
        this.earningsChart.xAxis.categories = angular.copy(categories);
        this.earningsChart.series = [{ name: 'Ganancias diarias', data: angular.copy(series), color: '#2E7D32' }];
        this.earningsChart.tooltip = {
          pointFormat: 'Bs. {point.y:,.0f}'
        }
        this.earningsChart.yAxis.title.text = 'Bs'
        this.earningsChart.title.text = 'Ganancias este mes'
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
