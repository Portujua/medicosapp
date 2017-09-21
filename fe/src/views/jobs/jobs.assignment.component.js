;(() => {

class JobsAssigmentController {
  constructor(Auth, JobService, Job, JobPersonnel, NgTableParams, $timeout) {
    this.session = Auth.getSession();
    this.JobService = JobService;
    this.Job = Job;
    this.JobPersonnel = JobPersonnel;
    this.NgTableParams = NgTableParams;
    this.$timeout = $timeout;
    this.selectedPosition = {
      value: 'DRILLER',
    };
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.JobService.getAssignedPersonnel(this.resolve.job.id)
      .then((response) => {
        // ngTable
        this.tableParams = new this.NgTableParams({ }, { dataset: response.data });
        this.assignedPersonnel = response.data;
      });
  }

  getUnassignedPersonnel(keyword) {
    return this.JobService.getUnassignedPersonnel(this.resolve.job.id, keyword, this.selectedPosition.value)
      .then((response) => {
        return response.data;
      });
  }

  assign(personnel) {
    this.isSaving = true;

    let jobPersonnel = new this.JobPersonnel({
      personnel,
      position: this.selectedPosition,
    });

    this.loadingPromise = this.JobService.assign(this.resolve.job.id, jobPersonnel.postPayload())
      .then((response) => {
        // Reset value
        this.personnel = null;
        // Reload lists
        this.load();
      }).finally(() => {
        this.isSaving = false;
      });
  }

  // remove(item) {
  //   this.loadingPromise = this.JobService.removeAssignment(this.data.id, item.driller.id)
  //     .then((response) => {
  //       // Reload
  //       this.load();
  //     });
  // }

  getLabel(item) {
    if (_.isEmpty(item)) {
      return;
    }
    return `${item.name}${ !_.isEmpty(item.user) ? ` (${item.user.username})` : '' }`;
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('jobsAssignment', {
    templateUrl: 'views/jobs/jobs.assignment.html',
    controller: JobsAssigmentController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();

