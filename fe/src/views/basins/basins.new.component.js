;(() => {

class BasinNewController {
  constructor(BasinService, RegionService, Basin, Auth) {
    this.BasinService = BasinService;
    this.RegionService = RegionService;
    this.Basin = Basin;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Basin({});
  }

  getRegions(keyword) {
    return this.RegionService.listAll(keyword)
      .then((response) => {
        return response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.BasinService.create(this.data.postPayload(), this.data.region.id)
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
  .component('basinsNew', {
    templateUrl: 'views/basins/basins.new.html',
    controller: BasinNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
