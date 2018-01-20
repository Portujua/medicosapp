(() => {
  
  class SuscriptionTypesListController {
    constructor(SuscriptionService, NgTableParams) {
      this.SuscriptionService = SuscriptionService;
      this.NgTableParams = NgTableParams;
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
            page: params.page() - 1,
            size: params.count(),
            filter: params.filter()
          };
  
          return this.loadingPromise = this.SuscriptionService.list(query)
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
      this.SuscriptionService.openCreateModal().then((response) => {
        this.load();
      })
    }

    save(data, field, item) { 
      this.SuscriptionService.update(item.id, { [field]: data }, true)
    }
  
    toggleActivation(item) {
      this.SuscriptionService.update(item.id, { estado: item.estado }, true)
    }
  }
  
  angular.module('app')
    .component('suscriptionTypesList', {
      templateUrl: 'views/suscriptions/suscriptionTypes.list.html',
      controller: SuscriptionTypesListController,
      controllerAs: '$ctrl'
    });
  
  })();
  