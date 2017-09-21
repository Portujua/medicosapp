;(() => {

class WaterPumpNewController {
  constructor(WaterPumpSettings, Auth, WaterPumpSettingsService, InventoryService, CatalogService) {
    this.WaterPumpSettings = WaterPumpSettings;
    this.session = Auth.getSession();
    this.WaterPumpSettingsService = WaterPumpSettingsService;
    this.InventoryService = InventoryService;
    this.CatalogService = CatalogService;
  }

  $onInit() {
    this.load();
  }

  load() {
    console.log(this.resolve.job);
    this.data = new this.WaterPumpSettings({ job: { id: this.resolve.job.id }  });


  }

  getWaterPumps(keyword) {
    console.log(keyword)
    return this.CatalogService.list({ keyword, simple: true, active: true ,  filter: { 'itemType': 'WATERPUMP' }  })
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }

  ok() {
    this.isSaving = true;
       console.log(this.data);
      console.log(this.data.postPayload());
    this.loadingPromise = this.WaterPumpSettingsService.create( this.data.postPayload(), this.data.job.id)
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
  .component('waterpumpsettingsNew', {
    templateUrl: 'views/waterPumpSettings/waterPumpSettings.new.html',
    controller: WaterPumpNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
