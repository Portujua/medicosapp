;(() => {

class ROPController {
  constructor(ReportService, ChartsService, $filter, TimeUtil, DateUtil, RigService, FormationService) {
    this.ReportService = ReportService;
    this.ChartsService = ChartsService;
    this.$filter = $filter;
    this.DateUtil = DateUtil;
    this.RigService = RigService;
    this.FormationService = FormationService;

    let today = new Date();

    this.query = {
      rig: '',
      formation: '',
      date: today
    }
  }

  $onInit() {
    this.isLoading = this.load() | this.loadRigs() | this.loadFormations();
  }

  loadRigs() {
    return this.RigService.list({
        simple: true,
        expand: this.RigService.getExpand([])
      }).then((response) => {
        this.rigs = response.data;
      })
  }

  loadFormations() {
    return this.FormationService.getFormations().then((response) => {
      this.formations = response.data;
    })
  }

  load() {
    // Save last search
    this.lastSearch = _.extend({ }, this.query);

    this.chart = this.ChartsService.getColumns(245, 'normal');
    this.chart.legend.enabled = false;

    this.chart.series = [{
      name: 'ROP',
      data: []
    }];
    
    this.chart.xAxis.categories = [];
    this.chart.tooltip = {
      share: true,
      split: true
    }

    // Setting colors
    this.ChartsService.setColors(this.chart);

    this.best = null;
    this.slowest = null;

    return this.isLoadingData = this.ReportService.ROP({
      date: this.DateUtil.convertDatesToStrings(this.query.date),
      rigId: _.isObject(this.query.rig) ? this.query.rig.id : null,
      formationId: _.isObject(this.query.formation) ? this.query.formation.id : null
    }).then((response) => {
      _.each(response.data, (item) => {
        this.chart.xAxis.categories.push(item.job.jobNumber);
        this.chart.series[0].data.push(item.rop)

        this.best = _.isNull(this.best) ? item.rop :  (item.rop > this.best ? item.rop : this.best);
        this.slowest = _.isNull(this.slowest) ? item.rop : (item.rop < this.slowest ? item.rop : this.slowest);
      })
    }).finally(() => {
      this.isLoadingData = false;
    })
  }
}

angular.module('app')
  .component('ropReport', {
    templateUrl: 'views/reports/rop/rop.html',
    controller: ROPController,
    controllerAs: '$ctrl'
  });

})();
