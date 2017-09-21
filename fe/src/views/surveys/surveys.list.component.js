;(() => {

class SurveysListController {
  constructor(Auth, NgTableParams, PromptService, SurveyService, Survey, WellboreService, Wellbore) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.SurveyService = SurveyService;
    this.Survey = Survey;
    this.WellboreService = WellboreService;
    this.Wellbore = Wellbore;

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
    this.tableParams = new this.NgTableParams({ sorting: { measuredDepth: 'asc' } }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.SurveyService.list(query, this.wellbore.id)
          .then((response) => {
            this.surveys = response.data.content;
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  bulk() {
    this.SurveyService.openBulkModal(this.job, this.wellbore)
      .then((response) => {
        this.load();
      }, (response) => { })
  }

  create() {
    this.SurveyService.openCreateModal(this.job, this.wellbore)
      .then((response) => {
        this.load();
      }, (response) => { });
  }

  update(id) {
    this.SurveyService.openUpdateModal(id)
      .finally(() => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Survey(item);
    obj[field] = data;

    return this.SurveyService.update(obj.id, obj.putPayload())
      .then((response) => {
        this.load();
        // If tie-in measured depth change, we need to change the wellbore tieindepth
        // if (field === 'measuredDepth' && item.tiein) {
        //   // New instance of the wellbore
        //   let cpy = new this.Wellbore(angular.copy(this.wellbore));
        //   // setting new tiein
        //   cpy.tieInDepth = data;
        //   // Check if the new tieindepth > totaldepth
        //   if (cpy.tieInDepth > cpy.totalDepth) {
        //     cpy.totalDepth = cpy.tieInDepth;
        //   }
        //   // update
        //   this.WellboreService.update(cpy.id, cpy.putPayload())
        //     .then((response) => {
        //       this.wellbore.tieInDepth = cpy.tieInDepth;
        //       this.wellbore.totalDepth = cpy.totalDepth;
        //     }, (response) => { });
        // }
      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('surveysList', {
    templateUrl: 'views/surveys/surveys.list.html',
    controller: SurveysListController,
    bindings: {
      wellbore: '<',
      job: '<?',
    }
  });

})();
