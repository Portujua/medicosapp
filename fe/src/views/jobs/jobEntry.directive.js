;(() => {

class JobEntryController {
  constructor($scope, Auth, JobService, Job, TabManagerService) {
    this.session = Auth.getSession();
    this.JobService = JobService;
    this.Job = Job;
    this.data = new Job($scope.data);
    this.TabManagerService = TabManagerService;
  }

  download() {
    this.isLoading = true;

    this.JobService.download(this.data.id)
      .then((response) => {
        this.data = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  setStatus(status) {
    this.JobService.setStatus(this.data.id, status)
      .then((response) => {
           this.data.jobStatus = status;
      });
  }

  getWizardClass(status) {
    let classes = '';

    if (status === this.data.jobStatus) {
      classes += 'current ';
    }

    if (status === 'UPCOMING' && this.data.jobStatus !== 'UPCOMING') {
      classes += 'off ';
    }

    return classes;
  }

  checkStates(status) {
    // Pre-defined status
    let statusList = ['UPCOMING', 'ACTIVE', 'FINISHED'];

    let posStatus = _.indexOf(statusList, status);
    let posJobStatus = _.indexOf(statusList, this.data.jobStatus);

    return posStatus < posJobStatus || posJobStatus === statusList.length - 1;
  }

  open() {
    this.TabManagerService.add({
      title: this.data.jobNumber,
      component: 'jobsView',
      id: this.data.id,
      // icon: 'fa-tachometer',
    });
  }

  save(data, field) {
    return this.JobService.update(this.data.id, this.data.putPayload(field, data))
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .controller('JobEntryController', JobEntryController);

angular.module('app')
  .directive('jobEntry', () => ({
    templateUrl: 'views/jobs/jobEntry.html',
    restrict: 'E',
    controller: 'JobEntryController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => { },
    scope: {
      data: '=ngModel',
    },
  }));

})();
