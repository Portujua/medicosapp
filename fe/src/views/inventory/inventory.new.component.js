;(() => {

class InventoryNewController {
  constructor(Auth, InventoryService, Inventory, CatalogService, StorageSevice) {
    this.session = Auth.getSession();
    this.InventoryService = InventoryService;
    this.Inventory = Inventory;
    this.CatalogService = CatalogService;
    this.StorageSevice = StorageSevice;

  }

  $onInit() {
    this.data = new this.Inventory({ catalogEntry: this.resolve.catalogEntry, storage: this.resolve.storage });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.InventoryService.create(this.data.postPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  getCatalogEntries(keyword) {
    return this.CatalogService.list({ keyword, active: true, simple: true })
      .then((response) => {
        return response.data;
      });
  }

  getStorages(keyword) {
    return this.StorageSevice.listStorage({ keyword, active: true, simple: true })
      .then((response) => {
        return response.data;
      });
  }

  onStorageSelected() {
    this.data.sector = null;
    this.onSectorSelected();
  }

  checkStorage() {
    if (_.isEmpty(this.data.storage)) {
      this.onStorageSelected();
    }
  }

  getSectors(keyword) {
    return this.StorageSevice.listSector({ keyword, active: true, simple: true }, this.data.storage.id)
      .then((response) => {
        return response.data;
      });
  }

  onSectorSelected() {
    this.data.rack = null;
    this.onRackSelected();
  }

  checkSector() {
    if (_.isEmpty(this.data.sector)) {
      this.onSectorSelected();
    }
  }

  getRacks(keyword) {
    return this.StorageSevice.listRack({ keyword, active: true, simple: true }, this.data.sector.id)
      .then((response) => {
        return response.data;
      });
  }

  onRackSelected() {
    this.data.shelf = null;
  }

  checkRack() {
    if (_.isEmpty(this.data.rack)) {
      this.onRackSelected();
    }
  }

  getShelves(keyword) {
    return this.StorageSevice.listShelf({ keyword, active: true, simple: true }, this.data.rack.id)
      .then((response) => {
        return response.data;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }

  validatePicklists() {
    return (this.data.catalogEntry && !this.data.catalogEntry.id) || (this.data.storage && !this.data.storage.id);
  }
}

angular.module('app')
  .component('inventoryNew', {
    templateUrl: 'views/inventory/inventory.new.html',
    controller: InventoryNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
