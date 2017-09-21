;(() => {

class SurveysNewController {
  constructor(Auth, SurveyService, Survey, JobService) {
    this.session = Auth.getSession();
    this.SurveyService = SurveyService;
    this.Survey = Survey;
    this.JobService = JobService;
  }

  $onInit() {
    this.data = new this.Survey({ job: this.resolve.job, wellbore: this.resolve.wellbore });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.SurveyService.create(this.data.postPayload())
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
  .component('surveysNew', {
    templateUrl: 'views/surveys/surveys.new.html',
    controller: SurveysNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
