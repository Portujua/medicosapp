;(() => {

class CatalogsViewController {
  constructor(CatalogService, Catalog, BhaComponent, DrillBit, Motor, WaterPump, Auth, TabManagerService, InventoryService) {
    this.CatalogService = CatalogService;
    this.Catalog = Catalog;
    this.BhaComponent = BhaComponent;
    this.DrillBit = DrillBit;
    this.Motor = Motor;
    this.WaterPump = WaterPump;
    this.session = Auth.getSession();
    this.TabManagerService = TabManagerService;
    this.InventoryService = InventoryService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.CatalogService.get(this.id)
      .then((response) => {
        this.data = new this.Catalog(response.data);
        // Load details
        return this.CatalogService.getDetails(this.id);
      })
      .then((response) => {
        this.setDetails(response.data);
        // Getting categories
        return this.CatalogService.getEntryCategories(this.id);
      })
      .then((response) => {
        this.data.categories = response.data.content;
      });
  }

  createInventoryEntry() {
    this.InventoryService.openCreateModal(this.data)
      .then((response) => {

      }, () => { });
  }

  setDetails(data) {
    switch (this.data.itemType) {
      case 'BHACOMPONENT':
        this.detail = new this.BhaComponent(data);
        break;
      case 'BIT':
        this.detail = new this.DrillBit(data);
        break;
      case 'MOTOR':
        this.detail = new this.Motor(data);
        break;
      case 'WATERPUMP':
        this.detail = new this.WaterPump(data);
        break;
    };
  }

  save(data, field) {
    return this.CatalogService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
        // Reload
        field === 'baseImage' ? this.load() : 1;
      }, (response) => {
        return '';
      });
  }

  update() {
    let payload = {
      entry: this.data.putPayload(),
      detail: this.detail.putPayload()
    };

    return this.CatalogService.update(this.data.id, payload)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  getCategories(query) {
    return this.CatalogService.getCategories(query)
      .then((response) => {
        return response.data;
      });
  }

  getImages() {
    this.CatalogService.getImages()
      .then((response) => {
        this.images = _.map(_.sortBy(response.data), (item) => {
          return {
            title: item.baseCompoment.replace(/_/g, ' '),
            value: item.baseCompoment,
          };
        });
      }, (response) => { });
  }

  getManufacturers(keyword) {
    this.CatalogService.getManufacturers()
      .then((response) => {
        this.manufacturers = response.data;
      });
  }

}

angular.module('app')
  .component('catalogsView', {
    templateUrl: 'views/inventory/catalogs/catalogs.view.html',
    controller: CatalogsViewController,
    bindings: {
      id: '@',
      job: '<',
      tabId: '@',
    }
  });

})();
