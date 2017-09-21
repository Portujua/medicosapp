;(() => {

class BhasReportController {
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
  .component('bhasReport', {
    templateUrl: 'views/reports/bhas/bhas.report.html',
    controller: BhasReportController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
