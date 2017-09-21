 ;(() => {

class WaterPumpSettingsListController {
  constructor(Auth, NgTableParams, WaterPumpSettingsService, WaterPumpSettings, InventoryService, CatalogService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.WaterPumpSettingsService = WaterPumpSettingsService;
    this.WaterPumpSettings = WaterPumpSettings;
    this.InventoryService = InventoryService;
    this.CatalogService = CatalogService; 
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.job)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  load() {

    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.WaterPumpSettingsService.list(query, this.job.id)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // Total


            /*_.each(response.data.content, (value) => {
                value = new this.WaterPumpSettings(value);
            });*/

            // returning list
            return response.data.content;
          });
      }
    });
  }

  getWaterPumps(keyword) {
    return this.CatalogService.list({ keyword, simple: true, active: true ,  filter: { 'itemType': 'WATERPUMP' } })
      .then((response) => {
        return response.data;
      });
  }

  createWaterPumpSettings() {
    this.WaterPumpSettingsService.openCreateModal(this.job)
      .then((response) => {
        this.load();
      });
  }


  save(data, field, item) {

    console.log(item);
    let obj = new this.WaterPumpSettings(item);
    console.log(obj.putPayload(field, data));
   return this.WaterPumpSettingsService.update(obj.id, obj.putPayload(field, data),true)
      .then ((response) =>  {
        this.load()
      }, (response) => {
        this.load()
      // return '';
      });
  }


}

angular.module('app')
  .component('waterPumpSettingsList', {
    templateUrl: 'views/waterPumpSettings/waterPumpSettings.list.html',
    controller: WaterPumpSettingsListController,
    bindings: {
      job : '<',

    }
  });

})();
