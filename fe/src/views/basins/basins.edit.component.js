;(() => {

class BasinEditController {
  constructor(BasinService, RegionService, Basin, Auth) {
    this.BasinService = BasinService;
    this.RegionService = RegionService;
    this.Basin = Basin;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.BasinService.get(this.resolve.id)
    .then((response) => {
      this.data = new this.Basin(response.data);
    });
  }

  getRegions(keyword) {
    return this.RegionService.listAll(keyword)
      .then((response) => {
        return response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.BasinService.update(this.data.id, this.data.putPayload())
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
  .component('basinsEdit', {
    templateUrl: 'views/basins/basins.edit.html',
    controller: BasinEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
