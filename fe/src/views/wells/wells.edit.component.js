;(() => {

class WellsEditController {
  constructor(Auth, WellService, Well, NumericUtil, BasinService) {
    this.session = Auth.getSession();
    this.WellService = WellService;
    this.Well = Well;
    this.NumericUtil = NumericUtil;
    this.BasinService = BasinService;
  }

  $onInit() {
    this.data = new this.Well({});
    this.loadingPromise = this.load(); // && this.getSomeList();
  }

  load() {
    return this.WellService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Well(response.data);
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.WellService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  getBasins(keyword) {
    return this.BasinService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getProductionTypes(keyword) {
    return this.WellService.getProductionTypes(keyword)
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

  cancel() {
    this.modalInstance.dismiss('cancel');
  }

  validatePicklists() {
    return (this.data.productionType && !this.data.productionType.id) || (this.data.basin && !this.data.basin.id);
  }
}

angular.module('app')
  .component('wellsEdit', {
    templateUrl: 'views/wells/wells.edit.html',
    controller: WellsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
