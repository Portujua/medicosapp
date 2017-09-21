;(() => {

class TestReportController {
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
  .component('testReport', {
    templateUrl: 'views/reports/test.html',
    controller: TestReportController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
