;(() => {

class RacksListController {
  constructor(Auth, NgTableParams, PromptService, StorageSevice, Rack) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.StorageSevice = StorageSevice;
    this.Rack = Rack;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.sector)) {
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

        return this.loadingPromise = this.StorageSevice.listRack(query, this.sector.id)
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
      title: 'New Rack',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Name',
          maxlength: 50,
        }
      ]
    }).then((response) => {
      let obj = new this.Rack({ name: response, sector: this.sector });

      this.StorageSevice.createRack(obj.postPayload())
        .then((response) => {
          this.load();
        });
    });
  }

  save(data, field, item) {
    let obj = new this.Rack(item);

    return this.StorageSevice.updateRack(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  select(item) {
    this.selection.rack = item;
  }
}

angular.module('app')
  .component('racksList', {
    templateUrl: 'views/inventory/storages/racks.list.html',
    controller: RacksListController,
    bindings: {
      selection: '=',
      sector: '<',
    }
  });

})();
