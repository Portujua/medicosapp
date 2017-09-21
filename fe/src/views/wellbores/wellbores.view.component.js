;(() => {

class WellboresViewController {
  constructor(WellboreService, Wellbore, JobService, Job, Auth, PromptService, NumericUtil, TabManagerService) {
    this.WellboreService = WellboreService;
    this.Wellbore = Wellbore;
    this.JobService = JobService;
    this.Job = Job;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.NumericUtil = NumericUtil;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  $onChanges() {
    if (!_.isEmpty(this.jobId)) {
      // If the jobId isnt empty we load the job data
      this.getJob();
    }
  }

  load() {
    this.loadingPromise = this.WellboreService.get(this.id)
      .then((response) => {
        this.data = new this.Wellbore(response.data);
      });
  }

  getJob() {
    this.loadingPromise = this.JobService.get(this.jobId)
      .then((response) => {
        this.job = new this.Job(response.data);
      });
  }

  save(data, field) {
    return this.WellboreService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        field === 'verticalSectionDirection' ? this.load() : 1;
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  updateParentWellbore(data) {
    let obj = new this.Wellbore(this.data);
    obj.parentWellbore = _.isEmpty(data) ? null : data;

    return this.WellboreService.update(obj.id, obj.putPayload())
      .then ((response) =>  {

      }, (response) => {
        return '';
      });
  }

  getWellbores() {
    this.WellboreService.getActives(null, null, null, this.data.well.id)
      .then((response) => {
        this.wellbores = _.filter(response.data, (value) => value.id !== this.data.id);
      });
  }

  getWellboreShapes() {
    this.WellboreService.getWellboreShapes()
      .then((response) => {
        this.wellboreShapes = response.data;
      });
  }

  getTargetFormations() {
    this.WellboreService.getTargetFormations()
      .then((response) => {
        this.targetFormations = response.data;
      });
  }

  createWellboreShape() {
    this.PromptService.open({
      title: 'New Wellbore Shape',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Wellbore Shape',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    }).then((response) => {
      return this.WellboreService.createWellboreShape(response);
    });
  }

  createTargetFormation() {
    this.PromptService.open({
      title: 'New Target Formation',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Target Formation',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    }).then((response) => {
      return this.WellboreService.createTargetFormation(response);
    })
  }
}

angular.module('app')
  .component('wellboresView', {
    templateUrl: 'views/wellbores/wellbores.view.html',
    controller: WellboresViewController,
    bindings: {
      id: '@',
      jobId: '@',
      tabId: '@',
    }
  });

})();
