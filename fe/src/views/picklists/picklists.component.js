;(() => {

class PicklistsController {
  constructor(PicklistService, PICKLIS_TYPES, NgTableParams, Auth) {
    this.PicklistService = PicklistService;
    this.PICKLIS_TYPES = PICKLIS_TYPES;
    this.NgTableParams = NgTableParams;
    this.session = Auth.getSession();
    this.exist = false;
  }

  $onInit() {
    this.picklistSelected = _.first(this.PICKLIS_TYPES);

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

        return this.loadingPromise = this.PicklistService.list(query, this.picklistSelected.endpoint)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  save(value) {
    this.isSaving = true;

    this.loadingPromise = this.PicklistService.create(this.picklistSelected.endpoint, value)
      .then((response) => {
        // Reset value
        this.value = null;
        // Reload list
        this.load();
      }).finally(() => {
        this.isSaving = false;
      });
  }


  update(data, field, item) {
      let endpoint = this.picklistSelected.endpoint;     
     return this.PicklistService.update(endpoint,item)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('picklists', {
    templateUrl: 'views/picklists/picklists.html',
    controller: PicklistsController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
