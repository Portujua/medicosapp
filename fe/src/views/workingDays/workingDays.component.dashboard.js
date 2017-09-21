;(() => {

class WorkingDaysDashboardController {
  constructor(WorkingDayService, WorkingDay) {
    this.WorkingDayService = WorkingDayService;
    this.WorkingDay = WorkingDay;
    this.days = [];
    this.currentDay = null;
    this.currentDayIndex = 0;

  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.job)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  load() {
    this.days = [];

    this.loadingPromise = this.WorkingDayService.list(this.job.id)
      .then((response) => {
        this.days = response.data;
      });
  }

  setDay(day) {
    if (_.isEmpty(day)) {
      return;
    }

    // Index of day
    this.currentDayIndex = _.findIndex(this.days, (value) => value.id === day.id);
  }

  create() {
    this.WorkingDayService.openCreateModal(this.job, this.days)
      .then((response) => {
        this.load();
      });
  }
}

angular.module('app')
  .component('workingDaysDashboard', {
    templateUrl: 'views/workingDays/workingDays.dashboard.html',
    controller: WorkingDaysDashboardController,
    bindings: {
      id: '@',
      job: '<?',
    }
  });

})();
