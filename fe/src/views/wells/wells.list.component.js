;(() => {

class WellsListController {
  constructor(WellService, Well, Auth, NgTableParams, TabManagerService, NumericUtil, PromptService) {
    this.WellService = WellService;
    this.Well = Well;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.TabManagerService = TabManagerService;
    this.NumericUtil = NumericUtil;
    this.PromptService = PromptService;
  }

  $onInit() {
    this.load();
  }

  getBasins() {
    return this.WellService.getBasins()
      .then((response) => {
        this.basins = response.data.content;
      });
  }

  getProductionTypes() {
    return this.WellService.getProductionTypes()
      .then((response) => {
        this.productionTypes = response.data;
      })
  }

  createProductionType() {
    this.PromptService.open({
      title: 'New Production Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Production Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.WellService.createProductionType(response);
      }, () => { });
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

        return this.loadingPromise = this.WellService.list(query)
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
    this.WellService.openCreateModal()
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.WellService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        // this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Well(item);

    return this.WellService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        // roll-back value
        if (field === 'isOffshore') {
          item.isOffshore = !item.isOffshore;
        }

        return '';
      });
  }

  open(well) {
    this.TabManagerService.add({ title: well.name, component: 'wellsView', id: well.id });
  }
}

angular.module('app')
  .component('wellsList', {
    templateUrl: 'views/wells/wells.list.html',
    controller: WellsListController,
  });

})();
