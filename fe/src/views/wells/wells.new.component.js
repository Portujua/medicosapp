;(() => {

class WellsNewController {
  constructor(Auth, WellService, Well, NumericUtil, BasinService) {
    this.session = Auth.getSession();
    this.WellService = WellService;
    this.Well = Well;
    this.NumericUtil = NumericUtil;
    this.BasinService = BasinService;
  }

  $onInit() {
    this.data = new this.Well({});
    // this.loadingPromise = this.getSomeList();
  }

  getProductionTypes(keyword) {
    return this.WellService.getProductionTypes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getBasins(keyword) {
    return this.BasinService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createItem() {
    this.WellService.createProductionType(this.data.productionType)
      .then((response) => {
        // Set the new value to the model
        this.data.productionType = response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.WellService.create(this.data.postPayload())
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

  validatePicklists() {
    return (this.data.productionType && !this.data.productionType.id) || (this.data.basin && !this.data.basin.id);
  }
}

angular.module('app')
  .component('wellsNew', {
    templateUrl: 'views/wells/wells.new.html',
    controller: WellsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
