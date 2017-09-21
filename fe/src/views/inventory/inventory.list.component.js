;(() => {

class InventoryListController {
  constructor(Auth, NgTableParams, PromptService, InventoryService, Inventory, StorageSevice) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.InventoryService = InventoryService;
    this.Inventory = Inventory;
    this.StorageSevice = StorageSevice;
    this.typesArray = [
      { id: 'BHACOMPONENT', title: 'BHA Component' },
      { id: 'BIT', title: 'Drill Bit' },
      { id: 'MOTOR', title: 'Motor' },
      { id: 'WATERPUMP', title: 'Water Pump' },
    ];
    this.filterByStorage = true;
  }

  $onInit() {
    this.load();
  }

  $onChanges(changes) {
    if (!_.isEmpty(changes.storage)) {
      this.load();
    }
  }

  load() {
    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        let filter = {};

        // Filter only BHA parts
        if (this.bhaPieces) {
          filter['catalogEntry.isBHAPart'] = true;
        }

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: _.extend(params.filter(), filter),
        };

        // If has a storage
        if (!_.isEmpty(this.storage) && this.filterByStorage) {
          query['storageId'] = this.storage.id;
        }

        return this.loadingPromise = this.InventoryService.list(query)
          .then((response) => {
            // Select the first item of the list
            if (this.selectable || this.select) {
              // Select the first by default
              // Select the first with quantityAvailable > 0
              this.itemSelected = _.find(response.data.content, (value) => value.quantityAvailable > 0) || null;
              // Call the select func
              if (_.isFunction(this.select)) {
                this.select({ data: this.itemSelected });
              }
            }
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.InventoryService.openCreateModal(null, this.storage)
      .then((response) => {
        this.load();
      }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Inventory(item);

    return this.InventoryService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  update(data, field, item) {
    let obj = new this.Inventory(item);
    obj[field] = data;

    if (field === 'storage') {
      obj.sector = null;
      obj.rack = null;
      obj.shelf = null;
    }

    if (field === 'sector') {
      obj.rack = null;
      obj.shelf = null;
    }

    if (field === 'rack') {
      obj.shelf = null;
    }

    return this.InventoryService.update(obj.id, obj.putPayload())
      .then((response) => {
        item.storage = obj.storage;
        item.sector = obj.sector;
        item.rack = obj.rack;
        item.shelf = obj.shelf;
      }, (response) => {
        return '';
      });
  }

  getStorages(item) {
    return this.StorageSevice.listStorage({ active: true, simple: true })
      .then((response) => {
        return this.storages = response.data;
      });
  }

  onStorageSelected() {
    this.data.sector = null;
    this.onSectorSelected();
  }

  getSectors(item) {
    return this.StorageSevice.listSector({ active: true, simple: true }, item.storage.id)
      .then((response) => {
        return this.sectors = response.data;
      });
  }

  onSectorSelected() {
    this.data.rack = null;
    this.onRackSelected();
  }

  getRacks(item) {
    return this.StorageSevice.listRack({ active: true, simple: true }, item.sector.id)
      .then((response) => {
        return this.racks = response.data;
      });
  }

  onRackSelected() {
    this.data.shelf = null;
  }

  getShelves(item) {
    return this.StorageSevice.listShelf({ active: true, simple: true }, item.rack.id)
      .then((response) => {
        return this.shelves = response.data;
      });
  }
}

angular.module('app')
  .component('inventoryList', {
    templateUrl: 'views/inventory/inventory.list.html',
    controller: InventoryListController,
    bindings: {
      selectable: '<?',
      bhaPieces: '<?',
      itemSelected: '=?',
      storage: '<?',
      ship: '&?',
      select: '&?',
    }
  });

})();
