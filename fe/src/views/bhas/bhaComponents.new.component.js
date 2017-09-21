;(() => {

class BhaComponentsNewController {
  constructor(Auth, BhaService, BhaComponentInventory) {
    this.session = Auth.getSession();
    this.BhaService = BhaService;
    this.BhaComponentInventory = BhaComponentInventory;
  }

  $onInit() {
    this.data = new this.BhaComponentInventory({
      order: _.size(this.resolve.bha.bhaComponents),
      bha: this.resolve.bha
    });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.BhaService.addComponent(this.data.postPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  select(item) {
    if (!_.isEmpty(item)) {
      this.data.catalogEntry = item.catalogEntry;
      this.quantityAvailable = item.quantityAvailable;
    }
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('bhaComponentsNew', {
    templateUrl: 'views/bhas/bhaComponents.new.html',
    controller: BhaComponentsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
