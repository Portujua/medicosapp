(() => {
  
  class SuscriptionListController {
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
      this.SuscriptionService.openCreateModal()
    }

    save(data, field, item) { 
      this.SuscriptionService.update(item.id, { [field]: data }, true)
    }
  
    toggleActivation(item) {
      this.SuscriptionService.update(item.id, { estado: item.estado }, true)
    }
  }
  
  angular.module('app')
    .component('suscriptionList', {
      templateUrl: 'views/suscriptions/suscriptions.list.html',
      controller: SuscriptionListController,
      controllerAs: '$ctrl'
    });
  
  })();
  