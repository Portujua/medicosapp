;(() => {

class DailyCostNewController {
  constructor(DailyCost, Auth, ClientContractService, DailyCostService) {
    this.DailyCost = DailyCost;
    this.session = Auth.getSession();
    this.ClientContractService = ClientContractService;
    this.DailyCostService = DailyCostService;
  }

  $onInit() {
    this.load();
  }

  load() {
    console.log(this.resolve);
    this.data = new this.DailyCost({ workingDay: this.resolve.workingDay });
  }

  getTerms(keyword) {

    return this.ClientContractService.getTerms({ 
      keyword, 
      simple: true, 
      active: true,
      expand: this.DailyCostService.getExpand(['termUnit'])
    }, this.resolve.job.jobContract.id).then((response) => {

        return response.data;
      });
  }

  ok() {
    this.isSaving = true;

    console.log(this.data);
    this.loadingPromise = this.DailyCostService.create( this.data.postPayload(), this.data.workingDay.id)
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
  .component('dailycostNew', {
    templateUrl: 'views/dailyCosts/dailyCosts.new.html',
    controller: DailyCostNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
