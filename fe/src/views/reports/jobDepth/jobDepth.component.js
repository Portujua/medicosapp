;(() => {

class JobDepthController {
  constructor(ReportService, TimeUtil, NgTableParams, DateUtil) {
    this.ReportService = ReportService;
    this.NgTableParams = NgTableParams;
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
      date: today
    }
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
    // Save last search
    this.lastSearch = _.extend({ }, this.query);
    
    this.tableParams = new this.NgTableParams({
      count: 4
     }, {
      counts: [],
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
          date: this.DateUtil.convertDatesToStrings(this.query.date)
        };

        return this.isLoading = this.ReportService.jobDepth(query)
          .then((response) => {
            this.data = response.data.content;
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          }).finally(() => {
            this.isLoading = false;
          })
      }
    });
  }
}

angular.module('app')
  .component('jobDepthReport', {
    templateUrl: 'views/reports/jobDepth/jobDepth.html',
    controller: JobDepthController,
    controllerAs: '$ctrl'
  });

})();
