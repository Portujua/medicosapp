;(() => {

class CatalogsListController {
  constructor(Auth, NgTableParams, PromptService, CatalogService, Catalog, InventoryService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.CatalogService = CatalogService;
    this.Catalog = Catalog;
    this.InventoryService = InventoryService;
    this.typesArray = [
      { id: 'BHACOMPONENT', title: 'BHA Component' },
      { id: 'BIT', title: 'Drill Bit' },
      { id: 'MOTOR', title: 'Motor' },
      { id: 'WATERPUMP', title: 'Water Pump' },
    ];
  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ sorting: { createdAt: 'desc' }  }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.CatalogService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.CatalogService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  createInventoryEntry(item) {
    this.InventoryService.openCreateModal(item, this.storage)
      .then((response) => {

      }, () => { });
  }

  update(id) {
    this.CatalogService.openUpdateModal(id)
      .finally(() => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Catalog(item);

    return this.CatalogService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.CatalogService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }

  createCatalogCategory() {
    this.CatalogService.openCreateCategoryModal()
      .then((response) => {

      }, (response) => { });
  }
}

angular.module('app')
  .component('catalogsList', {
    templateUrl: 'views/inventory/catalogs/catalogs.list.html',
    controller: CatalogsListController,
    bindings: {
      storage: '<?',
    }
  });

})();
