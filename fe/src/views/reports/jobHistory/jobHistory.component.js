;(() => {

class JobHistoryController {
  constructor(ReportService, ChartsService, $filter, TimeUtil, DateUtil) {
    this.ReportService = ReportService;
    this.ChartsService = ChartsService;
    this.$filter = $filter;
    this.DateUtil = DateUtil;

    let today = new Date();
    let lastWeek = TimeUtil.subtractDuration(today, 1, 'week');
    
    this.statusArray = [
      { id: 'SETTING_UP', title: 'Setting Up' },
      { id: 'UPCOMING', title: 'Upcoming' },
      { id: 'ACTIVE', title: 'Active' },
      { id: 'FINISHED', title: 'Finished' },
      { id: 'CANCELED', title: 'Canceled' },
    ];

    this.query = {
      startDate: lastWeek,
      endDate: today
    }
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
    // Save last search
    this.lastSearch = _.extend({ }, this.query);
    
    this.chart = this.ChartsService.getColumns(300, 'normal');

    this.chart.series = []
    this.chart.xAxis.categories = [];
    this.chart.tooltip = {
      share: true,
      split: true
    }

    let dailyCount = [];
    let dailyIndex = -1;

    this.isLoading = this.ReportService.jobHistory({
      startDate: this.DateUtil.convertDatesToStrings(this.query.startDate),
      endDate: this.DateUtil.convertDatesToStrings(this.query.endDate)
    }).then((response) => {
      _.each(response.data, (r) => {
        this.chart.xAxis.categories.push(this.$filter('date')(r.date, 'dd/MMM'));

        _.each(r.jobsByStatus, (js) => {
          // Cleanning Job status name
          js.status = s(js.status).humanize().titleize().value();
          // Check if serie exists
          let exist = null;

          for (let i = 0; i < this.chart.series.length; i++) {
            if (this.chart.series[i].name === js.status) {
              exist = i;
            }
          }

          // If exist is not null it already exists, so we add the count to the data
          if (!_.isNull(exist)) {
            dailyCount[dailyIndex] += js.count;
            this.chart.series[exist].data.push(js.count);
          }
          // Otherwise we create a new serie
          else {
            dailyIndex++;
            dailyCount[dailyIndex] = js.count;

            this.chart.series.push({
              name: js.status,
              data: [js.count]
            })
          }
        });
      });

      // Calculate daily average
      this.chart.avg = null;

      for (let i = 0; i < this.chart.xAxis.categories.length; i++) {
        if (_.isNull(this.chart.avg)) {
          this.chart.avg = dailyCount[i];
        }
        else {
          this.chart.avg = (this.chart.avg + dailyCount[i]) / 2;
        }
      }

      // Setting colors
      this.ChartsService.setColors(this.chart);

    }).finally(() => {
      this.isLoading = false;
    })
  }
}

angular.module('app')
  .component('jobHistoryReport', {
    templateUrl: 'views/reports/jobHistory/jobHistory.html',
    controller: JobHistoryController,
    controllerAs: '$ctrl'
  });

})();
