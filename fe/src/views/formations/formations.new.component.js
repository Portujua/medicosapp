;(() => {

class FormationsNewController {
  constructor(Auth, FormationService, Formation, JobService) {
    this.session = Auth.getSession();
    this.FormationService = FormationService;
    this.Formation = Formation;
    this.JobService = JobService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.Formation({ job: this.resolve.job, wellbore: this.resolve.wellbore });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.FormationService.create(this.data.postPayload(), this.data.job.id)
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }

  getJobs(keyword) {
    return this.JobService.getActives(null, ['+jobNumber'], { jobNumber: keyword })
      .then((response) => {
        return _.first(response.data, 10);
      }, (response) => { });
  }

  getFormations(keyword) {
    return this.FormationService.getFormations(keyword)
      .then((response) => {
        return response.data;
      }, (response) => { });
  }

  createItem() {
    this.FormationService.createFormation(this.data.formation)
      .then((response) => {
        // Set the new value to the model
        this.data.formation = response.data;
      });
  }

  validatePicklists() {
    return (this.data.job && !this.data.job.id) || (this.data.wellbore && !this.data.wellbore.id) || (this.data.formation && !this.data.formation.id);
  }
}

angular.module('app')
  .component('formationsNew', {
    templateUrl: 'views/formations/formations.new.html',
    controller: FormationsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
