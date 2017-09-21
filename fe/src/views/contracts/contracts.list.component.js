;(() => {

class ContractsListController {
  constructor(ContractService, Contract, Auth, NgTableParams) {
    this.ContractService = ContractService;
    this.Contract = Contract;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.ContractService.list(query)
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
    this.ContractService.openCreateModal()
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.ContractService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Contract(item);

    return this.ContractService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.ContractService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }
}

angular.module('app')
  .component('contractsList', {
    templateUrl: 'views/contracts/contracts.list.html',
    controller: ContractsListController,
  });

})();
