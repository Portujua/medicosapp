;(() => {

class CasingsNewController {
  constructor(Auth, CasingService, Casing, JobService) {
    this.session = Auth.getSession();
    this.CasingService = CasingService;
    this.Casing = Casing;
    this.JobService = JobService;
  }

  $onInit() {
    this.data = new this.Casing({ job: this.resolve.job, wellbore: this.resolve.wellbore });
  }

  ok() {
    let  payload = this.data.postPayload();
    this.isSaving = true;

    this.loadingPromise = this.CasingService.create(payload, this.data.job.id)
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

  getJobs(keyword) {
    return this.JobService.getActives(null, ['+jobNumber'], { jobNumber: keyword })
      .then((response) => {
        return _.first(response.data, 10);
      }, (response) => { });
  }

  validatePicklists() {
    return (this.data.job && !this.data.job.id) || (this.data.wellbore && !this.data.wellbore.id);
  }
}

angular.module('app')
  .component('casingsNew', {
    templateUrl: 'views/casings/casings.new.html',
    controller: CasingsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
