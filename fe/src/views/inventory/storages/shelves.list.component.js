;(() => {

class ShelvesListController {
  constructor(Auth, NgTableParams, PromptService, StorageSevice, Shelf) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.StorageSevice = StorageSevice;
    this.Shelf = Shelf;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.rack)) {
      // If the id isnt empty we must load our data
      this.load();
    } else {
      this.tableParams = undefined;
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

        return this.loadingPromise = this.StorageSevice.listShelf(query, this.rack.id)
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
    this.PromptService.open({
      title: 'New Shelf',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Name',
          maxlength: 50,
        }
      ]
    }).then((response) => {
      let obj = new this.Shelf({ name: response, rack: this.rack });

      this.StorageSevice.createShelf(obj.postPayload())
        .then((response) => {
          this.load();
        });
    });
  }

  save(data, field, item) {
    let obj = new this.Shelf(item);

    return this.StorageSevice.updateShelf(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('shelvesList', {
    templateUrl: 'views/inventory/storages/shelves.list.html',
    controller: ShelvesListController,
    bindings: {
      selection: '=',
      rack: '<',
    }
  });

})();
