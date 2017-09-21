;(() => {

class ActivitiesListController {
  constructor(ActivityService, WorkingDayService, NgTableParams, Auth, DrillingParametersService, ActivityTypeService, DrillingParameters, Activity, WellboreService) {
    this.ActivityService = ActivityService;
    this.WorkingDayService = WorkingDayService;
    this.NgTableParams = NgTableParams;
    this.session = Auth.getSession();
    this.DrillingParametersService = DrillingParametersService;
    this.ActivityTypeService = ActivityTypeService;
    this.DrillingParameters = DrillingParameters;
    this.Activity = Activity;
    this.WellboreService = WellboreService;
    this.allPhases = ['HORIZONTAL', 'VERTICAL','CURVE'];

  }

  $onChanges(changes) {
    if (_.isEmpty(this.job) || _.isEmpty(this.day)) {
      return;
    }
    // When we have a job and a day
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ sorting: { createdAt: 'asc' } }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

         // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
          expand: this.ActivityService.getExpand(['activityType', 'bha', 'measurementWhileDrilling', 'wellbore', 'formations', 'drillingParameters']),
        };

        return this.loadingPromise = this.ActivityService.list(query, this.day.id)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // Setting list
            this.data = _.map(response.data.content, (value) => new this.Activity(value));
            // returning list
            return this.data;
          });
      }
    });
  }

  loadDrillingParameters(activity) {
    // this.loadingDrillingParametersPromise =
  }

  create() {
    this.ActivityService.openCreateModal(this.job, this.day, this.data)
      .then((response) => {
        this.load();
      });
  }

  getActivityTypes(keyword) {
   // console.log(keyword);
    return this.ActivityTypeService.getActivityType(keyword)
      .then((response) => {
        //console.log(response.data);
        return response.data;
      });
  }

  getWellbores() {
    return this.WellboreService.list({ simple: true, active: true }, this.job.well.id)
      .then((response) => {
        this.wellbores = response.data;
      });
  }

  getBHA(keyword) {
    return this.ActivityService.getBHA({ keyword, simple: true, active: true }, this.job.id)
      .then((response) => {
        return response.data;
      });
  }

  save(data, field, item) {
    let obj = new this.Activity(item);

    return this.ActivityService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
        if (_.contains(['startTime', 'endTime'], field)) {
          item[field] = data;
        }
      }, (response) => {
        return '';
      });
  }

  saveDrillingParameters(data, field, item) {
    let obj = new this.DrillingParameters(item.drillingParameters);

    return this.DrillingParametersService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('activitiesList', {
    templateUrl: 'views/activities/activities.list.html',
    controller: ActivitiesListController,
    bindings: {
      job: '<',
      day: '<',
      data: '<?',
    }
  });

})();
