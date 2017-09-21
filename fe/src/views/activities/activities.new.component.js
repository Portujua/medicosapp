;(() => {

class ActivitiesNewController {
  constructor(Auth, ActivityTypeService, ActivityService, WellboreService, Activity, BhaService, FormationService, DrillingParametersService, DrillingParameters, TimeUtil) {
    this.session = Auth.getSession();
    this.ActivityTypeService = ActivityTypeService;
    this.ActivityService = ActivityService;
    this.WellboreService = WellboreService;
    this.Activity = Activity;
    this.BhaService = BhaService;
    this.FormationService = FormationService;
    this.DrillingParametersService = DrillingParametersService;
    this.DrillingParameters = DrillingParameters;
    this.AtId = [];

    // 00:00
    this.initTime = TimeUtil.setTime(new Date(), 0, 0);
    // 23:59
    this.finalTime = TimeUtil.setTime(new Date(), 23, 59);
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new  this.Activity({ startTime: this.initTime, endTime: this.finalTime, day: this.resolve.workingDay });

    if (_.size(this.resolve.list)) {
      let lastActivity = _.last(this.resolve.list);
      this.data = new this.Activity({
        startTime: lastActivity.endTime,
        endTime: lastActivity.endTime,
        startDepth: lastActivity.endDepth,
        endDepth: lastActivity.endDepth,
        day: this.resolve.workingDay,
        wellbore: lastActivity.wellbore,
        bha: lastActivity.bha,
        measurementWhileDrilling: lastActivity.measurementWhileDrilling,
        phase: lastActivity.phase,
        formations: lastActivity.formations
      });
    }
  }

  getActivityTypes(keyword) {
    return this.ActivityTypeService.list({ keyword, simple: true, active: true })
      .then((response) => {
        return response.data;
      });
  }

  getWellbores(keyword) {
    return this.WellboreService.list({ keyword, simple: true, active: true }, this.resolve.job.well.id)
      .then((response) => {
        return response.data;
      });
  }

  getBhas(keyword) {
    return this.BhaService.list({ keyword, simple: true, active: true }, this.resolve.job.id)
      .then((response) => {
        return response.data;
      });
  }

  getFormations(keyword){
    return this.FormationService.list({ keyword, simple: true, active: true, expand: '.formation' },  this.data.wellbore.id)
      .then((response) => {
        return _.map(response.data, (value) => {
          value.itemValue = value.formation.itemValue;
          return value;
        });
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ActivityService.create(this.data.postPayload(), this.resolve.workingDay.id)
      .then((response) => {
        if (this.data.activityType.hasDrillingParameters) {
          this.data.drillingParameters['activity'] = {
            id: response.data.id,
          };
          // Create drilling params
          return this.DrillingParametersService.create(this.data.drillingParameters);
        } else {
          // Close normally
          this.modalInstance.close();
        }
      })
      .then((response) => {
        this.modalInstance.close();
      })
      .finally(() => {
        this.isSaving = false;
      })
  }

  openDrillingParameters() {
    this.DrillingParametersService.openModal(this.data)
      .then((response) => {
        this.data.drillingParameters = response;
        this.data.setComments();
      });
  }

  setActivityType(code) {
    if (code.hasDrillingParameters) {
      this.data.drillingParameters = new this.DrillingParameters({});
    } else {
      this.data.drillingParameters = null;
    }
    this.data.setComments();
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('activitiesNew', {
    templateUrl: 'views/activities/activities.new.html',
    controller: ActivitiesNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
