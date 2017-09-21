;(() => {

class SectorsListController {
  constructor(Auth, NgTableParams, PromptService, StorageSevice, Sector) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.StorageSevice = StorageSevice;
    this.Sector = Sector;

  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.storage)) {
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

        return this.loadingPromise = this.StorageSevice.listSector(query, this.storage.id)
          .then((response) => {
            // Pick first element as default value
            this.select(_.first(response.data.content));
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
      title: 'New Sector',
      size: 'compose-sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Name',
          maxlength: 50,
        }
      ]
    }).then((response) => {
      let obj = new this.Sector({ name: response, storage: this.storage });

      this.StorageSevice.createSector(obj.postPayload())
        .then((response) => {
          this.load();
        });
    });
  }

  save(data, field, item) {
    let obj = new this.Sector(item);

    return this.StorageSevice.updateSector(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  select(item) {
    this.selection.sector = item;
    this.selection.rack = null;
  }
}

angular.module('app')
  .component('sectorsList', {
    templateUrl: 'views/inventory/storages/sectors.list.html',
    controller: SectorsListController,
    bindings: {
      selection: '=',
      storage: '<',
    }
  });

})();
