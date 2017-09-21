;(() => {

class BhasDashboardController {
  constructor(BhaService, JobService, Bha, Auth, NgTableParams, PromptService, CatalogService) {
    this.BhaService = BhaService;
    this.JobService = JobService;
    this.Bha = Bha;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.CatalogService = CatalogService;

    this.typesArray = [
      { id: 'BHACOMPONENT', title: 'BHA Component' },
      { id: 'BIT', title: 'Drill Bit' },
      { id: 'MOTOR', title: 'Motor' },
      { id: 'WATERPUMP', title: 'Water Pump' },
    ];
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.job)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  load() {
    this.loadingPromise = this.BhaService.list({ active: true, simple: true, sort: ['-createdAt'] }, this.job.id)
      .then((response) => {
        // Setting list
        this.bhas = response.data;
        // Set and load the BHA information
        this.setBha(_.first(this.bhas));
      });
  }

  setBha(bha) {
    if (_.isEmpty(bha)) {
      return;
    }

    // Load BHA and components
    this.loadingPromise = this.BhaService.get(bha.id)
      .then((response) => {
        // set new data for that BHA
        this.data = response.data;
        // Setting Components
        this.tableParams = new this.NgTableParams({ count: 50, sorting: { order: 'desc' } }, {
          getData: (params) => {
            this.count = params.count() * (params.page() - 1);

            // Query strings
            let query = {
              sort: params.orderBy(),
              page: params.page(),
              size: params.count(),
              filter: params.filter(),
              expand: '',
            };

            return this.loadingPromise = this.BhaService.listComponents(query, bha.id)
              .then((response) => {
                // Setting the total of records
                params.total(response.data.totalElements);
                // returning list
                return response.data.content;
              });
          }
        });
      });
  }

  create() {
    this.BhaService.openCreateModal(this.job)
      .then((response) => {
        this.load();
      });

    // this.PromptService.open({
    //   title: 'New BHA',
    //   confirmButtonText: 'Create',
    //   size: 'sm',
    //   keyboard: true,
    //   backdrop: true,
    //   inputs: [
    //     {
    //       label: 'Name',
    //       placeholder: 'Enter a value...',
    //       maxlength: 25,
    //     }
    //   ]
    // })
    // .then((response) => {
    //   this.BhaService.create({ name: response, job: this.job })
    //     .then((response) => {
    //       this.load();
    //     });
    // }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Bha(item);

    return this.BhaService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  addComponent(bha) {
    this.BhaService.openCreateBhaComponentModal(this.job, bha)
      .then((response) => {
        this.setBha(bha);
      }, () => { });
  }

  loadDetails(item, catalogId) {
    // If im hiding the panel, dont reload
    if (item.isShowing) {
      item.isShowing = false;
      return;
    }

    item.isShowing = true;

    item.loadingPromise = this.CatalogService.getDetails(catalogId)
      .then((response) => {
        item.inventoryEntry.catalogEntry.details = response.data;
      });
  }
}

angular.module('app')
  .component('bhasDashboard', {
    templateUrl: 'views/bhas/bhas.dashboard.html',
    controller: BhasDashboardController,
    bindings: {
      job: '<?',
    }
  });

})();
