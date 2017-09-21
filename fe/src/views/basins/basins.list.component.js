;(() => {

class BasinsListController {
  constructor(BasinService, Basin, Auth, NgTableParams, PromptService, RegionService) {
    this.BasinService = BasinService;
    this.Basin = Basin;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.RegionService = RegionService;
  }

  $onInit() {
    this.load();
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

        return this.loadingPromise = this.BasinService.list(query)
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
    this.BasinService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  update(id) {
    this.BasinService.openUpdateModal(id)
      .then((response) => {
        this.load();
      }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Basin(item);

    return this.BasinService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  getRegions() {
    return this.RegionService.listAll()
      .then((response) => {
       
        this.regions = response.data;
      });
  }
}

angular.module('app')
  .component('basinsList', {
    templateUrl: 'views/basins/basins.list.html',
    controller: BasinsListController,
  });

})();
