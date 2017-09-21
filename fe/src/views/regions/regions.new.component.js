;(() => {

class RegionsNewController {
  constructor(RegionService, Region, PromptService, toastr) {
    this.RegionService = RegionService;
    this.Region = Region;
    this.PromptService = PromptService;
    this.toastr = toastr;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.Region({});
  }

  save() {
    this.isSaving = true;

    this.loadingPromise = this.RegionService.create(this.data.postPayload())
      .then((response) => {
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('regionsNew', {
    templateUrl: 'views/regions/regions.new.html',
    controller: RegionsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
