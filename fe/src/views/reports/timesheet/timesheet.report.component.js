;(() => {

class TimesheetReportController {
  constructor(Auth, ReportService, ChartsService) {
    this.session = Auth.getSession();
    this.ReportService = ReportService;
    this.ChartsService = ChartsService;
    this.count =0;
    this.type=[];
  }

  $onInit() {
    this.loadingPromise = this.load(); // && this.getSomeList();
  }

  load() {

   
  return this.loadingPromise = this.ReportService.getTimesheetReport(this.resolve.jobId)
    .then((response) => {     
      this.data =response.data;
      if (_.isNull(this.data)) {

        this.modalInstance.close('nodata');
      }
      
      _.each(this.data.personnelHours, (value) => {
          _.each(value.hoursDetail, (hours) => {
              this.count = this.count + hours.hours;
              this.type.push(hours.category);
          });
          value.totalHours=this.count; 
          this.count=0;
        });
     
      this.type = _.uniq(this.type);

      this.configurechart();
      //return response.data
    });



  }

  configurechart(){
    this.count=0;
     let serie = [];
     //this.chartData=;

      _.each(this.data.personnelHours, (pH) => {
        _.each(this.type, (t) => {
           _.each(pH.hoursDetail, (h) => {
              if (h.category === t) {
                  this.count = this.count +1;
              }
          
          });
            serie.push({ name: t, y: this.count }); 
           this.count =0;  

        });
        pH.chart = serie;
        serie=[];   
        });



  }

  print() {

  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('timesheetReport', {
    templateUrl: 'views/reports/timesheet/timesheet.report.html',
    controller: TimesheetReportController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
