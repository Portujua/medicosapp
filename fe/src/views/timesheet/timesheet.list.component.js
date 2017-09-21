 ;(() => {

class TimeSheetListController {
  constructor(Auth, NgTableParams, HourEntry, TimeSheetService, $filter, ReportService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.HourEntry = HourEntry;
    this.TimeSheetService = TimeSheetService;
    this.days = [];
    this.$filter = $filter;
    this.ReportService = ReportService;
    this.status = ['PENDING','APPROVED','DECLINED'];
    this.count = 0;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.job)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  report() {
    this.ReportService.openTimesheetReport(this.job.id);
  }

  load() {
    this.days = [];
    this.loadingPromise = this.TimeSheetService.list( this.job.id)
      .then((response) => {
        let alldates = [];
       
        if (response.data.content.length === 0) {
          return;
        }
        _.each(response.data.content, (value) => {
          value.dateN = this.$filter('date')(value.date, 'dd/MMM/yyyy');
          alldates.push(value.dateN);
        });

        alldates = _.uniq(alldates);
        _.each(alldates, (value) => {
            this.days.push({ date: value , id: this.count });
            this.count++;
        });

        this.days = this.$filter('orderBy')(this.days, 'date');
        this.hours = response.data.content;
        this.getHours(this.days[0]);
      });
  }


  getHours(item) {
      this.data = [];
      this.data = _.where(this.hours, { dateN: item.date });
      this.tableParams = new this.NgTableParams({ }, {
          dataset: this.data,
      });
  }

  updateStatus(personnelHoursId, status) {
    return this.TimeSheetService.updateStatus(personnelHoursId, status)
      .then((response) => {
        // this.load();
      }, () => {
        return ' ';
      });
  }

  createHours() {
    this.TimeSheetService.openCreateModal(this.job)
      .then((response) => {
        this.load();
      });
  }
}

angular.module('app')
  .component('timesheetList', {
    templateUrl: 'views/timesheet/timesheet.list.html',
    controller: TimeSheetListController,
    bindings: {

      job : '<',

    }
  });

})();
