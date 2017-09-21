;(() => {

class TimeSheetNewController {
  constructor(TimeSheetService, HourEntry, Auth, JobService, UserService) {
    this.TimeSheetService = TimeSheetService;
    this.HourEntry = HourEntry;
    this.session = Auth.getSession();
    this.UserService = UserService;
    this.JobService = JobService;
  }

  $onInit() {
    this.data = new this.HourEntry({ job : this.resolve.job });
    this.load();
  }

  load() {
    this.JobService.getAssignedPersonnel(this.data.job.id)
      .then((response) => {
       
       this.assignedPersonnel = response.data;
      });

    return this.JobService.getJobPositions()
      .then((response) => {
        this.jobPositions = response.data/*_.map(response.data, (item) => item.value)*/;
      });
  }

  getUsers(keyword) {
    return this.UserService.getUsers(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getHoursType(keyword) {
    return this.TimeSheetService.getHoursType(keyword)
      .then((response) => {
        
        return response.data;
      });
  }

  createHoursType() {
    this.TimeSheetService.createHoursType(this.data.hourType)
      .then((response) => {
        // Set the new value to the model
        this.data.hourType = response.data;
      });
  }



  ok() {
    this.isSaving = true;
    
    this.loadingPromise = this.TimeSheetService.create(this.selectedPostionIndex, this.data.postPayload(), this.data.job.id)
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('timesheetNew', {
    templateUrl: 'views/timesheet/timesheet.new.html',
    controller: TimeSheetNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
