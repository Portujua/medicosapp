;(() => {

class BhasNewController {
  constructor(Auth, BhaService, Bha) {
    this.session = Auth.getSession();
    this.BhaService = BhaService;
    this.Bha = Bha;
  }

  $onInit() {
    this.data = new this.Bha({ job: this.resolve.job });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.BhaService.create(this.data.postPayload())
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

  getTypes(keyword) {
    return this.BhaService.getTypes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createType() {
    this.BhaService.createType(this.data.bhaType)
      .then((response) => {
        // Set the new value to the model
        this.data.bhaType = response.data;
      });
  }

  getObjectives(keyword) {
    return this.BhaService.getObjectives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createObjective() {
    this.BhaService.createObjective(this.data.bhaObjective)
      .then((response) => {
        // Set the new value to the model
        this.data.bhaObjective = response.data;
      });
  }

  getReasonsToPull(keyword) {
    return this.BhaService.getReasonsToPull(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createReasonToPull() {
    this.BhaService.createReasonToPull(this.data.reasonToPull)
      .then((response) => {
        // Set the new value to the model
        this.data.reasonToPull = response.data;
      });
  }

  validatePicklists() {
    return (this.data.job && !this.data.job.id) || (this.data.bhaType && !this.data.bhaType.id) || (this.data.bhaObjective && !this.data.bhaObjective.id) || (this.data.reasonToPull && !this.data.reasonToPull.id);
  }
}

angular.module('app')
  .component('bhasNew', {
    templateUrl: 'views/bhas/bhas.new.html',
    controller: BhasNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
