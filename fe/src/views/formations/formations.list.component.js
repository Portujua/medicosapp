;(() => {

class FormationsListController {
  constructor(FormationService, Formation, Auth, NgTableParams) {
    this.FormationService = FormationService;
    this.Formation = Formation;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
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

        return this.loadingPromise = this.FormationService.list(query, this.wellbore.id)
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
    this.FormationService.openCreateModal(this.job, this.wellbore)
      .then((response) => {
         this.load();
      }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Formation(item);

    return this.FormationService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  getFormations() {
    this.FormationService.getFormations()
      .then((response) => {
        this.formations = response.data;
      }, (response) => { });
  }
}

angular.module('app')
  .component('formationsList', {
    templateUrl: 'views/formations/formations.list.html',
    controller: FormationsListController,
    bindings: {
      wellbore: '<',
      job: '<?',
    },
  });

})();
