;(() => {

class ReportService extends BaseService {
  constructor(RESTful, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.$uibModal = $uibModal;
  }

  openTestReport() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'testReport',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: { }
    });

    return modalInstance.result;
  }

  openDailyReport(jobId) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'dailyReport',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        jobId: () => jobId
      }
    });

    return modalInstance.result;
  }

  openBhasReport(jobId) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'bhasReport',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        jobId: () => jobId
      }
    });

    return modalInstance.result;
  }

  openTimesheetReport(jobId) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'timesheetReport',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        jobId: () => jobId
      }
    });

    return modalInstance.result;
  }

  jobHistory(payload) {
    return this.RESTful.get('dashboard-entries/jobHistory', payload);
  }

  jobDepth(query) {
    return this.RESTful.get('dashboard-entries/jobDepth', this.getQueryString(query));
  }

  jobLocation(payload) {
    return this.RESTful.get('dashboard-entries/jobLocation', payload);
  }

  bhaFailures(payload) {
    return this.RESTful.get('dashboard-entries/bhaFailures', payload);
  }

  ROP(payload) {
    return this.RESTful.get('dashboard-entries/rop', payload);
  }

  getTimesheetReport(jobId){
     return this.RESTful.get(`job/${jobId}/report/personnel/hours`)

  }
};

angular.module('app')
  .service('ReportService', ReportService);

})();
