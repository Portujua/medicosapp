;(() => {

class RegionsEditController {
  constructor(RegionService, Region, PromptService, toastr, Auth) {
    this.RegionService = RegionService;
    this.Region = Region;
    this.PromptService = PromptService;
    this.toastr = toastr;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Region({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.RegionService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Region(response.data);
      });
  }

  toggleActivation() {
    this.RegionService.toggleActivation(this.data.id, this.data.isActive)
      .then((response) => {

      }, (response) => {
        this.data.isActive = !this.data.isActive;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.RegionService.update(this.data.id, this.data.putPayload('name', this.data.name), true)
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
  .component('regionsEdit', {
    templateUrl: 'views/regions/regions.edit.html',
    controller: RegionsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
