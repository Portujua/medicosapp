 ;(() => {

class DailyCostListController {
  constructor(Auth, NgTableParams, DailyCostService, DailyCost, ClientContractService, $timeout) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.ClientContractService = ClientContractService;
    this.DailyCostService = DailyCostService;
    this.DailyCost = DailyCost;
    this.$timeout = $timeout;
    this.total = 0;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.job) && !_.isEmpty(this.day)) {
      // If the id isnt empty we must load our data
      this.load();
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
          //filter: _.extend(params.filter(), { 'workingDay.id': this.day.id }),
        };

        return this.loadingPromise = this.DailyCostService.list(query, this.day.id)
          .then((response) => {
            this.data = response.data.content;

            // Setting the total of records
            params.total(response.data.totalElements);
            // Total
            this.total = _.reduce(response.data.content, (memo, item) => {
              return memo + (item.quantity * item.clientContractTerm.referenceCost);
            }, 0);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  getTerms(keyword) {
    return this.ClientContractService.getTerms({ keyword, simple: true, active: true }, this.job.jobContract.id)
      .then((response) => {
        
        return response.data;
      });
  }

  creatDailyCost() {
    this.DailyCostService.openCreateModal(this.job, this.day)
      .then((response) => {
        this.load();
      });
  }


  save(data, field, item) {
    let obj = new this.DailyCost(item);

    return this.DailyCostService.update(obj.id, obj.putPayload(field, data), true)
      .then ((response) =>  {
        this.$timeout(() => {
          this.updateTotal();
        })
      })
  }

  removeDailyCost(item) {
    this.isDeleting = true;

    this.loadingPromise = this.DailyCostService.deleteDailyCost(item.id)
      .then(() => {
        this.load();
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

  updateTotal() {
    this.total = 0;

    _.each(this.tableParams.data, (item) => {
      this.total += (item.quantity * item.clientContractTerm.referenceCost)
    });
  }
}

angular.module('app')
  .component('dailyCostList', {
    templateUrl: 'views/dailyCosts/dailyCosts.list.html',
    controller: DailyCostListController,
    bindings: {
      job : '<',
      day: '<',
    }
  });

})();
