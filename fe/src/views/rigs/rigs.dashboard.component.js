;(() => {

class RigsDashboardController {
  constructor(RigService, JobService, Rig, Auth) {
    this.RigService = RigService;
    this.JobService = JobService;
    this.Rig = Rig;
    this.session = Auth.getSession();
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
    this.loadingPromise = this.RigService.get(this.id, this.RigService.getExpand('rigs', 'dashboard'))
      .then((response) => {
        this.data = response.data;
      });
  }

  getRigs(keyword) {
    return this.RigService.getActives(keyword)
      .then((response) => {
        return _.filter(response.data, (value, key, list) => {
          return _.isEmpty(this.data) ? true : this.data.id !== value.id;
        });
      });
  }

  getRigTypes() {
    this.RigService.getTypes()
      .then((response) => {
        this.rigTypes = response.data;
      });
  }

  save(data, field) {
    let obj = new this.Rig(this.data);

    return this.RigService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
        this.data.updatedAt = response.data.updatedAt;
        this.data.updatedBy = response.data.updatedBy;
        // this.load();
      }, (response) => {
        return '';
      });
  }

  change(data) {
    this.JobService.update(this.job.id, this.job.putPayload('rig', data), true)
      .then((response) => {
        // New Rig
        this.id = data.id;
        // Reload
        this.load();
      });
  }
}

angular.module('app')
  .component('rigsDashboard', {
    templateUrl: 'views/rigs/rigs.dashboard.html',
    controller: RigsDashboardController,
    bindings: {
      id: '@',
      job: '<?',
    }
  });

})();
