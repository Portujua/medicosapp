;(() => {

class CasingsListController {
  constructor(Auth, NgTableParams, Casing, CasingService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.Casing = Casing;
    this.CasingService = CasingService;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.wellbore)) {
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
          filter: params.filter(),
        };

        return this.loadingPromise = this.CasingService.list(query, this.wellbore.id)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            console.log(response.data.content);
            return response.data.content;
          });
      }
    });
  }


  create() {
    this.CasingService.openCreateModal(this.job, this.wellbore)
      .then((response) => {
        this.load();
      }, (response) => { });
  }

  update(id) {
    this.CasingService.openUpdateModal(id)
      .finally(() => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Casing(item);

    return this.CasingService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('casingsList', {
    templateUrl: 'views/casings/casings.list.html',
    controller: CasingsListController,
    bindings: {
      wellbore: '<',
      job: '<?',
    }
  });

})();
