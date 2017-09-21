;(() => {

class WorkingDayService extends BaseService {
  constructor(RESTful, $timeout, Message, Activity, DAYS_TEST, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.$timeout = $timeout;
    this.Message = Message;
    this.Activity = Activity;
    this.DAYS_TEST = DAYS_TEST;
    this.$uibModal = $uibModal;
  }

  list(jobId) {
    return this.RESTful.get(`jobs/${jobId}/workingdays`, { simple: true });
  }

  get(id) {
    return this.$timeout(() => {}, 500);
  }

  create(payload, jobId){
    return this.RESTful.post('workingdays', payload)
      .then((response) => {
        this.Message.create('day');
        return response;
      });
  }

  openCreateModal(job, days) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'workingDaysNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: false,
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-sm',
      resolve: {
        job: () => job,
        days: () => days,
      }
    });

    return modalInstance.result;
  }


};

angular.module('app')
  .service('WorkingDayService', WorkingDayService);

})();
