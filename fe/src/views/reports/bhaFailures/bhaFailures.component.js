;(() => {

class BHAFailuresController {
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

    this.tableParams = new this.NgTableParams({
      page: 0,
      count: 4
     }, {
      counts: [],
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: 5,
          filter: params.filter(),
          startDate: this.DateUtil.convertDatesToStrings(this.query.startDate),
          endDate: this.DateUtil.convertDatesToStrings(this.query.endDate)
        };

        return this.isLoading = this.ReportService.bhaFailures(query)
          .then((response) => {
            this.data = response.data.content;
            this.currentIndex = response.data.number * response.data.size;
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
  .component('bhaFailuresReport', {
    templateUrl: 'views/reports/bhaFailures/bhaFailures.html',
    controller: BHAFailuresController,
    controllerAs: '$ctrl'
  });

})();
