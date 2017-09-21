;(() => {

class ClientContractsListController {
  constructor(ClientContractService, ClientContract, Auth, NgTableParams, $stateParams, $timeout) {
    this.ClientContractService = ClientContractService;
    this.ClientContract = ClientContract;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;

    this.entity = this.entity || this.$stateParams.entity;
    this.id = this.id || this.$stateParams.id;
  }

  $onInit() {
    this.loadingPromise = this.loadClients() || this.loadContracts();
  }

  $onChanges() {
    if (!_.isEmpty(this.client)) {
      // If the id isnt empty we must load our data
      this.load();
    }
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

        return this.loadingPromise = this.ClientContractService.list(query, this.client.id)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  loadClients() {
    this.ClientContractService.getClients()
      .then((response) => {
        this.clients = response.data.content;
      })
  }

  loadContracts() {
    this.ClientContractService.getContracts()
      .then((response) => {
        this.contracts = response.data.content;
      })
  }

  create() {
    this.ClientContractService.openCreateModal(this.client)
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.ClientContractService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.ClientContract(item);

    return this.ClientContractService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.ClientContractService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }
}

angular.module('app')
  .component('clientContractsList', {
    templateUrl: 'views/clientContracts/clientContracts.list.html',
    controller: ClientContractsListController,
    bindings: {
      client: '<',
    }
  });

})();
