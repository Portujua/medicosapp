;(() => {

class StoragesListController {
  constructor(Auth, NgTableParams, PromptService, StorageSevice, Storage, ShippingOrderService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.StorageSevice = StorageSevice;
    this.Storage = Storage;
    this.ShippingOrderService = ShippingOrderService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.selection = {
      storage: null,
      sector: null,
      rack: null,
    };

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

        return this.loadingPromise = this.StorageSevice.listStorage(query)
          .then((response) => {
            // Pick first element as default value
            this.selection.storage = _.first(response.data.content);
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.PromptService.open({
      title: 'New Storage',
      size: 'compose-sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Name',
          map: 'name',
          maxlength: 50,
        },
        {
          label: 'Address',
          map: 'address',
          type: 'textarea',
          maxlength: 250,
          required: false,
        },
        {
          label: 'Description',
          map: 'description',
          type: 'textarea',
          maxlength: 250,
          required: false,
        }
      ]
    }).then((response) => {
      let obj = new this.Storage(response);

      this.StorageSevice.createStorage(obj.postPayload())
        .then((response) => {
          this.load();
        });
    });
  }

  save(data, field, item) {
    let obj = new this.Storage(item);

    return this.StorageSevice.updateStorage(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  select(item) {
    this.selection.storage = item;
    this.selection.sector = null;
    this.selection.rack = null;
  }

  ship(item) {
    this.ShippingOrderService.openCreateModal(item)
      .then((response) => {

      }, () => { });
  }
}

angular.module('app')
  .component('storagesList', {
    templateUrl: 'views/inventory/storages/storages.list.html',
    controller: StoragesListController,
    bindings: {

    }
  });

})();
