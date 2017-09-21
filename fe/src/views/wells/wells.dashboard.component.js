;(() => {

class WellsDashboardController {
  constructor(WellService, JobService, Well, Auth, NumericUtil) {
    this.WellService = WellService;
    this.JobService = JobService;
    this.Well = Well;
    this.session = Auth.getSession();
    this.NumericUtil = NumericUtil;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.id)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  load() {
    this.loadingPromise = this.WellService.get(this.id, this.WellService.getExpand('wells', 'dashboard'))
      .then((response) => {
        this.data = response.data;
      });
  }

  getWells(keyword) {
    return this.WellService.getActives(keyword)
      .then((response) => {
        return _.filter(response.data, (value, key, list) => {
          return _.isEmpty(this.data) ? true : this.data.id !== value.id;
        });
      });
  }

  save(data, field) {
    let obj = new this.Well(this.data);

    return this.WellService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
        this.data.updatedAt = response.data.updatedAt;
        this.data.updatedBy = response.data.updatedBy;
        // this.load();
      }, (response) => {
        // If an error occurs trying to update a boolean value
        if (field === 'isOffshore') {
          this.data.isOffshore = !this.data.isOffshore;
        }
        return '';
      });
  }

  change(data) {
    this.JobService.update(this.job.id, this.job.putPayload('well', data), true)
      .then((response) => {
        // New Rig
        this.id = data.id;
        // Reload
        this.load();
      });
  }

  getProductionTypes() {
    this.WellService.getProductionTypes()
      .then((response) => {
       
        this.productionTypes = response.data;
      });
  }
}

angular.module('app')
  .component('wellsDashboard', {
    templateUrl: 'views/wells/wells.dashboard.html',
    controller: WellsDashboardController,
    bindings: {
      id: '@',
      job: '<?',
    }
  });

})();
