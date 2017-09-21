;(() => {

class WorkingDaysNewController {
  constructor(Auth, WorkingDayService, WorkingDay, DateUtil) {
    this.session = Auth.getSession();
    this.WorkingDayService = WorkingDayService;
    this.WorkingDay = WorkingDay;
    this.DateUtil = DateUtil;
  }

  $onInit() {
    this.data = new this.WorkingDay({ job: this.resolve.job });
    this.load();
  }

  load() {
    this.options = {
      showWeeks: false,
      yearColumns: 3,
      minDate: this.resolve.job.startDate,
      maxDate: this.resolve.job.endDate,
      dateDisabled: ({ date, mode }) => {
        for (let i = 0; i < this.resolve.days.length; i++) {
          // If the date already exists
          if (this.DateUtil.isSame(this.resolve.days[i].date, date)) {
            return true;
          }
        }
        return false;
      }
    };
  }

  ok() {
   this.loadingPromise = this.WorkingDayService.create(this.data.postPayload(), this.resolve.job.id)
      .then((response) => {
        this.modalInstance.close(response.data);
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('workingDaysNew', {
    templateUrl: 'views/workingDays/workingDays.new.html',
    controller: WorkingDaysNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
