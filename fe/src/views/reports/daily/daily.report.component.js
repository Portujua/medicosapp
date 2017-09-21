;(() => {

class DailyReportController {
  constructor(Auth, ReportService) {
    this.session = Auth.getSession();
    this.ReportService = ReportService;
  }

  $onInit() {

    this.loadingPromise = this.load(); // && this.getSomeList();
  }

  load() {

  }

  print() {

  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('dailyReport', {
    templateUrl: 'views/reports/daily/daily.report.html',
    controller: DailyReportController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
