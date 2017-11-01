(() => {
  
  class MedicsListController {
    constructor(UserService, NgTableParams) {
      this.UserService = UserService;
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
  
          return this.loadingPromise = this.UserService.list(query)
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
      this.UserService.openCreateModal('medic')
        .then((response) => {
          this.load();
        })
    }

    save(data, field, item) {
      this.UserService.update(item.id, { [field]: data }, true)
    }
  
    toggleActivation(item) {
      this.UserService.update(item.id, { estado: item.estado }, true)
    }
  }
  
  angular.module('app')
    .component('medicsList', {
      templateUrl: 'views/medics/medics.list.html',
      controller: MedicsListController,
      controllerAs: '$ctrl'
    });
  
  })();
  